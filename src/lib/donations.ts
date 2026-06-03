export interface Donation {
  id: string;
  projectId: string;
  projectTitle: string;
  organization: string;
  amount: number;
  platformTip: number;
  total: number;
  method: string;
  donorName: string;
  email: string;
  phone: string;
  wilaya: string;
  anonymous: boolean;
  createdAt: string;
}

const KEY = "waqf_donations";
const EVENT = "waqf_donations_changed";

function read(): Donation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Donation[]) : [];
  } catch {
    return [];
  }
}

function write(list: Donation[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new Event(EVENT));
}

export function getDonations(): Donation[] {
  return read();
}

export function addDonation(input: Omit<Donation, "id" | "createdAt">): Donation {
  const d: Donation = {
    ...input,
    id: `WQF-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
    createdAt: new Date().toISOString(),
  };
  write([d, ...read()]);
  return d;
}

export function subscribeDonations(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

// ---- Validation helpers ----
export const isValidCardNumber = (v: string) => v.replace(/\s/g, "").length >= 16;
export const isValidExp = (v: string) => /^\d{2}\s*\/\s*\d{2}$/.test(v.trim());
export const isValidCvv = (v: string) => /^\d{3,4}$/.test(v.trim());
