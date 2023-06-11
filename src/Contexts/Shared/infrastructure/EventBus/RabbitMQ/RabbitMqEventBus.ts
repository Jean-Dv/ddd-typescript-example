import { type DomainEvent } from "../../../domain/DomainEvent"
import { type EventBus } from "../../../domain/EventBus"
import { DomainEventDeserializer } from "../DomainEventDeserializer"
import { type DomainEventFailoverPublisher } from "../DomainEventFailoverPublisher/DomainEventFailoverPublisher"
import { DomainEventJsonSerializer } from "../DomainEventJsonSerializer"
import { type DomainEventSubscribers } from "../DomainEventSubscribers"
import { type RabbitMqConnection } from "./RabbitMqConnection"
import { RabbitMQConsumerFactory } from "./RabbitMQConsumerFactory"
import { type RabbitMQqueueFormatter } from "./RabbitMQqueueFormatter"

export class RabbitMQEventBus implements EventBus {
  private readonly failoverPublisher: DomainEventFailoverPublisher
  private readonly connection: RabbitMqConnection
  private readonly exchange: string
  private readonly queueNameFormatter: RabbitMQqueueFormatter
  private readonly maxRetries: number

  constructor(params: {
    failoverPublisher: DomainEventFailoverPublisher
    connection: RabbitMqConnection
    exchange: string
    queueNameFormatter: RabbitMQqueueFormatter
    maxRetries: number
  }) {
    const { failoverPublisher, connection, exchange } = params
    this.failoverPublisher = failoverPublisher
    this.connection = connection
    this.exchange = exchange
    this.queueNameFormatter = params.queueNameFormatter
    this.maxRetries = params.maxRetries
  }

  async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
    const deserializer = DomainEventDeserializer.configure(subscribers)
    const consumerFactory = new RabbitMQConsumerFactory(
      deserializer,
      this.connection,
      this.maxRetries
    )
    for (const subscriber of subscribers.items) {
      const queueName = this.queueNameFormatter.format(subscriber)
      const rabbitMQConsumer = consumerFactory.build(
        subscriber,
        this.exchange,
        queueName
      )
      await this.connection.consume(
        queueName,
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        rabbitMQConsumer.onMessage.bind(rabbitMQConsumer)
      )
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName
        const content = this.toBuffer(event)
        const options = this.options(event)
        await this.connection.publish({
          exchange: this.exchange,
          routingKey,
          content,
          options,
        })
      } catch (error) {
        await this.failoverPublisher.publish(event)
      }
    }
  }

  private options(event: DomainEvent): {
    messageId: string
    contentType: string
    contentEncoding: string
    priority?: number
    headers?: any
  } {
    return {
      messageId: event.eventId,
      contentType: "application/json",
      contentEncoding: "utf-8",
    }
  }

  private toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventJsonSerializer.serialize(event)
    return Buffer.from(eventPrimitives)
  }
}
