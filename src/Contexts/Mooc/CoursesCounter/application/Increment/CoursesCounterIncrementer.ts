import { CoursesCounter } from "../../domain/CoursesCounter"
import { type EventBus } from "../../../../Shared/domain/EventBus"
import { type CourseId } from "../../../Shared/domain/Courses/CourseId"
import { type CoursesCounterRepository } from "../../domain/CoursesCounterRepository"
import { CoursesCounterId } from "../../domain/CoursesCounterId"

export class CoursesCounterIncrementer {
  constructor(
    private readonly repository: CoursesCounterRepository,
    private readonly bus: EventBus
  ) {}

  async run(courseId: CourseId): Promise<void> {
    const counter = (await this.repository.search()) ?? this.initializeCounter()
    if (!counter.hasIncremented(courseId)) {
      counter.increment(courseId)
      await this.repository.save(counter)
      await this.bus.publish(counter.pullDomainEvents())
    }
  }

  private initializeCounter(): CoursesCounter {
    return CoursesCounter.initialize(CoursesCounterId.random())
  }
}
