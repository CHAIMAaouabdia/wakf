import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp, Users, Heart, DollarSign, Folder, AlertCircle, MoreHorizontal, Search,
} from "lucide-react";
import {
  BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart, Line, CartesianGrid,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";
import { RequireRole } from "@/components/site/RequireRole";
import { projects, categories } from "@/data/projects";
import { formatCurrency, formatNumber, pct } from "@/lib/format";
import { ROLE_LABELS, type PublicUser, type Role } from "@/lib/auth";
import {
  getSubmissions, setSubmissionStatus, subscribeSubmissions, type Submission,
} from "@/lib/submissions";
import { CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "لوحة الإدارة — منصة الوقف الرقمي" }] }),
});

function AdminPage() {
  return (
    <RequireRole roles={["admin"]}>
      <Admin />
    </RequireRole>
  );
}

const trend = [
  { d: "السبت", v: 4200 }, { d: "الأحد", v: 5100 }, { d: "الإثنين", v: 4800 },
  { d: "الثلاثاء", v: 6200 }, { d: "الأربعاء", v: 7100 }, { d: "الخميس", v: 8400 }, { d: "الجمعة", v: 11200 },
];

const catData = [
  { c: "المياه", v: 3200 }, { c: "التعليم", v: 4100 }, { c: "الأيتام", v: 2800 },
  { c: "المساجد", v: 1900 }, { c: "الصحة", v: 2400 }, { c: "الطاقة", v: 1700 },
];

