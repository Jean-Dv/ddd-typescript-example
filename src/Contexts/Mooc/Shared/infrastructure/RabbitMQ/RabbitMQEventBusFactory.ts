import { type DomainEventFailoverPublisher } from "../../../../Shared/infrastructure/EventBus/DomainEventFailoverPublisher/DomainEventFailoverPublisher"
import { type RabbitMqConnection } from "../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection"
import { type RabbitMQqueueFormatter } from "../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter"
import { type RabbitMQConfig } from "./RabbitMQConfigFactory"
import { RabbitMQEventBus } from "../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMqEventBus"

export class RabbitMQEventBusFactory {
  static create(
    failoverPublisher: DomainEventFailoverPublisher,
    connection: RabbitMqConnection,
    queueNameFormatter: RabbitMQqueueFormatter,
    config: RabbitMQConfig
  ): RabbitMQEventBus {
    return new RabbitMQEventBus({
      failoverPublisher,
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter,
      maxRetries: config.maxRetries,
    })
  }
}
