import { OrderBy } from "./OrderBy"
import { OrderType, OrderTypes } from "./OrderType"

export class Order {
  readonly orderBy: OrderBy
  readonly orderType: OrderType

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy
    this.orderType = orderType
  }

  static fromValues(orderBy?: string, orderType?: string): Order {
    if (orderBy == null) {
      return Order.none()
    }
    return new Order(
      new OrderBy(orderBy),
      OrderType.fromValue(orderType ?? OrderTypes.ASC)
    )
  }

  static none(): Order {
    return new Order(new OrderBy(""), OrderType.fromValue(OrderTypes.NONE))
  }

  static desc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), OrderType.fromValue(OrderTypes.DESC))
  }

  static asc(orderBy: string): Order {
    return new Order(new OrderBy(orderBy), OrderType.fromValue(OrderTypes.ASC))
  }

  public hasOrder(): boolean {
    return !this.orderType.isNone()
  }
}
