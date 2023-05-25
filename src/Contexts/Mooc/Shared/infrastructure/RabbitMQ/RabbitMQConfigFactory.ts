import { type ConnectionSettings } from "../../../../Shared/infrastructure/EventBus/RabbitMQ/ConnectionSettings"
import { type ExchangeSetting } from "../../../../Shared/infrastructure/EventBus/RabbitMQ/ExchangeSetting"
import config from "../config"

export interface RabbitMQConfig {
  connectionSettings: ConnectionSettings
  exchangeSettings: ExchangeSetting
  maxRetries: number
  retryTtl: number
}

export class RabbitMQConfigFactory {
  static createConfig(): RabbitMQConfig {
    return config.get("rabbitmq")
  }
}
