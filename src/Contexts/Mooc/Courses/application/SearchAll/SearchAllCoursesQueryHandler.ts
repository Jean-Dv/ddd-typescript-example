import { type Query } from "../../../../Shared/domain/Query"
import { type QueryHandler } from "../../../../Shared/domain/QueryHandler"
import { type CoursesResponse } from "./CoursesResponse"
import { type CoursesFinder } from "./CourseFinder"
import { SearchAllCoursesQuery } from "./SearchAllCoursesQuery"

export class SearchAllCoursesQueryHandler
  implements QueryHandler<SearchAllCoursesQuery, CoursesResponse>
{
  constructor(private readonly coursesFinder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery
  }

  async handle(_query: SearchAllCoursesQuery): Promise<CoursesResponse> {
    return await this.coursesFinder.run()
  }
}
