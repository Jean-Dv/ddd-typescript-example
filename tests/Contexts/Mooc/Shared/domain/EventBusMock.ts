import { type DomainEvent } from "../../../../../src/Contexts/Shared/domain/DomainEvent"
import { type DomainEventSubscribers } from "../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers"
import { type EventBus } from "../../../../../src/Contexts/Shared/domain/EventBus"

export default class EventBusMock implements EventBus {
  private readonly publishSpy = jest.fn()

  async publish(events: DomainEvent[]): Promise<void> {
    this.publishSpy(events)
  }

  addSubscribers(subscribers: DomainEventSubscribers): void {}

  assertLastPublishedEventIs(expectedEvent: DomainEvent): void {
    const publishSpyCalls = this.publishSpy.mock.calls
    expect(publishSpyCalls.length).toBeGreaterThan(0)
    const lastPublishSpyCall = publishSpyCalls[publishSpyCalls.length - 1]
    const lastPublishedEvent = lastPublishSpyCall[0][0]

    const expected = this.getDataFromDomainEvent(expectedEvent)
    const published = this.getDataFromDomainEvent(lastPublishedEvent)

    expect(expected).toMatchObject(published)
  }

  private getDataFromDomainEvent(event: DomainEvent): any {
    const { eventId, occurredOn, ...attributes } = event
    return attributes
  }
}
