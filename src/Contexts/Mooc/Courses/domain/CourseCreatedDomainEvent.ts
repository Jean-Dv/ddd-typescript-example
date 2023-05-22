import { DomainEvent } from "../../../../../src/Contexts/Shared/domain/DomainEvent"

interface CreateCourseDomainEventAttributes {
  readonly duration: string
  readonly name: string
}

export class CourseCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "course.created"

  readonly duration: string
  readonly name: string

  constructor({
    aggregateId,
    name,
    duration,
    eventId,
    occurredOn,
  }: {
    aggregateId: string
    name: string
    duration: string
    eventId?: string
    occurredOn?: Date
  }) {
    super({
      eventName: CourseCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    })
    this.duration = duration
    this.name = name
  }

  toPrimitives(): CreateCourseDomainEventAttributes {
    const { name, duration } = this
    return {
      name,
      duration,
    }
  }

  static fromPrimitives(params: {
    aggregateId: string
    attributes: CreateCourseDomainEventAttributes
    eventId: string
    occurredOn: Date
  }): DomainEvent {
    const { aggregateId, attributes, eventId, occurredOn } = params
    return new CourseCreatedDomainEvent({
      aggregateId,
      duration: attributes.duration,
      name: attributes.name,
      eventId,
      occurredOn,
    })
  }
}
