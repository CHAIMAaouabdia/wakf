import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, LogIn } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth, ROLE_HOME } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "تسجيل الدخول — منصة الوقف الرقمي" }] }),
});

const demos = [
  { label: "الإدارة", email: "admin@waqf.com", password: "admin123" },
  { label: "متبرع", email: "donor@waqf.com", password: "donor123" },
  { label: "جمعية", email: "org@waqf.com", password: "org123" },
];

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const u = await login(email, password);
      toast.success(`مرحباً ${u.name} 👋`);
      navigate({ to: ROLE_HOME[u.role] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذر تسجيل الدخول");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <section className="min-h-[80vh] grid place-items-center py-12 px-4 bg-soft-gradient">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-card border rounded-3xl p-8 shadow-elegant"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="size-12 rounded-2xl bg-primary-gradient grid place-items-center shadow-elegant mb-3">
              <Sparkles className="size-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-extrabold">تسجيل الدخول</h1>
            <p className="text-sm text-muted-foreground mt-1">ادخل إلى حسابك في منصة الوقف الرقمي</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input id="email" type="email" required value={email}
                onChange={(e) => setEmail(e.target.value)} className="mt-1" placeholder="you@example.com" />
            </div>
            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" required value={password}
                onChange={(e) => setPassword(e.target.value)} className="mt-1" placeholder="••••••••" />
            </div>
            <Button type="submit" disabled={busy}
              className="w-full bg-primary-gradient text-primary-foreground gap-2">
              <LogIn className="size-4" /> {busy ? "جاري الدخول..." : "دخول"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-5">
            ليس لديك حساب؟{" "}
            <Link to="/register" className="text-primary font-bold">أنشئ حساباً</Link>
          </p>

          <div className="mt-6 pt-5 border-t">
            <p className="text-xs text-muted-foreground mb-2 text-center">حسابات تجريبية (اضغط للتعبئة)</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {demos.map((d) => (
                <button key={d.email} type="button"
                  onClick={() => { setEmail(d.email); setPassword(d.password); }}
                  className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-accent transition-colors">
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
