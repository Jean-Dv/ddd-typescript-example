import { SearchAllCoursesResponseMother } from "./SearchAllCoursesResponseMother"
import { SearchAllCoursesQuery } from "./../../../../../../src/Contexts/Mooc/Courses/application/SearchAll/SearchAllCoursesQuery"
import { CourseMother } from "../../domain/CourseMother"
import { CourseRepositoryMock } from "../../__mocks__/CourseRepositoryMock"
import { SearchAllCoursesQueryHandler } from "../../../../../../src/Contexts/Mooc/Courses/application/SearchAll/SearchAllCoursesQueryHandler"
import { CoursesFinder } from "../../../../../../src/Contexts/Mooc/Courses/application/SearchAll/CourseFinder"

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

    const handler = new SearchAllCoursesQueryHandler(
      new CoursesFinder(repository)
    )

    const query = new SearchAllCoursesQuery()
    const response = await handler.handle(query)

    repository.assertSearchAll()

    const expected = SearchAllCoursesResponseMother.create(courses)
    expect(expected).toEqual(response)
  })
})
