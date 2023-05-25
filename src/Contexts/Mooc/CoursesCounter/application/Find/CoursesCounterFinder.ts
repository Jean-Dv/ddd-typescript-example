import { CoursesCounterNotExist } from "../../domain/CoursesCounterNotExist"
import { type CoursesCounterRepository } from "../../domain/CoursesCounterRepository"

export class CoursesCounterFinder {
  constructor(private readonly repository: CoursesCounterRepository) {}

  async run(): Promise<number> {
    const counter = await this.repository.search()
    if (counter === null || counter === undefined) {
      throw new CoursesCounterNotExist()
    }

    return counter.total.value
  }
}