function Admin() {
  return (
    <SiteLayout>
      <section className="bg-navy text-navy-foreground py-10">
        <div className="container mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
          <div>
            <Badge className="bg-gold-gradient text-gold-foreground border-0 mb-2">Admin</Badge>
            <h1 className="font-display text-3xl font-extrabold">لوحة تحكم الإدارة</h1>
            <p className="opacity-70 text-sm mt-1">نظرة شاملة على أداء المنصة في الوقت الفعلي.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-60" />
              <Input placeholder="بحث..." className="bg-white/10 border-white/15 text-white pr-10 placeholder:text-white/50 w-64" />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 space-y-8">
        {/* KPIs */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminKPI icon={DollarSign} label="إجمالي اليوم" value={42180} prefix="$ " trend="+18%" />
          <AdminKPI icon={Heart} label="تبرعات نشطة" value={1284} trend="+24%" />
          <AdminKPI icon={Users} label="مستخدمون جدد" value={328} trend="+12%" />
          <AdminKPI icon={Folder} label="مشاريع قيد المراجعة" value={7} trend="3 جديدة" warn />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border rounded-3xl p-6 shadow-soft">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-display font-bold text-lg">تدفق التبرعات</h3>
                <p className="text-sm text-muted-foreground">آخر 7 أيام</p>
              </div>
              <Badge className="bg-primary/15 text-primary border-0">إجمالي $46,000</Badge>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.008 220)" />
                <XAxis dataKey="d" stroke="oklch(0.48 0.02 240)" fontSize={12} />
                <YAxis stroke="oklch(0.48 0.02 240)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Line type="monotone" dataKey="v" stroke="oklch(0.52 0.13 162)" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border rounded-3xl p-6 shadow-soft">
            <h3 className="font-display font-bold text-lg mb-1">حسب التصنيف</h3>
            <p className="text-sm text-muted-foreground mb-4">المبالغ المجمّعة</p>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={catData}>
                <XAxis dataKey="c" stroke="oklch(0.48 0.02 240)" fontSize={11} />
                <YAxis stroke="oklch(0.48 0.02 240)" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="v" fill="oklch(0.52 0.13 162)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Tabs defaultValue="projects">
          <TabsList className="bg-card border h-12 p-1 flex-wrap h-auto">
            <TabsTrigger value="projects">إدارة المشاريع</TabsTrigger>
            <TabsTrigger value="approvals">طلبات النشر</TabsTrigger>
            <TabsTrigger value="donations">التبرعات</TabsTrigger>
            <TabsTrigger value="users">المستخدمون</TabsTrigger>
            <TabsTrigger value="ops">العمليات</TabsTrigger>
          </TabsList>

          <TabsContent value="approvals" className="mt-6">
            <ApprovalsTable />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="bg-card border rounded-3xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-right">
                  <tr>
                    <th className="p-4 font-semibold">المشروع</th>
                    <th className="p-4 font-semibold">التصنيف</th>
                    <th className="p-4 font-semibold">التقدم</th>
                    <th className="p-4 font-semibold">المتبرعون</th>
                    <th className="p-4 font-semibold">الحالة</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((p) => (
                    <tr key={p.id} className="border-t hover:bg-muted/30">
                      <td className="p-4 max-w-xs">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="size-10 rounded-lg object-cover" alt="" />
                          <span className="font-medium line-clamp-1">{p.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{p.category}</td>
                      <td className="p-4 min-w-[160px]">
                        <div className="flex items-center gap-2">
                          <Progress value={pct(p.raised, p.goal)} className="h-2 flex-1" />
                          <span className="text-xs font-bold">{pct(p.raised, p.goal)}%</span>
                        </div>
                      </td>
                      <td className="p-4">{formatNumber(p.donors)}</td>
                      <td className="p-4">
                        <Badge className="bg-primary/15 text-primary border-0">نشط</Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="mt-6">
            <div className="bg-card border rounded-3xl p-6 text-muted-foreground">
              تدفّق التبرعات اللحظية يظهر هنا — متصل بمسار مالي مفتوح ومسار تدقيق.
            </div>
          </TabsContent>
          <TabsContent value="users" className="mt-6 space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { n: "متبرعون", v: 47200 },
                { n: "نشطون شهرياً", v: 18430 },
                { n: "موثقون شرعياً", v: 312 },
              ].map((s, i) => (
                <div key={i} className="bg-card border rounded-2xl p-6">
                  <div className="text-sm text-muted-foreground">{s.n}</div>
                  <div className="font-display text-3xl font-extrabold mt-2 text-primary">
                    <Counter value={s.v} />
                  </div>
                </div>
              ))}
            </div>
            <AccountsTable />
          </TabsContent>
          <TabsContent value="ops" className="mt-6">
            <div className="bg-card border rounded-3xl p-6 flex items-start gap-3">
              <AlertCircle className="size-5 text-gold mt-0.5" />
              <div className="text-sm">
                <div className="font-bold">3 عمليات تتطلب مراجعة يدوية</div>
                <div className="text-muted-foreground">تحويلات بنكية بقيمة إجمالية 12,400$ بانتظار توثيق المستفيدين.</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}

const roleBadge: Record<Role, string> = {
  admin: "bg-navy text-navy-foreground",
  donor: "bg-primary/15 text-primary",
  organization: "bg-gold/20 text-gold-foreground",
};

function ApprovalsTable() {
  const [subs, setSubs] = useState<Submission[]>([]);

  useEffect(() => {
    const load = () => setSubs(getSubmissions());
    load();
    return subscribeSubmissions(load);
  }, []);

  const pending = subs.filter((s) => s.status === "pending");

  const act = (id: string, status: "approved" | "rejected") => {
    setSubmissionStatus(id, status);
    toast.success(status === "approved" ? "تمت الموافقة على النشر ✅" : "تم رفض الطلب");
  };

  return (
    <div className="bg-card border rounded-3xl overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-display font-bold">طلبات النشر من الجمعيات</h3>
        <Badge className="bg-gold/20 text-gold-foreground border-0">{pending.length} قيد المراجعة</Badge>
      </div>
      {subs.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">
          لا توجد طلبات نشر حالياً. ستظهر هنا المشاريع التي ترسلها الجمعيات.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-right">
            <tr>
              <th className="p-4 font-semibold">المشروع</th>
              <th className="p-4 font-semibold">الجمعية</th>
              <th className="p-4 font-semibold">التصنيف</th>
              <th className="p-4 font-semibold">الولاية</th>
              <th className="p-4 font-semibold">المبلغ</th>
              <th className="p-4 font-semibold">الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-t hover:bg-muted/30">
                <td className="p-4 font-medium">{s.title}</td>
                <td className="p-4 text-muted-foreground">{s.organization}</td>
                <td className="p-4 text-muted-foreground">
                  {categories.find((c) => c.id === s.category)?.label ?? s.category}
                </td>
                <td className="p-4 text-muted-foreground">{s.wilaya}</td>
                <td className="p-4 text-primary font-bold">{formatCurrency(s.goal)}</td>
                <td className="p-4">
                  {s.status === "pending" ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => act(s.id, "approved")}
                        className="bg-primary-gradient text-primary-foreground gap-1 h-8">
                        <CheckCircle2 className="size-4" /> موافقة
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => act(s.id, "rejected")}
                        className="gap-1 h-8 text-destructive">
                        <XCircle className="size-4" /> رفض
                      </Button>
                    </div>
                  ) : s.status === "approved" ? (
                    <Badge className="bg-primary/15 text-primary border-0">منشور</Badge>
                  ) : (
                    <Badge className="bg-destructive/15 text-destructive border-0">مرفوض</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


function AccountsTable() {
  const [users, setUsers] = useState<PublicUser[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("waqf_users");
      if (raw) {
        const parsed = JSON.parse(raw) as (PublicUser & { password?: string })[];
        setUsers(parsed.map(({ password: _p, ...u }) => u));
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="bg-card border rounded-3xl overflow-hidden">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-display font-bold">الحسابات المسجّلة</h3>
        <Badge className="bg-primary/15 text-primary border-0">{users.length} حساب</Badge>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-right">
          <tr>
            <th className="p-4 font-semibold">الاسم</th>
            <th className="p-4 font-semibold">البريد</th>
            <th className="p-4 font-semibold">النوع</th>
            <th className="p-4 font-semibold">تاريخ الإنشاء</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t hover:bg-muted/30">
              <td className="p-4 font-medium">{u.name}</td>
              <td className="p-4 text-muted-foreground">{u.email}</td>
              <td className="p-4">
                <Badge className={`${roleBadge[u.role]} border-0`}>{ROLE_LABELS[u.role]}</Badge>
              </td>
              <td className="p-4 text-muted-foreground">
                {new Date(u.createdAt).toLocaleDateString("ar")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdminKPI({ icon: Icon, label, value, prefix, trend, warn }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border rounded-3xl p-6 shadow-soft"
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`size-11 rounded-xl grid place-items-center ${warn ? "bg-gold-gradient text-gold-foreground" : "bg-primary-gradient text-primary-foreground"}`}>
          <Icon className="size-5" />
        </div>
        <Badge variant="outline" className="text-xs">{trend}</Badge>
      </div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-display text-2xl font-extrabold mt-1">
        <Counter value={value} prefix={prefix} />
      </div>
    </motion.div>
  );
}
