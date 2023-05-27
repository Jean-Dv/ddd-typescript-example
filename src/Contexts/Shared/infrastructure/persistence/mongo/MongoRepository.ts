import {
  type Condition,
  type Collection,
  type MongoClient,
  type ObjectId,
} from "mongodb"
import { type AggregateRoot } from "../../../domain/AggregateRoot"
import { type Criteria } from "../../../domain/criteria/Criteria"
import { MongoCriteriaConverter } from "../../../../Backoffice/Courses/infrastructure/persistence/MongoCriteriaConverter"

export abstract class MongoRepository<T extends AggregateRoot> {
  private readonly criteriaConverter: MongoCriteriaConverter

  constructor(private readonly _client: Promise<MongoClient>) {
    this.criteriaConverter = new MongoCriteriaConverter()
  }

  protected abstract collectionName(): string

  protected async client(): Promise<MongoClient> {
    return await this._client
  }

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName())
  }

  protected async persist(id: string, aggregateRoot: T): Promise<void> {
    const collection = await this.collection()

    const document = { ...aggregateRoot.toPrimitives(), _id: id, id: undefined }

    await collection.updateOne(
      { _id: id as unknown as Condition<ObjectId> },
      { $set: document },
      { upsert: true }
    )
  }

  protected async searchByCriteria<D extends Document>(
    criteria: Criteria
  ): Promise<D[]> {
    const query = this.criteriaConverter.convert(criteria)

    const collection = await this.collection()

    return await collection
      .find<D>(query.filter, {})
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .toArray()
  }
}
