import { Repository } from 'typeorm/browser';
import { Injectable } from '@nestjs/common';
import { Task } from './tasks.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {}
