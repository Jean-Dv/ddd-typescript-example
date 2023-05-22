import { CourseId } from "./../../Shared/domain/Courses/CourseId"
import { CourseDuration } from "./CourseDuration"
import { CourseName } from "./CourseName"
import { CourseCreatedDomainEvent } from "./CourseCreatedDomainEvent"
import { AggregateRoot } from "../../../Shared/domain/AggregateRoot"

export class Course extends AggregateRoot {
  readonly id: CourseId
  readonly name: CourseName
  readonly duration: CourseDuration

  constructor(id: CourseId, name: CourseName, duration: CourseDuration) {
    super()
    this.id = id
    this.name = name
    this.duration = duration
  }

  static create(
    id: CourseId,
    name: CourseName,
    duration: CourseDuration
  ): Course {
    const course = new Course(id, name, duration)

    course.record(
      new CourseCreatedDomainEvent({
        aggregateId: course.id.value,
        name: course.name.value,
        duration: course.duration.value,
      })
    )

    return course
  }

  static fromPrimitives(plainData: {
    id: string
    name: string
    duration: string
  }): Course {
    return new Course(
      new CourseId(plainData.id),
      new CourseName(plainData.name),
      new CourseDuration(plainData.duration)
    )
  }

  toPrimitives(): any {
    return {
      id: this.id.value,
      name: this.name.value,
      duration: this.duration.value,
    }
  }
}
