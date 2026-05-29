import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2, Plus, Wallet, Users, FolderKanban, TrendingUp, Send, CheckCircle2,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { SiteLayout } from "@/components/site/SiteLayout";
import { RequireRole } from "@/components/site/RequireRole";
import { Counter } from "@/components/site/Counter";
import { projects, categories } from "@/data/projects";
import { formatCurrency, formatNumber, pct } from "@/lib/format";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/organization")({
  component: OrganizationPage,
  head: () => ({ meta: [{ title: "لوحة الجمعية — منصة الوقف الرقمي" }] }),
});

const trend = [
  { m: "يناير", v: 8 }, { m: "فبراير", v: 14 }, { m: "مارس", v: 11 },
  { m: "أبريل", v: 19 }, { m: "مايو", v: 26 }, { m: "يونيو", v: 31 },
];

function OrganizationPage() {
  return (
    <RequireRole roles={["organization"]}>
      <SiteLayout>
        <OrganizationDashboard />
      </SiteLayout>
    </RequireRole>
  );
}

function OrganizationDashboard() {
  const { user } = useAuth();
  // mock: this org owns the first 3 projects
  const [myProjects, setMyProjects] = useState(projects.slice(0, 3));
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState({ title: "", category: "water", goal: "", description: "" });

  const totalRaised = myProjects.reduce((s, p) => s + p.raised, 0);
  const totalDonors = myProjects.reduce((s, p) => s + p.donors, 0);

  const createProject = () => {
    if (!draft.title || !draft.goal) {
      toast.error("يرجى تعبئة العنوان والمبلغ المستهدف");
      return;
    }
    const newProject = {
      ...projects[0],
      id: `org-proj-${Date.now()}`,
      title: draft.title,
      category: draft.category as (typeof projects)[number]["category"],
      shortDescription: draft.description || "مشروع وقفي جديد",
      goal: Number(draft.goal),
      raised: 0,
      donors: 0,
      verified: false,
    };
    setMyProjects((p) => [newProject, ...p]);
    setDraft({ title: "", category: "water", goal: "", description: "" });
    setOpen(false);
    toast.success("تم إرسال المشروع للمراجعة من قبل الإدارة ✅");
  };

  return (
    <>
      <section className="bg-navy text-navy-foreground py-10">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-gold-gradient grid place-items-center">
              <Building2 className="size-6 text-gold-foreground" />
            </div>
            <div>
              <Badge className="bg-white/15 text-white border-0 mb-1">حساب جمعية</Badge>
              <h1 className="font-display text-2xl font-extrabold">{user?.name}</h1>
              <p className="opacity-70 text-sm">{user?.orgType ?? "مؤسسة وقفية"}</p>
            </div>
          </div>
          <CreateProjectDialog
            open={open} setOpen={setOpen} draft={draft} setDraft={setDraft} onCreate={createProject}
          />
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 space-y-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <OrgKPI icon={Wallet} label="إجمالي المُحصّل" value={totalRaised} prefix="$ " color="primary" />
          <OrgKPI icon={FolderKanban} label="مشاريعي" value={myProjects.length} color="gold" />
          <OrgKPI icon={Users} label="إجمالي المتبرعين" value={totalDonors} color="navy" />
          <OrgKPI icon={TrendingUp} label="نمو هذا الشهر" value={31} suffix="%" color="primary" />
        </div>

        <div className="bg-card border rounded-3xl p-6 shadow-soft">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-display font-bold text-lg">أداء التحصيل</h3>
              <p className="text-sm text-muted-foreground">عدد المتبرعين شهرياً</p>
            </div>
            <Badge className="bg-accent text-accent-foreground border-0">+18% عن الفترة السابقة</Badge>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="og" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.52 0.13 162)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="oklch(0.52 0.13 162)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="m" stroke="oklch(0.48 0.02 240)" fontSize={12} />
              <YAxis stroke="oklch(0.48 0.02 240)" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: 12 }} />
              <Area type="monotone" dataKey="v" stroke="oklch(0.52 0.13 162)" strokeWidth={3} fill="url(#og)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="bg-card border h-12 p-1">
            <TabsTrigger value="projects">مشاريعي</TabsTrigger>
            <TabsTrigger value="updates">نشر تحديث</TabsTrigger>
            <TabsTrigger value="profile">ملف الجمعية</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <div className="bg-card border rounded-3xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-right">
                  <tr>
                    <th className="p-4 font-semibold">المشروع</th>
                    <th className="p-4 font-semibold">التقدم</th>
                    <th className="p-4 font-semibold">المُحصّل</th>
                    <th className="p-4 font-semibold">المتبرعون</th>
                    <th className="p-4 font-semibold">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {myProjects.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-muted/30">
                      <td className="p-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="size-10 rounded-lg object-cover" alt="" />
                          <span className="font-medium line-clamp-1">{p.title}</span>
                        </div>
                      </td>
                      <td className="p-4 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <Progress value={pct(p.raised, p.goal)} className="h-2 flex-1" />
                          <span className="text-xs font-bold">{pct(p.raised, p.goal)}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-primary font-bold">{formatCurrency(p.raised)}</td>
                      <td className="p-4">{formatNumber(p.donors)}</td>
                      <td className="p-4">
                        {p.verified ? (
                          <Badge className="bg-primary/15 text-primary border-0">منشور</Badge>
                        ) : (
                          <Badge className="bg-gold/20 text-gold-foreground border-0">قيد المراجعة</Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="updates" className="mt-6">
            <div className="bg-card border rounded-3xl p-6 max-w-2xl space-y-4">
              <h3 className="font-bold">نشر تحديث للمتبرعين</h3>
              <Input placeholder="عنوان التحديث" />
              <Textarea rows={4} placeholder="اكتب آخر مستجدات المشروع..." />
              <Button
                onClick={() => toast.success("تم نشر التحديث للمتبرعين 📣")}
                className="bg-primary-gradient text-primary-foreground gap-2">
                <Send className="size-4" /> نشر التحديث
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="bg-card border rounded-3xl p-6 max-w-2xl grid sm:grid-cols-2 gap-4">
              <Field label="اسم الجمعية" value={user?.name} />
              <Field label="نوع الجهة" value={user?.orgType} />
              <Field label="البريد الإلكتروني" value={user?.email} />
              <Field label="رقم التسجيل" value={user?.registrationNumber ?? "—"} />
              <div className="sm:col-span-2 flex items-center gap-2 text-sm text-primary">
                <CheckCircle2 className="size-4" /> جهة موثّقة على المنصة
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}

function CreateProjectDialog({ open, setOpen, draft, setDraft, onCreate }: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gold-gradient text-gold-foreground gap-2">
          <Plus className="size-4" /> مشروع وقفي جديد
        </Button>
      </DialogTrigger>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>إضافة مشروع جديد</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="t">عنوان المشروع</Label>
            <Input id="t" value={draft.title} className="mt-1"
              onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="c">التصنيف</Label>
              <select id="c" value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className="mt-1 w-full h-10 rounded-md border bg-background px-3 text-sm">
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="g">المبلغ المستهدف ($)</Label>
              <Input id="g" type="number" value={draft.goal} className="mt-1"
                onChange={(e) => setDraft({ ...draft, goal: e.target.value })} />
            </div>
          </div>
          <div>
            <Label htmlFor="d">وصف مختصر</Label>
            <Textarea id="d" rows={3} value={draft.description} className="mt-1"
              onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onCreate} className="bg-primary-gradient text-primary-foreground">
            إرسال للمراجعة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium mt-0.5">{value ?? "—"}</div>
    </div>
  );
}

function OrgKPI({ icon: Icon, label, value, prefix, suffix, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border rounded-3xl p-6 shadow-soft"
    >
      <div className={`size-11 rounded-xl grid place-items-center mb-3 ${
        color === "gold" ? "bg-gold-gradient text-gold-foreground" :
        color === "navy" ? "bg-navy text-navy-foreground" :
        "bg-primary-gradient text-primary-foreground"
      }`}>
        <Icon className="size-5" />
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-display text-2xl font-extrabold mt-1">
        <Counter value={value} prefix={prefix} suffix={suffix} />
      </div>
    </motion.div>
  );
}
