import { type CourseCreator } from "./CourseCreator"
import { type Command } from "../../../../Shared/domain/Command"
import { CourseId } from "../../../Shared/domain/Courses/CourseId"
import { CourseName } from "../../domain/CourseName"
import { CourseDuration } from "../../domain/CourseDuration"
import { CreateCourseCommand } from "./../../domain/CreateCourseCommand"
import { type CommandHandler } from "../../../../Shared/domain/CommandHandler"

export class CreateCourseCommandHandler
  implements CommandHandler<CreateCourseCommand>
{
  constructor(private readonly courseCreator: CourseCreator) {}

  subscribedTo(): Command {
    return CreateCourseCommand
  }

  async handle(command: CreateCourseCommand): Promise<void> {
    const id = new CourseId(command.id)
    const name = new CourseName(command.name)
    const duration = new CourseDuration(command.duration)

    await this.courseCreator.run({ id, name, duration })
  }
}
