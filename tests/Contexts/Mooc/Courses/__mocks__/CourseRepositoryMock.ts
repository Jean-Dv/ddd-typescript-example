import { type Course } from "../../../../../src/Contexts/Mooc/Courses/domain/Course"
import { type CourseRepository } from "../../../../../src/Contexts/Mooc/Courses/domain/CourseRepository"

export class CourseRepositoryMock implements CourseRepository {
  private readonly saveMock: jest.Mock
  private readonly seachAllMock: jest.Mock
  private courses: Course[] = []

  constructor() {
    this.saveMock = jest.fn()
    this.seachAllMock = jest.fn()
  }

  async save(course: Course): Promise<void> {
    this.saveMock(course)
  }

  assertSaveHaveBeenCalledWith(expected: Course): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected)
  }

  returnOnSearchAll(courses: Course[]): void {
    this.courses = courses
  }

  assertSearchAll(): void {
    expect(this.seachAllMock).toHaveBeenCalled()
  }

  async searchAll(): Promise<Course[]> {
    this.seachAllMock()
    return this.courses
  }
}
