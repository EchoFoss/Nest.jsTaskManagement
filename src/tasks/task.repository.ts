import { Task } from './tasks.entity';
import { Repository } from 'typeorm';

export class TaskRepository extends Repository<Task> {}
