import { ConfigureRabbitMQCommand } from "./ConfigureRabbitMQCommand"

ConfigureRabbitMQCommand.run()
  .then(() => {
    console.log("RabbitMQ configured successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log("RabbitMQ configuration failed", error)
    process.exit(1)
  })
