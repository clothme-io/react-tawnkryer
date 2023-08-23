export interface ProjectModel {
  id: string;
  name: string;
  project: ProjectDetails;
}

export interface ProjectDetails {
  account_id: string;
  default: boolean;
  name: string;
}
