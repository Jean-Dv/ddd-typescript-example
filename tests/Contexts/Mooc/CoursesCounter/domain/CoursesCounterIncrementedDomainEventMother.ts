import { CoursesCounterIncrementedDomainEvent } from "./../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterIncrementedDomainEvent"
import { type CoursesCounter } from "../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounter"
import { type DomainEvent } from "../../../../../src/Contexts/Shared/domain/DomainEvent"
import { CoursesCounterMother } from "./CoursesCounterMother"

export class CoursesCounterIncrementedDomainEventMother {
  static create(): DomainEvent {
    return CoursesCounterIncrementedDomainEventMother.fromCourseCounter(
      CoursesCounterMother.random()
    )
  }

  static fromCourseCounter(
    counter: CoursesCounter
  ): CoursesCounterIncrementedDomainEvent {
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId: counter.id.value,
      total: counter.total.value,
    })
  }
}
