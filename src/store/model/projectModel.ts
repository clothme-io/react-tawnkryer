export interface ProjectModel {
  id: string;
  // created_at: string;
  name: string;
  // created_by: string;
  // owner: string
  // project_number: number;
  // project_id: string;
  project: ProjectDetails;
}

export interface ProjectDetails {
  account_id: string;
  default: boolean;
  name: string;
}
