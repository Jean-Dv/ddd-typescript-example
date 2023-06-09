import {
  type ContainerBuilder,
  type Definition,
} from "node-dependency-injection"
import { type DomainEvent } from "../../domain/DomainEvent"
import { type DomainEventSubscriber } from "../../domain/DomainEventSubscriber"

export class DomainEventSubscribers {
  constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

  static from(container: ContainerBuilder): DomainEventSubscribers {
    const subscriberDefinitions = container.findTaggedServiceIds(
      "domainEventSubscriber"
    ) as Map<string, Definition>
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = []
    subscriberDefinitions.forEach((value: Definition, key: string) => {
      container.register(key, value.Object)
      const domainEventSubscriber = container.get<
        DomainEventSubscriber<DomainEvent>
      >(key.toString())
      subscribers.push(domainEventSubscriber)
    })

    return new DomainEventSubscribers(subscribers)
  }
}
