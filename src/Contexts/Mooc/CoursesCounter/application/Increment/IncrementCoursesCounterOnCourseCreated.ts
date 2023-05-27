import { type DomainEventClass } from "../../../../Shared/domain/DomainEvent"
import { type DomainEventSubscriber } from "../../../../Shared/domain/DomainEventSubscriber"
import { CourseCreatedDomainEvent } from "../../../Courses/domain/CourseCreatedDomainEvent"
import { CourseId } from "../../../Shared/domain/Courses/CourseId"
import { type CoursesCounterIncrementer } from "./CoursesCounterIncrementer"

export class IncrementCoursesCounterOnCourseCreated
  implements DomainEventSubscriber<CourseCreatedDomainEvent>
{
  constructor(private readonly incrementer: CoursesCounterIncrementer) {}

  subscribedTo(): DomainEventClass[] {
    return [CourseCreatedDomainEvent]
  }

  async on(domainEvent: CourseCreatedDomainEvent): Promise<void> {
    await this.incrementer.run(new CourseId(domainEvent.aggregateId))
  }
}
