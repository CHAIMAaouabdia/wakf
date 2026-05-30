import type { Category } from "@/data/projects";

export type SubmissionStatus = "pending" | "approved" | "rejected";

export interface Submission {
  id: string;
  title: string;
  category: Category;
  goal: number;
  shortDescription: string;
  organization: string;
  wilaya: string;
  status: SubmissionStatus;
  createdAt: string;
}

const KEY = "waqf_submissions";
const EVENT = "waqf_submissions_changed";

function read(): Submission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
}

function write(list: Submission[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function getSubmissions(): Submission[] {
  return read();
}

export function getSubmissionsByOrg(organization: string): Submission[] {
  return read().filter((s) => s.organization === organization);
}

export function addSubmission(
  input: Omit<Submission, "id" | "status" | "createdAt">,
): Submission {
  const sub: Submission = {
    ...input,
    id: `sub-${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  write([sub, ...read()]);
  return sub;
}

export function setSubmissionStatus(id: string, status: SubmissionStatus) {
  write(read().map((s) => (s.id === id ? { ...s, status } : s)));
}

export function subscribeSubmissions(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
