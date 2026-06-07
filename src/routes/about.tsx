import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Heart, ShieldCheck, Users, Sparkles, Target, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "من نحن — منصة الوقف الرقمي" },
      { name: "description", content: "تعرّف على رؤيتنا ورسالتنا وفريقنا في إحياء سنة الوقف الإسلامي رقمياً." },
    ],
  }),
});

function About() {
  return (
    <SiteLayout>
      <section className="bg-soft-gradient py-20 border-b">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <Badge className="bg-accent text-accent-foreground border-0 mb-4">من نحن</Badge>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight">
            نُحيي سنة الوقف
            <br /><span className="text-hero-gradient">في زمن جديد.</span>
          </h1>
          <p className="text-muted-foreground text-lg mt-5 leading-relaxed">
            منصة الوقف الرقمي وُلدت من قناعة بأن الوقف الإسلامي — هذه الأداة العبقرية للتنمية المستدامة —
            يستحق أدوات تقنية بمستوى عظمته. نحن جسر بين قرون من الفقه، ولحظة من التحوّل الرقمي.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Eye, t: "رؤيتنا", d: "أن نكون المنصة الأولى عالمياً للوقف الإسلامي الرقمي بحلول 2030." },
            { icon: Target, t: "رسالتنا", d: "تمكين كل مسلم من إنشاء وقف رقمي شفاف، آمن، ومتوافق مع الشريعة." },
            { icon: Heart, t: "قيمنا", d: "الشفافية، الأمانة، الإتقان، والامتثال الشرعي قبل كل شيء." },
            { icon: Award, t: "تاريخ التأسيس", d: "2026 — انطلقنا بشغف لخدمة الأمة وإحياء سنة الوقف." },
          ].map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass shadow-soft hover:shadow-elegant transition-all"
            >
              <div className="size-14 rounded-2xl bg-primary-gradient grid place-items-center mb-5 shadow-elegant">
                <v.icon className="size-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl font-extrabold mb-2">{v.t}</h3>
              <p className="text-muted-foreground leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-hero-gradient text-primary-foreground p-12 shadow-elegant">
          <div className="absolute inset-0 pattern-grid opacity-20" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge className="bg-white/15 text-white border-0 mb-4 gap-1">
                <ShieldCheck className="size-3.5" /> الامتثال الشرعي
              </Badge>
              <h2 className="font-display text-4xl font-extrabold mb-4">حوكمة شرعية مستقلة</h2>
              <p className="opacity-90 leading-relaxed">
                هيئة شرعية مكوّنة من علماء ومتخصصين في فقه الوقف والمعاملات تراجع كل مشروع وكل آلية،
                وتُصدر شهادة توافق علنية لكل ما يُعرض على المنصة.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["AAOIFI", "IFSB", "هيئة فقهية", "تدقيق Big4"].map((s) => (
                <div key={s} className="glass rounded-2xl p-4 text-center font-bold">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <Badge className="bg-accent text-accent-foreground border-0 mb-3">الفريق</Badge>
          <h2 className="font-display text-4xl font-extrabold">عقول تجمع بين الفقه والتكنولوجيا</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { n: "د. عبدالرحمن الفهد", r: "رئيس الهيئة الشرعية", a: "AF" },
            { n: "م. سارة العتيبي", r: "الرئيس التنفيذي", a: "SO" },
            { n: "م. يوسف القحطاني", r: "رئيس التقنية", a: "YQ" },
            { n: "ليلى المنصور", r: "رئيس الشراكات", a: "LM" },
          ].map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border rounded-3xl p-6 text-center shadow-soft hover:shadow-elegant transition-all"
            >
              <div className="size-20 rounded-full bg-primary-gradient text-primary-foreground grid place-items-center font-display font-extrabold text-2xl mx-auto mb-4 shadow-elegant">
                {p.a}
              </div>
              <div className="font-bold">{p.n}</div>
              <div className="text-sm text-muted-foreground">{p.r}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <Badge className="bg-accent text-accent-foreground border-0 mb-3">الشركاء</Badge>
          <h2 className="font-display text-3xl font-extrabold">شراكات استراتيجية في الجزائر</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {["IFAD", "IsDB", "UNHCR", "Awqaf SA", "LaunchGood"].map((p) => (
            <div key={p} className="glass rounded-2xl p-6 text-center font-display font-bold text-lg text-muted-foreground hover:text-primary transition-colors">
              {p}
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
