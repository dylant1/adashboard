import { convertDateToString } from "./timeFunctions";

interface IEFCMSAssignment {
  due_date: string | null;
  grade: number | null;
}

export interface IEFCMSAssignments {
  name: string;
  learning_page_data: IEFCMSAssignment;
  practice_questions_data: IEFCMSAssignment;
  prep_questions_data: IEFCMSAssignment;
}
 export function getEFCMSAssignmentDaysFromNow(date: string | null): number {
   if (date === null) return -1;
    const d = new Date(convertDateToString(date));
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
}

