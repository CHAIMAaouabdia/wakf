import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Building2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth, ROLE_HOME } from "@/lib/auth";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
  head: () => ({ meta: [{ title: "إنشاء حساب — منصة الوقف الرقمي" }] }),
});

type AccountType = "donor" | "organization";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [type, setType] = useState<AccountType>("donor");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
    orgType: "جمعية خيرية", registrationNumber: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const u = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: type,
        phone: form.phone || undefined,
        orgType: type === "organization" ? form.orgType : undefined,
        registrationNumber: type === "organization" ? form.registrationNumber || undefined : undefined,
      });
      toast.success("تم إنشاء الحساب بنجاح 🎉");
      navigate({ to: ROLE_HOME[u.role] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "تعذر إنشاء الحساب");
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
          className="w-full max-w-lg bg-card border rounded-3xl p-8 shadow-elegant"
        >
          <div className="flex flex-col items-center text-center mb-6">
            <div className="size-12 rounded-2xl bg-primary-gradient grid place-items-center shadow-elegant mb-3">
              <Sparkles className="size-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-extrabold">إنشاء حساب جديد</h1>
            <p className="text-sm text-muted-foreground mt-1">اختر نوع الحساب المناسب لك</p>
          </div>

          {/* Account type selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <TypeCard
              active={type === "donor"} onClick={() => setType("donor")}
              icon={Heart} title="متبرع" desc="ادعم المشاريع الخيرية"
            />
            <TypeCard
              active={type === "organization"} onClick={() => setType("organization")}
              icon={Building2} title="جمعية / مؤسسة" desc="أطلق مشاريعك الوقفية"
            />
          </div>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label htmlFor="name">{type === "organization" ? "اسم الجمعية / المؤسسة" : "الاسم الكامل"}</Label>
              <Input id="name" required value={form.name} onChange={set("name")} className="mt-1" />
            </div>

            {type === "organization" && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orgType">نوع الجهة</Label>
                  <Input id="orgType" value={form.orgType} onChange={set("orgType")} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="reg">رقم التسجيل</Label>
                  <Input id="reg" value={form.registrationNumber} onChange={set("registrationNumber")} className="mt-1" placeholder="REG-..." />
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" required value={form.email} onChange={set("email")} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" value={form.phone} onChange={set("phone")} className="mt-1" placeholder="+966..." />
              </div>
            </div>

            <div>
              <Label htmlFor="password">كلمة المرور</Label>
              <Input id="password" type="password" required minLength={6} value={form.password} onChange={set("password")} className="mt-1" placeholder="6 أحرف على الأقل" />
            </div>

            <Button type="submit" disabled={busy}
              className="w-full bg-primary-gradient text-primary-foreground gap-2">
              <UserPlus className="size-4" /> {busy ? "جاري الإنشاء..." : "إنشاء الحساب"}
            </Button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-5">
            لديك حساب بالفعل؟{" "}
            <Link to="/login" className="text-primary font-bold">سجّل الدخول</Link>
          </p>
        </motion.div>
      </section>
    </SiteLayout>
  );
}

function TypeCard({ active, onClick, icon: Icon, title, desc }: any) {
  return (
    <button type="button" onClick={onClick}
      className={`text-right rounded-2xl border p-4 transition-all ${
        active ? "border-primary bg-accent shadow-soft" : "hover:bg-muted"
      }`}>
      <div className={`size-10 rounded-xl grid place-items-center mb-2 ${
        active ? "bg-primary-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}>
        <Icon className="size-5" />
      </div>
      <div className="font-bold">{title}</div>
      <div className="text-xs text-muted-foreground">{desc}</div>
    </button>
  );
}
