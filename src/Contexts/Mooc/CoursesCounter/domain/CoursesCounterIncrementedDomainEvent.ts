import { DomainEvent } from "../../../Shared/domain/DomainEvent"

interface CoursesCounterIncrementedAttributes {
  total: number
}

export class CoursesCounterIncrementedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "courses_counter.incremented"
  readonly total: number

  constructor(data: {
    aggregateId: string
    total: number
    eventId?: string
    occurredOn?: Date
  }) {
    const { aggregateId, eventId, occurredOn } = data
    super({
      eventName: CoursesCounterIncrementedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    })
    this.total = data.total
  }

  toPrimitives(): CoursesCounterIncrementedAttributes {
    return {
      total: this.total,
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    eventId: string
    occurredOn: Date
    attributes: CoursesCounterIncrementedAttributes
  }): DomainEvent {
    const { aggregateId, eventId, occurredOn, attributes } = params
    return new CoursesCounterIncrementedDomainEvent({
      aggregateId,
      total: attributes.total,
      eventId,
      occurredOn,
    })
  }
}
