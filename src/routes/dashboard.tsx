import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Heart, TrendingUp, Award, Bell, Bookmark, Activity, Trophy, Calendar, ArrowLeft,
} from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area, PieChart, Pie, Cell,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Counter } from "@/components/site/Counter";
import { projects } from "@/data/projects";
import { formatCurrency } from "@/lib/format";
import { RequireRole } from "@/components/site/RequireRole";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  head: () => ({ meta: [{ title: "لوحة التحكم — منصة الوقف الرقمي" }] }),
});

function DashboardPage() {
  return (
    <RequireRole roles={["donor"]}>
      <Dashboard />
    </RequireRole>
  );
}

const monthly = [
  { m: "يناير", v: 120 }, { m: "فبراير", v: 180 }, { m: "مارس", v: 90 },
  { m: "أبريل", v: 220 }, { m: "مايو", v: 310 }, { m: "يونيو", v: 280 },
];

const breakdown = [
  { name: "المياه", value: 35, color: "oklch(0.52 0.13 162)" },
  { name: "التعليم", value: 25, color: "oklch(0.78 0.13 85)" },
  { name: "الأيتام", value: 20, color: "oklch(0.55 0.15 250)" },
  { name: "أخرى", value: 20, color: "oklch(0.65 0.18 30)" },
];

const history = [
  { id: 1, project: "حفر 30 بئراً في غرداية", amount: 250, date: "12 مايو 2026", status: "مكتمل" },
  { id: 2, project: "مدرسة وقفية في بسكرة", amount: 100, date: "3 مايو 2026", status: "مكتمل" },
  { id: 3, project: "كفالة 100 يتيم في الأغواط", amount: 500, date: "21 أبريل 2026", status: "مكتمل" },
  { id: 4, project: "محطة طاقة شمسية لمستشفى وهران", amount: 250, date: "8 أبريل 2026", status: "مكتمل" },
];

function Dashboard() {
  const { user } = useAuth();
  return (
    <SiteLayout>
      <section className="py-12 bg-soft-gradient border-b">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Badge className="bg-accent text-accent-foreground border-0 mb-2">مرحباً بعودتك</Badge>
            <h1 className="font-display text-4xl font-extrabold">أهلاً، {user?.name ?? "عبدالله"} 👋</h1>
            <p className="text-muted-foreground mt-1">شكراً لعطائك المستمر. هذا أثرك حتى الآن.</p>
          </div>
          <Link to="/projects">
            <Button className="bg-primary-gradient text-primary-foreground gap-2">
              تبرع جديد <ArrowLeft className="size-4" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container mx-auto px-4 py-10 space-y-8">
        {/* KPI cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPI icon={Heart} label="إجمالي التبرعات" value={4280} prefix="دج " color="primary" />
          <KPI icon={TrendingUp} label="مشاريع مدعومة" value={12} color="gold" />
          <KPI icon={Award} label="شارة الإنجاز" value={5} color="primary" />
          <KPI icon={Activity} label="مستفيدون من تبرعك" value={2840} suffix="+" color="navy" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-card border rounded-3xl p-6 shadow-soft"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-display font-bold text-lg">تبرعاتي الشهرية</h3>
                <p className="text-sm text-muted-foreground">آخر 6 شهور</p>
              </div>
              <Badge className="bg-accent text-accent-foreground border-0">+24% عن الشهر السابق</Badge>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthly}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.52 0.13 162)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.52 0.13 162)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" stroke="oklch(0.48 0.02 240)" fontSize={12} />
                <YAxis stroke="oklch(0.48 0.02 240)" fontSize={12} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.008 220)" }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.52 0.13 162)" strokeWidth={3} fill="url(#g1)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border rounded-3xl p-6 shadow-soft"
          >
            <h3 className="font-display font-bold text-lg mb-1">توزيع تبرعاتي</h3>
            <p className="text-sm text-muted-foreground mb-4">حسب التصنيف</p>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={breakdown} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {breakdown.map((b, i) => <Cell key={i} fill={b.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {breakdown.map((b) => (
                <div key={b.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full" style={{ background: b.color }} />
                    {b.name}
                  </div>
                  <span className="font-bold">{b.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs section */}
        <Tabs defaultValue="history">
          <TabsList className="bg-card border h-12 p-1">
            <TabsTrigger value="history"><Calendar className="size-4 ml-1" /> سجل التبرعات</TabsTrigger>
            <TabsTrigger value="saved"><Bookmark className="size-4 ml-1" /> المحفوظات</TabsTrigger>
            <TabsTrigger value="badges"><Trophy className="size-4 ml-1" /> الشارات</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="size-4 ml-1" /> الإشعارات</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <div className="bg-card border rounded-3xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr className="text-right">
                    <th className="p-4 font-semibold">المشروع</th>
                    <th className="p-4 font-semibold">المبلغ</th>
                    <th className="p-4 font-semibold">التاريخ</th>
                    <th className="p-4 font-semibold">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h) => (
                    <tr key={h.id} className="border-t hover:bg-muted/30">
                      <td className="p-4 font-medium">{h.project}</td>
                      <td className="p-4 text-primary font-bold">{formatCurrency(h.amount)}</td>
                      <td className="p-4 text-muted-foreground">{h.date}</td>
                      <td className="p-4">
                        <Badge className="bg-primary/15 text-primary border-0">{h.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="saved" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.slice(0, 3).map((p) => (
                <Link key={p.id} to="/projects/$projectId" params={{ projectId: p.id }} className="bg-card border rounded-2xl overflow-hidden hover:shadow-elegant transition-all">
                  <img src={p.image} alt="" className="h-32 w-full object-cover" />
                  <div className="p-4">
                    <div className="font-bold line-clamp-1">{p.title}</div>
                    <Progress value={Math.round((p.raised / p.goal) * 100)} className="h-1.5 mt-2" />
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { i: "🥇", t: "المتبرع الذهبي" },
                { i: "💧", t: "صديق الماء" },
                { i: "📚", t: "داعم التعليم" },
                { i: "🌟", t: "وفي العطاء" },
                { i: "🕌", t: "بانٍ مساجد" },
                { i: "🤲", t: "كافل أيتام" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.04 }}
                  className="bg-card border rounded-2xl p-6 text-center shadow-soft"
                >
                  <div className="text-5xl mb-2">{b.i}</div>
                  <div className="font-bold">{b.t}</div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6 space-y-3">
            {[
              { t: "تحديث جديد من مشروع البئر #22 تم اكتماله", d: "منذ ساعتين" },
              { t: "وصل تبرعك للمستفيدين في تشاد ✅", d: "أمس" },
              { t: "شارة جديدة: المتبرع الذهبي 🥇", d: "منذ 3 أيام" },
            ].map((n, i) => (
              <div key={i} className="bg-card border rounded-2xl p-4 flex items-start gap-3 hover:shadow-soft transition-all">
                <div className="size-10 rounded-xl bg-accent grid place-items-center">
                  <Bell className="size-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{n.t}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.d}</div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </SiteLayout>
  );
}

function KPI({ icon: Icon, label, value, prefix, suffix, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card border rounded-3xl p-6 shadow-soft hover:shadow-elegant transition-all"
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
