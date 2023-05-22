import { type BackofficeCourse } from "./BackofficeCourse"
import { type Criteria } from "../../../Shared/domain/criteria/Criteria"

export interface BackofficeCourseRepository {
  save: (course: BackofficeCourse) => Promise<void>
  searchAll: () => Promise<BackofficeCourse[]>
  matching: (criteria: Criteria) => Promise<BackofficeCourse[]>
}
