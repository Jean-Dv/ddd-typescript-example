import { type Course } from "./Course"

export interface CourseRepository {
  save: (course: Course) => Promise<void>
}
