import { TASK_STATUS } from '../task.model';

export class GetTaskFilterDto {
  status?: TASK_STATUS;
  search?: string;
}
