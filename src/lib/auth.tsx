import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Role = "admin" | "donor" | "organization";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  /** organization-only fields */
  orgType?: string; // جمعية، مؤسسة وقفية، ...
  registrationNumber?: string;
  phone?: string;
  createdAt: string;
}

export type PublicUser = Omit<AppUser, "password">;

const USERS_KEY = "waqf_users";
const SESSION_KEY = "waqf_session";

const SEED_USERS: AppUser[] = [
  {
    id: "admin-1",
    name: "مدير المنصة",
    email: "admin@waqf.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "donor-1",
    name: "عبدالله المتبرع",
    email: "donor@waqf.com",
    password: "donor123",
    role: "donor",
    createdAt: new Date().toISOString(),
  },
  {
    id: "org-1",
    name: "جمعية البر الخيرية",
    email: "org@waqf.com",
    password: "org123",
    role: "organization",
    orgType: "جمعية خيرية",
    registrationNumber: "REG-2024-001",
    phone: "+966500000000",
    createdAt: new Date().toISOString(),
  },
];

function readUsers(): AppUser[] {
  if (typeof window === "undefined") return SEED_USERS;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw) as AppUser[];
  } catch {
    return SEED_USERS;
  }
}

function writeUsers(users: AppUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function toPublic(u: AppUser): PublicUser {
  const { password: _pw, ...rest } = u;
  return rest;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: Exclude<Role, "admin">;
  orgType?: string;
  registrationNumber?: string;
  phone?: string;
}

interface AuthContextValue {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<PublicUser>;
  register: (input: RegisterInput) => Promise<PublicUser>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readUsers(); // ensure seeded
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw) as PublicUser);
    } catch {
      /* ignore */
    }
    setLoading(false);
  }, []);

  const persistSession = (u: PublicUser | null) => {
    setUser(u);
    if (typeof window === "undefined") return;
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };

  const login = async (email: string, password: string) => {
    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
    );
    if (!found) throw new Error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    const pub = toPublic(found);
    persistSession(pub);
    return pub;
  };

  const register = async (input: RegisterInput) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
      throw new Error("هذا البريد الإلكتروني مسجّل بالفعل");
    }
    const newUser: AppUser = {
      id: `${input.role}-${Date.now()}`,
      name: input.name.trim(),
      email: input.email.trim(),
      password: input.password,
      role: input.role,
      orgType: input.orgType,
      registrationNumber: input.registrationNumber,
      phone: input.phone,
      createdAt: new Date().toISOString(),
    };
    const updated = [...users, newUser];
    writeUsers(updated);
    const pub = toPublic(newUser);
    persistSession(pub);
    return pub;
  };

  const logout = () => persistSession(null);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export const ROLE_LABELS: Record<Role, string> = {
  admin: "الإدارة",
  donor: "متبرع",
  organization: "جمعية / مؤسسة",
};

export const ROLE_HOME: Record<Role, string> = {
  admin: "/admin",
  donor: "/dashboard",
  organization: "/organization",
};
