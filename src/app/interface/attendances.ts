import { attendance } from './attendance';
import { Student } from './status';
export interface attendances {
  student: Student,
  attendance: attendance[]
}
