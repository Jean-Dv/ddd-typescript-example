import { AggregateRoot } from "../../../Shared/domain/AggregateRoot"
import { CourseId } from "../../Shared/domain/Courses/CourseId"
import { CoursesCounterTotal } from "./CoursesCounterTotal"
import { CoursesCounterId } from "./CoursesCounterId"
import { CoursesCounterIncrementedDomainEvent } from "./CoursesCounterIncrementedDomainEvent"
import { type Uuid } from "../../../Shared/domain/value-object/Uuid"

export class CoursesCounter extends AggregateRoot {
  readonly id: CoursesCounterId
  private _total: CoursesCounterTotal
  readonly existingCourses: CourseId[]

  constructor(
    id: CoursesCounterId,
    total: CoursesCounterTotal,
    existingCourses?: CourseId[]
  ) {
    super()
    this.id = id
    this._total = total
    this.existingCourses = existingCourses ?? []
  }

  public get total(): CoursesCounterTotal {
    return this._total
  }

  static initialize(id: Uuid): CoursesCounter {
    return new CoursesCounter(id, CoursesCounterTotal.initialize())
  }

  increment(courseId: CourseId): void {
    this._total = this._total.increment()
    this.existingCourses.push(courseId)
    this.record(
      new CoursesCounterIncrementedDomainEvent({
        aggregateId: this.id.value,
        total: this._total.value,
      })
    )
  }

  hasIncremented(courseId: CourseId): boolean {
    const exists = this.existingCourses.find(
      (entry) => entry.value === courseId.value
    )
    return exists !== undefined
  }

  toPrimitives(): {
    id: string
    total: number
    existingCourses: string[]
  } {
    return {
      id: this.id.value,
      total: this.total.value,
      existingCourses: this.existingCourses.map((course) => course.value),
    }
  }

  static fromPrimitives(data: {
    id: string
    total: number
    existingCourses: string[]
  }): CoursesCounter {
    return new CoursesCounter(
      new CoursesCounterId(data.id),
      new CoursesCounterTotal(data.total),
      data.existingCourses.map((courseId) => new CourseId(courseId))
    )
  }
}
