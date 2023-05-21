import { v4 as uuid } from "uuid"
import validate from "uuid-validate"

import { ValueObject } from "./ValueObject"
import { InvalidArgumentError } from "./InvalidArgumentError"

export class Uuid extends ValueObject<string> {
  constructor(value: string) {
    super(value)
    this.ensureIsValidUuid(value)
  }

  static random(): Uuid {
    return new Uuid(uuid())
  }

  private ensureIsValidUuid(value: string): void {
    if (!validate(value)) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow the value <${value}>`
      )
    }
  }
}
