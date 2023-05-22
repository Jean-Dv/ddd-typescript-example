import { type CourseRepository } from "../../domain/CourseRepository"
import { CoursesResponse } from "./CoursesResponse"

export class CoursesFinder {
  constructor(private readonly coursesRepository: CourseRepository) {}

  async run(): Promise<CoursesResponse> {
    const courses = await this.coursesRepository.searchAll()

    return new CoursesResponse(courses)
  }
}
