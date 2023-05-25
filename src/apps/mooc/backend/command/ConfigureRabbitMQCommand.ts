import { type RabbitMQConfigurer } from "./../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer"
import { DomainEventSubscribers } from "./../../../../Contexts/Shared/infrastructure/EventBus/DomainEventSubscribers"
import { type RabbitMQConfig } from "../../../../Contexts/Mooc/Shared/infrastructure/RabbitMQ/RabbitMQConfigFactory"
import container from "../dependency-injection"
import { type RabbitMqConnection } from "../../../../Contexts/Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection"

export class ConfigureRabbitMQCommand {
  static async run(): Promise<void> {
    const connection = container.get<RabbitMqConnection>(
      "Mooc.Shared.RabbitMQConnection"
    )
    const { name: exchange } = container.get<RabbitMQConfig>(
      "Mooc.Shared.RabbitMQConfig"
    ).exchangeSettings
    await connection.connect()

    const configurer = container.get<RabbitMQConfigurer>(
      "Mooc.Shared.RabbitMQConfigurer"
    )
    const subscribers = DomainEventSubscribers.from(container).items

    await configurer.configure({
      exchange,
      subscribers,
    })
    await connection.close()
  }
}
