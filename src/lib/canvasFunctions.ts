

export interface ICanvasAssignment {
	id: number;
	name: string;
  due_at: string;
	points_possible: number;
	html_url: string;
	course_id: number;
	course_name: string;
	course_code: string;
  description: string | null;
}

export function getCourses(assignments: ICanvasAssignment[]): string[] {
    const courses: string[] = [];
    assignments.forEach((assignment) => {
      if (!courses.includes(assignment.course_name)) {
        courses.push(assignment.course_name);
      }
    });
    return courses;
  }
export function getCourseCodes(assignments: ICanvasAssignment[]): string[] {
    const courses: string[] = [];
    assignments.forEach((assignment) => {
      if (!courses.includes(assignment.course_code)) {
        courses.push(assignment.course_code);
      }
    });
    return courses;
  }

export function sortAssignmentsByCourse(assignments: ICanvasAssignment[]): ICanvasAssignment[] {
    return assignments.sort((a, b) => {
      if (a.course_name < b.course_name) {
        return -1;
      }
      if (a.course_name > b.course_name) {
        return 1;
      }
      return 0;
    });
}
