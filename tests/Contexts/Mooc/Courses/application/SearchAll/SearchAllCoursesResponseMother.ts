import { CoursesResponse } from "../../../../../../src/Contexts/Mooc/Courses/application/SearchAll/CoursesResponse"
import { type Course } from "../../../../../../src/Contexts/Mooc/Courses/domain/Course"

export class SearchAllCoursesResponseMother {
  static create(courses: Course[]): CoursesResponse {
    return new CoursesResponse(courses)
  }
}
