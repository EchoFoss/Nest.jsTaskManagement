import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task } from './tasks.entity';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    if (!Object.keys(filterDto).length) {
      return this.service.getAllTasks();
    }
    return this.service.getTaskWithFilters(filterDto);
  }
  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.service.getTaskById(id);
  }
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    const createdTask = this.service.createTask(createTaskDto);

    console.log(createdTask);
    return createdTask;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.service.deleteTaskById(id);
  }
}
