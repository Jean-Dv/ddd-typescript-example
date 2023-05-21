import { type CourseId } from "../../Shared/domain/Courses/CourseId"
import { type CourseName } from "./CourseName"
import { type CourseDuration } from "./CourseDuration"

export class Course {
  readonly id: CourseId
  readonly name: CourseName
  readonly duration: CourseDuration

  constructor(id: CourseId, name: CourseName, duration: CourseDuration) {
    this.id = id
    this.name = name
    this.duration = duration
  }
}
