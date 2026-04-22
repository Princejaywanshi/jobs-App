export type JobStatus = "pending" | "in_progress" | "completed";

export interface Job {
  id: string;
  title: string;
  time: string;
  area: string;
  status: JobStatus;
  note: string;
  completedAt: string | null;
}