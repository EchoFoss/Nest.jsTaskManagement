import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Task } from './tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TASK_STATUS } from './task.model';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id: id } });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.taskRepository.create({
      title,
      description,
      status: TASK_STATUS.open,
    });

    await this.taskRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException(`Task with id ${id} was not found`);
  }

  async updateStatus(id: string, status: TASK_STATUS): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id: id } });
    task.status = status;

    await this.taskRepository.save(task);
    return task;
  }
}
