import { type Criteria } from "../../../../Shared/domain/criteria/Criteria"
import { type Filter } from "../../../../Shared/domain/criteria/Filter"
import { type Operator } from "../../../../Shared/domain/criteria/FilterOperator"
import { type Filters } from "../../../../Shared/domain/criteria/Filters"
import { type Order } from "../../../../Shared/domain/criteria/Order"

type MongoFilterOperator = "$eq" | "$ne" | "$gt" | "$lt" | "$regex"
type MongoFilterValue = boolean | string | number
type MongoFilterOperation = {
  [operator in MongoFilterOperator]?: MongoFilterValue
}
type MongoFilter =
  | Record<string, MongoFilterOperation>
  | Record<string, { $not: MongoFilterOperation }>
type MongoDirection = 1 | -1
type MongoSort = Record<string, MongoDirection>

interface MongoQuery {
  filter: MongoFilter
  sort: MongoSort
  skip: number
  limit: number
}

type TransformerFunction<T, K> = (value: T) => K

export class MongoCriteriaConverter {
  private readonly filterTransformers: Map<
    Operator,
    TransformerFunction<Filter, MongoFilter>
  >

  constructor() {
    this.filterTransformers = new Map<
      Operator,
      TransformerFunction<Filter, MongoFilter>
    >([
      [Operator.Equal, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter],
    ])
  }

  public convert(criteria: Criteria): MongoQuery {
    return {
      filter: criteria.hasFilters()
        ? this.generateFilter(criteria.filters)
        : {},
      sort: criteria.order.hasOrder()
        ? this.generateSort(criteria.order)
        : { _id: -1 },
      skip: criteria.offset ?? 0,
      limit: criteria.limit ?? 0,
    }
  }

  protected generateFilter(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value)

      if (transformer == null) {
        throw Error(`Unexpected operator value ${filter.operator.value}`)
      }

      return transformer(filter)
    })

    return Object.assing({}, ...filter)
  }

  protected generateSort(order: Order): MongoSort {
    return {
      [order.orderBy.value === "id" ? "_id" : order.orderBy.value]:
        order.orderType.isAsc() ? 1 : -1,
    }
  }

  private equalFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $eq: filter.value.value } }
  }

  private notEqualFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $ne: filter.value.value } }
  }

  private greaterThanFilter(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $gt: filter.value.value } }
  }

  private lowerThanFilter(filter: Filter): MongoFilter {
    return { [filter.value.value]: { $lt: filter.value.value } }
  }

  private containsFilter(filter: Filter): MongoFilter {
    return { [filter.value.value]: { $regex: filter.value.value } }
  }

  private notContainsFilter(filter: Filter): MongoFilter {
    return { [filter.value.value]: { $not: { $regex: filter.value.value } } }
  }
}
