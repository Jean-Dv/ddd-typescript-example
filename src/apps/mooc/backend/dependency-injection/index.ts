import { ContainerBuilder, YamlFileLoader } from "node-dependency-injection"

const container = new ContainerBuilder()
const loader = new YamlFileLoader(container)
const env = process.env.NODE_ENV ?? "dev"

export const load = async (): Promise<void> => {
  // eslint-disable-next-line n/no-path-concat
  await loader.load(`${__dirname}/application_${env}.yml`)
  await container.compile()
}

export default container
