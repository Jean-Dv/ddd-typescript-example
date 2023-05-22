import { type EventBus } from "../../../../Shared/domain/EventBus"
import { type CourseId } from "../../../Shared/domain/Courses/CourseId"
import { Course } from "../../domain/Course"
import { type CourseDuration } from "../../domain/CourseDuration"
import { type CourseName } from "../../domain/CourseName"
import { type CourseRepository } from "../../domain/CourseRepository"

export class CourseCreator {
  constructor(
    private readonly repository: CourseRepository,
    private readonly eventBus: EventBus
  ) {}

  async run(params: {
    id: CourseId
    name: CourseName
    duration: CourseDuration
  }): Promise<void> {
    const course = Course.create(params.id, params.name, params.duration)
    await this.repository.save(course)
    await this.eventBus.publish(course.pullDomainEvents())
  }
}
