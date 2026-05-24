import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  MapPin, Users, Clock, ShieldCheck, Award, BarChart3, CheckCircle2, Circle, MessageSquare, Share2, Heart,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { getProject, projects, categories, type Project } from "@/data/projects";
import { formatCurrency, formatNumber, pct } from "@/lib/format";

export const Route = createFileRoute("/projects/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project: project! };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — منصة الوقف الرقمي` },
          { name: "description", content: loaderData.project.shortDescription },
          { property: "og:title", content: loaderData.project.title },
          { property: "og:description", content: loaderData.project.shortDescription },
          { property: "og:image", content: loaderData.project.image },
        ]
      : [],
  }),
  component: ProjectDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-4xl font-display font-bold">المشروع غير موجود</h1>
        <Link to="/projects" className="text-primary underline mt-4 inline-block">عودة للمشاريع</Link>
      </div>
    </SiteLayout>
  ),
});

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };
  const cat = categories.find((c) => c.id === project.category)!;
  const p = pct(project.raised, project.goal);
  const similar = projects.filter((x) => x.id !== project.id && x.category === project.category).slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative">
        <div className="aspect-[21/9] md:aspect-[21/7] overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      </section>

      <section className="container mx-auto px-4 -mt-24 md:-mt-32 relative">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-3xl p-8 shadow-elegant">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge className="bg-accent text-accent-foreground border-0">{cat.icon} {cat.label}</Badge>
                {project.shariaCompliant && (
                  <Badge className="bg-primary-gradient text-primary-foreground border-0 gap-1">
                    <ShieldCheck className="size-3" /> متوافق شرعياً
                  </Badge>
                )}
                {project.verified && (
                  <Badge className="bg-gold-gradient text-gold-foreground border-0 gap-1">
                    <Award className="size-3" /> موثوق
                  </Badge>
                )}
                <Badge variant="outline" className="gap-1">
                  <BarChart3 className="size-3" /> شفافية {project.transparencyScore}%
                </Badge>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold leading-tight">{project.title}</h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="size-4" /> {project.location}</span>
                <span className="flex items-center gap-1"><Clock className="size-4" /> {project.daysLeft} يوم متبقٍ</span>
              </div>
            </motion.div>

            <Tabs defaultValue="story" className="w-full">
              <TabsList className="bg-card border h-12 p-1 w-full justify-start overflow-x-auto">
                <TabsTrigger value="story">القصة</TabsTrigger>
                <TabsTrigger value="timeline">المراحل</TabsTrigger>
                <TabsTrigger value="updates">التحديثات</TabsTrigger>
                <TabsTrigger value="gallery">المعرض</TabsTrigger>
                <TabsTrigger value="comments">التعليقات</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="mt-6 space-y-6">
                <div className="bg-card border rounded-3xl p-8">
                  <h2 className="font-display text-2xl font-bold mb-4">قصة المشروع</h2>
                  <p className="text-lg leading-loose text-muted-foreground">{project.story}</p>

                  <div className="mt-8 grid sm:grid-cols-3 gap-4">
                    {project.impact.map((it) => (
                      <div key={it.label} className="p-5 rounded-2xl bg-accent text-center">
                        <div className="font-display text-2xl font-extrabold text-primary">{it.value}</div>
                        <div className="text-sm text-muted-foreground mt-1">{it.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="mt-6">
                <div className="bg-card border rounded-3xl p-8">
                  <h2 className="font-display text-2xl font-bold mb-6">مراحل التنفيذ</h2>
                  <div className="space-y-5">
                    {project.timeline.map((t, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          {t.done ? (
                            <CheckCircle2 className="size-7 text-primary" />
                          ) : (
                            <Circle className="size-7 text-muted-foreground" />
                          )}
                          {i < project.timeline.length - 1 && (
                            <div className={`w-0.5 flex-1 mt-2 ${t.done ? "bg-primary" : "bg-border"}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <div className="text-xs text-muted-foreground">{t.date}</div>
                          <div className="font-bold mt-0.5">{t.title}</div>
                          <div className="text-sm text-muted-foreground mt-1">{t.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="updates" className="mt-6 space-y-4">
                {project.updates.length === 0 ? (
                  <div className="bg-card border rounded-3xl p-12 text-center text-muted-foreground">
                    لا توجد تحديثات بعد. ترقب الجديد قريباً.
                  </div>
                ) : (
                  project.updates.map((u, i) => (
                    <div key={i} className="bg-card border rounded-2xl p-6">
                      <div className="text-xs text-muted-foreground">{u.date}</div>
                      <div className="font-bold text-lg mt-1">{u.title}</div>
                      <p className="text-muted-foreground mt-2 leading-relaxed">{u.content}</p>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.gallery.map((g, i) => (
                    <motion.img
                      key={i}
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      src={g}
                      alt=""
                      className="rounded-2xl aspect-[4/3] object-cover w-full hover:scale-[1.02] transition-transform"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                <div className="bg-card border rounded-3xl p-8">
                  <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="size-5" /> تفاعل المتبرعين
                  </h3>
                  <div className="space-y-4">
                    {[
                      { n: "أحمد م.", t: "اللهم تقبّل، مشروع رائع وفكرة عظيمة.", a: "AM" },
                      { n: "فاطمة ز.", t: "تم التبرع، نتابع باهتمام.", a: "FZ" },
                    ].map((c, i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-xl bg-accent">
                        <div className="size-10 rounded-full bg-primary-gradient text-primary-foreground grid place-items-center font-bold text-sm">
                          {c.a}
                        </div>
                        <div>
                          <div className="font-bold text-sm">{c.n}</div>
                          <div className="text-sm text-muted-foreground">{c.t}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sticky donation widget */}
          <aside className="lg:sticky lg:top-20 self-start">
            <div className="bg-card border rounded-3xl p-7 shadow-elegant">
              <div className="flex items-end justify-between mb-3">
                <div>
                  <div className="font-display text-3xl font-extrabold text-primary">{formatCurrency(project.raised)}</div>
                  <div className="text-sm text-muted-foreground">من هدف {formatCurrency(project.goal)}</div>
                </div>
                <div className="text-4xl font-display font-extrabold text-hero-gradient">{p}%</div>
              </div>
              <Progress value={p} className="h-3" />

              <div className="grid grid-cols-2 gap-3 my-5">
                <Stat icon={Users} v={formatNumber(project.donors)} l="متبرع" />
                <Stat icon={Clock} v={`${project.daysLeft}`} l="يوم متبقٍ" />
              </div>

              <Link to="/donate/$projectId" params={{ projectId: project.id }}>
                <Button className="w-full h-12 bg-primary-gradient text-primary-foreground shadow-elegant text-base font-bold">
                  <Heart className="size-4 ml-1" /> تبرع الآن
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <Button variant="outline" className="gap-1">
                  <Share2 className="size-4" /> مشاركة
                </Button>
                <Button variant="outline" className="gap-1">
                  <Heart className="size-4" /> حفظ
                </Button>
              </div>

              <div className="mt-6 pt-5 border-t space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> دفع آمن ومشفر</div>
                <div className="flex items-center gap-2"><Award className="size-4 text-primary" /> 100% يصل للمستفيد</div>
                <div className="flex items-center gap-2"><BarChart3 className="size-4 text-primary" /> تقرير أثر شخصي</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-3xl font-extrabold mb-8">مشاريع مشابهة</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((s, i) => <ProjectCard key={s.id} project={s} index={i} />)}
            </div>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function Stat({ icon: Icon, v, l }: { icon: any; v: string; l: string }) {
  return (
    <div className="p-3 rounded-xl bg-accent text-center">
      <Icon className="size-4 mx-auto text-primary mb-1" />
      <div className="font-bold">{v}</div>
      <div className="text-xs text-muted-foreground">{l}</div>
    </div>
  );
}
