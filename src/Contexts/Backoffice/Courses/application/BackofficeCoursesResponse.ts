import { type BackofficeCourse } from "./../domain/BackofficeCourse"

interface BackofficeCourseResponse {
  id: string
  name: string
  duration: string
}

export class BackofficeCoursesResponse {
  public readonly courses: BackofficeCourseResponse[]

  constructor(courses: BackofficeCourse[]) {
    this.courses = courses.map((course) => course.toPrimitives())
  }
}
