import { IntegerMother } from "./IntegerMother"

export class Repeater {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static random(callable: Function, iterations: number): any[] {
    return Array(iterations ?? IntegerMother.random(10))
      .fill({})
      .map(() => callable())
  }
}
