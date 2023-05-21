import { type CreateCourseCommand } from "./../../../../../src/Contexts/Mooc/Courses/domain/CreateCourseCommand"
import { type CourseDuration } from "../../../../../src/Contexts/Mooc/Courses/domain/CourseDuration"
import { type CourseId } from "../../../../../src/Contexts/Mooc/Shared/domain/Courses/CourseId"
import { type CourseName } from "../../../../../src/Contexts/Mooc/Courses/domain/CourseName"
import { Course } from "../../../../../src/Contexts/Mooc/Courses/domain/Course"
import { CourseIdMother } from "../../Shared/domain/Courses/CourseIdMother"
import { CourseNameMother } from "./CourseNameMother"
import { CourseDurationMother } from "./CourseDurationMother"
export class CourseMother {
  static create(
    id: CourseId,
    name: CourseName,
    duration: CourseDuration
  ): Course {
    return new Course(id, name, duration)
  }

  static from(command: CreateCourseCommand): Course {
    return this.create(
      CourseIdMother.create(command.id),
      CourseNameMother.create(command.name),
      CourseDurationMother.create(command.duration)
    )
  }

  static random(): Course {
    return this.create(
      CourseIdMother.random(),
      CourseNameMother.random(),
      CourseDurationMother.random()
    )
  }
}
