import { type BackofficeCourse } from "../../domain/BackofficeCourse"
import { type BackofficeCourseRepository } from "../../domain/BackofficeCourseRepository"

export class CoursesFinder {
  constructor(private readonly coursesRepository: BackofficeCourseRepository) {}

  async run(): Promise<BackofficeCourse[]> {
    const courses = await this.coursesRepository.searchAll()

    return courses
  }
}
