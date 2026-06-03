import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Heart,
  CheckCircle2,
  Eye,
  LineChart,
  Lock,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Counter } from "@/components/site/Counter";
import { projects, stats, testimonials, faqs, categories } from "@/data/projects";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "منصة الوقف الرقمي — أحيِ سنة الوقف رقمياً" },
      { name: "description", content: "ادعم المشاريع الوقفية الإسلامية رقمياً بشفافية كاملة وامتثال شرعي. تتبع أثر تبرعاتك لحظياً." },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>
      <Hero />
      <StatsBand />
      <HowItWorks />
      <FeaturedProjects />
      <WhyUs />
      <Transparency />
      <PlatformSupport />

      <Testimonials />
      <FAQ />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 lg:pt-20 pb-24 bg-soft-gradient">
      <div className="absolute inset-0 pattern-dots opacity-60" />
      <div className="absolute -top-32 -left-32 size-[500px] rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute -bottom-32 -right-32 size-[500px] rounded-full bg-gold/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container relative mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-accent text-accent-foreground border-0 px-4 py-1.5 rounded-full">
              <Sparkles className="size-3.5 ml-1" />
              منصة الوقف #1 في العالم العربي
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight"
          >
            أحيِ سنة الوقف
            <br />
            <span className="text-hero-gradient">في زمن رقمي.</span>
            <span className="block mt-3 font-display text-xl md:text-2xl font-semibold text-muted-foreground tracking-normal">
              حيث يلتقي طموح الإدارة بنبل العطاء..
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-xl"
          >
            منصة متكاملة تجمع بين فقه الوقف الإسلامي وتقنيات الـ Fintech الحديثة.
            ادعم مشاريع موثوقة، تابع أثر تبرعك لحظياً، واترك صدقة جارية.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/projects">
              <Button size="lg" className="bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-95 px-7 h-12">
                استكشف المشاريع
                <ArrowLeft className="size-4 mr-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="h-12 px-7">
                كيف تعمل المنصة؟
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center gap-6 pt-2 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-1.5"><ShieldCheck className="size-4 text-primary" /> هيئة شرعية مستقلة</div>
            <div className="flex items-center gap-1.5"><Lock className="size-4 text-primary" /> دفع آمن</div>
            <div className="flex items-center gap-1.5"><Eye className="size-4 text-primary" /> شفافية 100%</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-hero-gradient rounded-[2.5rem] rotate-3 shadow-elegant" />
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden -rotate-3 shadow-elegant border-4 border-card">
              <img
                src="https://images.unsplash.com/photo-1542816417-0983c9c9ad53?auto=format&fit=crop&w=1200&q=80"
                alt="مشاريع وقفية"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-4 shadow-elegant w-56"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-primary-gradient grid place-items-center">
                  <TrendingUp className="size-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">جُمع اليوم</div>
                  <div className="font-bold">42,180 دج</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute -top-6 -left-6 glass-strong rounded-2xl p-4 shadow-elegant"
            >
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gold-gradient grid place-items-center">
                  <ShieldCheck className="size-5 text-gold-foreground" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">معتمد شرعياً</div>
                  <div className="font-bold text-sm">184 مشروعاً</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBand() {
  const items = [
    { icon: TrendingUp, label: "إجمالي التبرعات", value: stats.totalRaised, prefix: "$ " },
    { icon: Heart, label: "مشاريع ممولة", value: stats.projectsFunded },
    { icon: Users, label: "متبرع كريم", value: stats.donors, suffix: "+" },
    { icon: Globe, label: "ولاية جزائرية", value: stats.wilayas },
  ];
  return (
    <section className="py-14 border-y bg-card">
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <div className="inline-grid place-items-center size-12 rounded-2xl bg-accent mb-3">
              <it.icon className="size-6 text-primary" />
            </div>
            <div className="font-display text-3xl md:text-4xl font-extrabold text-hero-gradient">
              <Counter value={it.value} prefix={it.prefix} suffix={it.suffix} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Eye, title: "اختر مشروعاً موثوقاً", desc: "تصفّح مشاريع موثقة شرعياً مع تقارير تفصيلية كاملة." },
    { icon: Heart, title: "تبرع بأمان", desc: "ادفع بأي وسيلة. خصم 0% — تبرعك يصل بالكامل." },
    { icon: LineChart, title: "تابع الأثر", desc: "لوحة شفافية مباشرة تعرض تقدم المشروع وأثره." },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="كيف تعمل المنصة"
          title="ثلاث خطوات. أثر يدوم."
          subtitle="صممنا التجربة لتكون بسيطة كرسالة نصية، وعميقة كأجر يدوم."
        />
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl glass shadow-soft hover:shadow-elegant transition-all group"
            >
              <div className="absolute top-6 left-6 size-10 rounded-xl bg-gold-gradient text-gold-foreground grid place-items-center font-display font-bold text-lg">
                {i + 1}
              </div>
              <div className="size-14 rounded-2xl bg-primary-gradient grid place-items-center mb-5 shadow-elegant group-hover:scale-105 transition-transform">
                <s.icon className="size-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = projects.slice(0, 3);
  return (
    <section className="py-24 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Badge className="bg-accent text-accent-foreground border-0 mb-3">المشاريع المميزة</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold">مشاريع تنتظر دعمك</h2>
          </div>
          <Link to="/projects">
            <Button variant="outline" className="gap-2">
              عرض كل المشاريع <ArrowLeft className="size-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: ShieldCheck, title: "امتثال شرعي مطلق", desc: "هيئة شرعية مستقلة تراجع كل مشروع قبل إدراجه." },
    { icon: Eye, title: "شفافية مالية كاملة", desc: "تقارير لحظية، إيصالات بنكية، صور وفيديوهات من الميدان." },
    { icon: Lock, title: "أمان من الطبقة المصرفية", desc: "تشفير من طرف لطرف ومعايير PCI-DSS لكل المعاملات." },
    { icon: TrendingUp, title: "أثر قابل للقياس", desc: "مؤشرات أداء حقيقية لكل دولار يصل للمستفيد." },
    { icon: Heart, title: "0% رسوم تشغيلية", desc: "تبرعك يصل بالكامل. تشغيلنا ممول من أوقاف مستقلة." },
    { icon: Globe, title: "تغطية وطنية", desc: "48 ولاية، شراكات مع جمعيات معتمدة في كل ربوع الجزائر." },
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="لماذا نحن"
          title="ثقة تُبنى. أثر يُقاس."
          subtitle="نطبّق على أنفسنا ما نطلبه من شركائنا: شفافية لا تساوم، وحوكمة صارمة."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {items.map((it, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-card border hover:border-primary/40 transition-colors group"
            >
              <div className="size-11 rounded-xl bg-accent grid place-items-center mb-4 group-hover:bg-primary-gradient transition-all">
                <it.icon className="size-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-bold text-lg mb-1.5">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Transparency() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-hero-gradient p-10 md:p-16 text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-white/15 text-white border-0 mb-4">الشفافية أولاً</Badge>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                لوحة شفافية مباشرة
                <br /> لكل دولار، لكل قرار.
              </h2>
              <p className="opacity-90 text-lg leading-relaxed mb-7 max-w-xl">
                نشر تلقائي للإيصالات، تقارير ربع سنوية، تدقيق مستقل، ومسار مالي مفتوح يمكنك تتبعه من تبرعك حتى المستفيد.
              </p>
              <div className="flex flex-wrap gap-4">
                {["تدقيق Big4", "Blockchain Ledger", "Open Reports", "تقارير لحظية"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-5 text-gold" /> {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: "تكاليف تشغيلية", value: 0, max: 100, suffix: "%" },
                { label: "وصول للمستفيدين", value: 100, max: 100, suffix: "%" },
                { label: "مؤشر الشفافية", value: 96, max: 100, suffix: "/100" },
              ].map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl p-5"
                >
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{b.label}</span>
                    <span className="font-bold">{b.value}{b.suffix}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.value}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.1 }}
                      className="h-full bg-gold-gradient rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <SectionHeader eyebrow="آراؤهم" title="مجتمع يثق ويأتمن." subtitle="" />
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-card border shadow-soft relative"
            >
              <Quote className="size-10 text-primary/15 absolute top-6 left-6" />
              <p className="text-lg leading-relaxed mb-6 relative">{t.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t">
                <div className="size-11 rounded-full bg-primary-gradient text-primary-foreground grid place-items-center font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <SectionHeader eyebrow="الأسئلة الشائعة" title="إجابات صريحة لأسئلتك." subtitle="" />
        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border bg-card rounded-2xl px-6 data-[state=open]:shadow-soft"
            >
              <AccordionTrigger className="text-right font-display font-bold text-lg hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function PlatformSupport() {
  const tiers = [
    { amount: 1000, label: "داعم", desc: "مساهمة في تشغيل المنصة" },
    { amount: 5000, label: "شريك نماء", desc: "تطوير ميزات جديدة" },
    { amount: 20000, label: "مستثمر أثر", desc: "توسيع المنصة وطنياً" },
  ];
  return (
    <section className="py-24 bg-soft-gradient">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-card border shadow-elegant p-10 md:p-14">
          <div className="absolute -top-24 -left-24 size-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-accent text-accent-foreground border-0 mb-4">
                <Rocket className="size-3.5 ml-1" /> استثمر في المنصة
              </Badge>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                ادعم منصة الوقف الرقمي
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
                المنصة وقفٌ تقني بحد ذاته. تبرعك هنا لا يذهب لمشروع بعينه، بل يُستثمر في تطوير
                المنصة، تحسين الأمان والشفافية، وإيصال الوقف الرقمي لكل ولايات الجزائر.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                {["تطوير مستمر", "أمان أعلى", "تغطية أوسع", "0% رسوم على المشاريع"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-5 text-primary" /> {t}
                  </div>
                ))}
              </div>
              <Link to="/donate/$projectId" params={{ projectId: "platform-wakf" }}>
                <Button size="lg" className="bg-primary-gradient text-primary-foreground shadow-elegant px-8 h-12">
                  ساهم في تطوير المنصة
                  <ArrowLeft className="size-4 mr-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {tiers.map((tier, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to="/donate/$projectId"
                    params={{ projectId: "platform-wakf" }}
                    className="flex items-center justify-between gap-4 rounded-2xl border bg-background p-5 hover:border-primary/50 hover:shadow-soft transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-gold-gradient text-gold-foreground grid place-items-center">
                        <Heart className="size-6" />
                      </div>
                      <div>
                        <div className="font-display font-bold text-lg">{tier.label}</div>
                        <div className="text-sm text-muted-foreground">{tier.desc}</div>
                      </div>
                    </div>
                    <div className="font-display font-extrabold text-hero-gradient text-xl whitespace-nowrap">
                      {new Intl.NumberFormat("ar-EG").format(tier.amount)} دج
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16 text-center bg-card border shadow-elegant">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-4">
              ابدأ صدقتك الجارية اليوم
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              تبرعك اليوم يُحدث فرقاً يدوم لعقود. ابدأ بأي مبلغ، وستحصل على تقرير أثر شخصي.
            </p>
            <Link to="/projects">
              <Button size="lg" className="bg-primary-gradient text-primary-foreground shadow-elegant px-8 h-12">
                استعرض المشاريع الآن
                <ArrowLeft className="size-4 mr-1" />
              </Button>
            </Link>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              {categories.map((c) => (
                <Badge key={c.id} variant="outline" className="px-3 py-1.5 rounded-full">
                  {c.icon} {c.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <Badge className="bg-accent text-accent-foreground border-0 mb-4">{eyebrow}</Badge>
      <h2 className="font-display text-4xl md:text-5xl font-extrabold leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
    </div>
  );
}
