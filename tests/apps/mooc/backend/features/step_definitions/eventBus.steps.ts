import { DomainEventSubscribers } from "./../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers"
import { DomainEventDeserializer } from "./../../../../../../src/Contexts/Shared/infrastructure/EventBus/DomainEventDeserializer"
import { Given } from "@cucumber/cucumber"
import container from "../../../../../../src/apps/mooc/backend/dependency-injection"
import { eventBus } from "./hooks.steps"

const deserializer = buildDeserializer()

Given("I send an event to the event bus:", async (event: any) => {
  const domainEvent = deserializer.deserialize(event)
  await eventBus.publish([domainEvent])
  await wait(500)
})

function buildDeserializer(): DomainEventDeserializer {
  const subscribers = DomainEventSubscribers.from(container)
  return DomainEventDeserializer.configure(subscribers)
}

async function wait(ms: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms))
}
