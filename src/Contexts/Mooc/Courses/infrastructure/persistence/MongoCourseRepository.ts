import { type Condition, type ObjectId } from "mongodb"
import { type Nullable } from "../../../../Shared/domain/Nullable"
import { MongoRepository } from "../../../../Shared/infrastructure/persistence/mongo/MongoRepository"
import { type CourseId } from "../../../Shared/domain/Courses/CourseId"
import { Course } from "../../domain/Course"
import { type CourseRepository } from "../../domain/CourseRepository"

interface CourseDocument {
  _id: string
  name: string
  duration: string
}

export class MongoCourseRepository
  extends MongoRepository<Course>
  implements CourseRepository
{
  public async save(course: Course): Promise<void> {
    await this.persist(course.id.value, course)
  }

  public async search(id: CourseId): Promise<Nullable<Course>> {
    const collection = await this.collection()
    const document = await collection.findOne<CourseDocument>({
      _id: id.value as unknown as Condition<ObjectId>,
    })
    return document != null
      ? Course.fromPrimitives({
          name: document.name,
          duration: document.duration,
          id: id.value,
        })
      : null
  }

  protected collectionName(): string {
    return "courses"
  }

  public async searchAll(): Promise<Course[]> {
    const collection = await this.collection()
    const documents = await collection.find<CourseDocument>({}, {}).toArray()

    return documents.map((document) =>
      Course.fromPrimitives({
        name: document.name,
        duration: document.duration,
        id: document._id,
      })
    )
  }
}
