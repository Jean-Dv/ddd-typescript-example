import { Course } from "../../../../../src/Contexts/Mooc/Courses/domain/Course"
import { type CourseDuration } from "../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration"
import { type CourseId } from "../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId"
import { type CourseName } from "../../../../../src/Contexts/Mooc/Courses/domain/CourseName"
export class CourseMother {
  static create(
    id: CourseId,
    name: CourseName,
    duration: CourseDuration
  ): Course {
    return new Course(id, name, duration)
  }
}
