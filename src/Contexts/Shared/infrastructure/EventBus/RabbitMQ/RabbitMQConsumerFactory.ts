import { type DomainEvent } from "../../../domain/DomainEvent"
import { type DomainEventSubscriber } from "../../../domain/DomainEventSubscriber"
import { type DomainEventDeserializer } from "../DomainEventDeserializer"
import { type RabbitMqConnection } from "./RabbitMqConnection"
import { RabbitMQConsumer } from "./RabbitMQConsumer"

export class RabbitMQConsumerFactory {
  constructor(
    private readonly deserialize: DomainEventDeserializer,
    private readonly connection: RabbitMqConnection,
    private readonly maxRetries: number
  ) {}

  build(
    subscriber: DomainEventSubscriber<DomainEvent>,
    exchange: string,
    queueName: string
  ): RabbitMQConsumer {
    return new RabbitMQConsumer({
      subscriber,
      deserialize: this.deserialize,
      connection: this.connection,
      maxRetries: this.maxRetries,
      queueName,
      exchange,
    })
  }
}
