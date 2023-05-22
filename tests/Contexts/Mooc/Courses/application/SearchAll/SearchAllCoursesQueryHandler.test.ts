import { CourseMother } from "../../domain/CourseMother"
import { CourseRepositoryMock } from "../../__mocks__/CourseRepositoryMock"

describe("SearchAllCourses Query Handler", () => {
  let repository: CourseRepositoryMock

  beforeEach(() => {
    repository = new CourseRepositoryMock()
  })

  it("should find an existing course", async () => {
    const courses = [
      CourseMother.random(),
      CourseMother.random(),
      CourseMother.random(),
    ]

    repository.returnOnSearchAll(courses)

    // Handler is a class that implements QueryHandler interface
  })
})
