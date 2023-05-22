import { type Query } from "../../../../Shared/domain/Query"
import { type QueryHandler } from "../../../../Shared/domain/QueryHandler"
import { BackofficeCoursesResponse } from "../BackofficeCoursesResponse"
import { type CoursesFinder } from "./CoursesFinder"
import { SearchAllCoursesQuery } from "./SearchAllCoursesQuery"

export class SearchAllCoursesQueryHandler
  implements QueryHandler<SearchAllCoursesQuery, BackofficeCoursesResponse>
{
  constructor(private readonly finder: CoursesFinder) {}

  subscribedTo(): Query {
    return SearchAllCoursesQuery
  }

  async handle(
    _query: SearchAllCoursesQuery
  ): Promise<BackofficeCoursesResponse> {
    return new BackofficeCoursesResponse(await this.finder.run())
  }
}
