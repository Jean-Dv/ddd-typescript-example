import { type CoursesCounter } from "./CoursesCounter"
import { type Nullable } from "../../../Shared/domain/Nullable"

export interface CoursesCounterRepository {
  search: () => Promise<Nullable<CoursesCounter>>
  save: (counter: CoursesCounter) => Promise<void>
}
