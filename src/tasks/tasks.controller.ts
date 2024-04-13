import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTastStatusDto } from './updateTastStatus.dto';

@Controller('tasks')
export class TasksController {
  constructor(private service: TasksService) {}

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.service.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.service.createTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    return await this.service.deleteTask(id);
  }

  @Patch('/:id/status')
  async updateTaskStatus(
    @Param('id')
    id: string,
    @Body()
    updateTaskStatusDto: UpdateTastStatusDto,
  ) {
    const { status } = updateTaskStatusDto;
    return await this.service.updateStatus(id, status);
  }
}
