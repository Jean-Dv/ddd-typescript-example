import { CourseCreatedDomainEvent } from "../../../../../src/Contexts/Mooc/Courses/domain/CourseCreatedDomainEvent"
import { type Course } from "../../../../../src/Contexts/Mooc/Courses/domain/Course"

export class CourseCreatedDomainEventMother {
  static create({
    aggregateId,
    eventId,
    duration,
    name,
    occurredOn,
  }: {
    aggregateId: string
    eventId?: string
    duration: string
    name: string
    occurredOn?: Date
  }): CourseCreatedDomainEvent {
    return new CourseCreatedDomainEvent({
      aggregateId,
      duration,
      name,
      eventId,
      occurredOn,
    })
  }

  static fromCourse(course: Course): CourseCreatedDomainEvent {
    return this.create({
      aggregateId: course.id.value,
      duration: course.duration.value,
      name: course.name.value,
    })
  }
}
