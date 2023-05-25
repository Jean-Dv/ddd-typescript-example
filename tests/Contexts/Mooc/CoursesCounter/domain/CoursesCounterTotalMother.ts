import { CoursesCounterTotal } from "../../../../../src/Contexts/Mooc/CoursesCounter/domain/CoursesCounterTotal"
import { IntegerMother } from "../../../Shared/domain/IntegerMother"

export class CoursesCounterTotalMother {
  static random(): CoursesCounterTotal {
    return new CoursesCounterTotal(IntegerMother.random())
  }
}
