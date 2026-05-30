import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, ShieldCheck, Sparkles, Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/SiteLayout";
import { getProject, WILAYAS, type Project } from "@/data/projects";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/donate/$projectId")({
  loader: ({ params }) => {
    const project = getProject(params.projectId);
    if (!project) throw notFound();
    return { project: project! };
  },
  component: DonatePage,
  head: () => ({ meta: [{ title: "تبرع — منصة الوقف الرقمي" }] }),
});

const PRESETS = [500, 1000, 2000, 5000, 10000, 20000];
const METHODS = [
  { id: "cib", name: "CIB", desc: "بطاقة الدفع الذهبية CIB", emoji: "🏦" },
  { id: "edahabia", name: "الذهبية", desc: "بطاقة بريد الجزائر الذهبية", emoji: "💳" },
  { id: "baridimob", name: "BaridiMob", desc: "الدفع عبر تطبيق بريدي موب", emoji: "📱" },
  { id: "visa", name: "Visa / Mastercard", desc: "بطاقة دولية", emoji: "💠" },
];

function DonatePage() {
  const { project } = Route.useLoaderData() as { project: Project };
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(1000);
  const [method, setMethod] = useState("cib");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState(WILAYAS[15]);
  const [anonymous, setAnonymous] = useState(false);
  const [supportPlatform, setSupportPlatform] = useState(false);
  const [platformTip, setPlatformTip] = useState(200);
  const [card, setCard] = useState({ number: "", exp: "", cvv: "" });

  const total = amount + (supportPlatform ? platformTip : 0);

  const steps = ["المبلغ", "وسيلة الدفع", "التأكيد", "تم"];

  return (
    <SiteLayout>
      <section className="py-14 bg-soft-gradient min-h-screen">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/projects/$projectId" params={{ projectId: project.id }} className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
            <ArrowRight className="size-4" /> العودة للمشروع
          </Link>

          {/* Stepper */}
          <div className="mt-6 mb-10 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2 flex-1">
                <div className={`size-9 rounded-full grid place-items-center text-sm font-bold transition-colors ${
                  i <= step ? "bg-primary-gradient text-primary-foreground shadow-elegant" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="size-4" /> : i + 1}
                </div>
                <div className={`text-xs font-medium hidden sm:block ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</div>
                {i < steps.length - 1 && <div className={`flex-1 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-card border rounded-3xl p-8 shadow-elegant">
            <div className="mb-6 pb-6 border-b">
              <div className="text-xs text-muted-foreground">تتبرع لـ</div>
              <div className="font-display font-bold text-lg">{project.title}</div>
            </div>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-display text-2xl font-bold">اختر مبلغ التبرع</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESETS.map((v) => (
                      <button
                        key={v}
                        onClick={() => setAmount(v)}
                        className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                          amount === v ? "border-primary bg-accent text-primary shadow-soft" : "border-border hover:border-primary/40"
                        }`}
                      >
                        {v.toLocaleString("ar-EG")} دج
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">أو أدخل مبلغاً مخصصاً</label>
                    <div className="relative">
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">دج</span>
                      <Input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value) || 0)}
                        className="h-14 pr-10 text-xl font-bold"
                      />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-accent flex items-start gap-3">
                    <Sparkles className="size-5 text-primary mt-0.5" />
                    <div className="text-sm">
                      <div className="font-bold">صدقة جارية</div>
                      <div className="text-muted-foreground">100% من تبرعك يصل للمستفيدين. لا نأخذ أي رسوم.</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border-2 border-dashed border-primary/30 space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={supportPlatform}
                        onChange={(e) => setSupportPlatform(e.target.checked)}
                        className="size-4 mt-1"
                      />
                      <div className="text-sm">
                        <div className="font-bold flex items-center gap-1">
                          <Heart className="size-4 text-primary" /> ادعم تطوير المنصة
                        </div>
                        <div className="text-muted-foreground">
                          أضف تبرعاً اختيارياً لتحسين وتشغيل منصة الوقف الرقمي.
                        </div>
                      </div>
                    </label>
                    {supportPlatform && (
                      <div className="flex gap-2 pr-7">
                        {[100, 200, 500].map((t) => (
                          <button
                            key={t}
                            onClick={() => setPlatformTip(t)}
                            className={`px-4 py-2 rounded-xl border-2 text-sm font-bold transition-all ${
                              platformTip === t ? "border-primary bg-accent text-primary" : "border-border hover:border-primary/40"
                            }`}
                          >
                            {t} دج
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-display text-2xl font-bold">اختر وسيلة الدفع</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setMethod(m.id)}
                        className={`p-5 rounded-2xl border-2 text-right transition-all ${
                          method === m.id ? "border-primary bg-accent shadow-soft" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{m.emoji}</div>
                          <div>
                            <div className="font-bold">{m.name}</div>
                            <div className="text-xs text-muted-foreground">{m.desc}</div>
                          </div>
                          {method === m.id && <Check className="size-5 text-primary mr-auto" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-bold">بيانات البطاقة</h3>
                    <Input
                      placeholder="رقم البطاقة"
                      inputMode="numeric"
                      maxLength={19}
                      value={card.number}
                      onChange={(e) => setCard({ ...card, number: e.target.value })}
                      className="h-12"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="MM / YY"
                        maxLength={7}
                        value={card.exp}
                        onChange={(e) => setCard({ ...card, exp: e.target.value })}
                        className="h-12"
                      />
                      <Input
                        placeholder="CVV"
                        inputMode="numeric"
                        maxLength={4}
                        value={card.cvv}
                        onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                        className="h-12"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <ShieldCheck className="size-3.5 text-primary" /> واجهة دفع تجريبية — لا تُجرى أي عملية بنكية حقيقية.
                    </p>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h2 className="font-display text-2xl font-bold">تأكيد العملية</h2>
                  <div className="space-y-3">
                    <Input placeholder="الاسم الكريم" value={name} onChange={(e) => setName(e.target.value)} className="h-12" />
                    <Input type="email" placeholder="البريد الإلكتروني (لإرسال إيصال التبرع)" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12" />
                    <Input type="tel" placeholder="رقم الهاتف (الجزائر)" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-12" />
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">الولاية (المنصة تغطي الجزائر وولاياتها فقط)</label>
                      <select
                        value={wilaya}
                        onChange={(e) => setWilaya(e.target.value)}
                        className="w-full h-12 rounded-md border bg-background px-3 text-sm"
                      >
                        {WILAYAS.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    </div>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={anonymous} onChange={(e) => setAnonymous(e.target.checked)} className="size-4" />
                      التبرع باسم "متبرع كريم"
                    </label>
                  </div>

                  <div className="bg-accent rounded-2xl p-5 space-y-2">
                    <Row k="المشروع" v={project.title} />
                    <Row k="الجمعية" v={project.organization} />
                    <Row k="الولاية" v={wilaya} />
                    <Row k="مبلغ التبرع" v={formatCurrency(amount)} />
                    {supportPlatform && <Row k="دعم المنصة" v={formatCurrency(platformTip)} />}
                    <Row k="وسيلة الدفع" v={METHODS.find((m) => m.id === method)?.name || ""} />
                    <Row k="الرسوم" v="0 دج" highlight />
                    <div className="pt-2 border-t border-primary/15 flex justify-between font-bold text-lg">
                      <span>الإجمالي</span>
                      <span className="text-primary">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <ShieldCheck className="size-4 text-primary" />
                    معاملتك محمية بتشفير من الطبقة المصرفية.
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="mx-auto size-24 rounded-full bg-primary-gradient grid place-items-center shadow-elegant mb-6"
                  >
                    <Check className="size-12 text-primary-foreground" strokeWidth={3} />
                  </motion.div>
                  <h2 className="font-display text-3xl font-extrabold">جزاك الله خيراً!</h2>
                  <p className="text-muted-foreground mt-3 max-w-md mx-auto">
                    تم استلام تبرعك بقيمة <span className="font-bold text-primary">{formatCurrency(total)}</span> لمشروع {project.title}.
                    سنرسل إيصالك على بريدك، ونحدثك دورياً بأثر تبرعك.
                  </p>
                  <Badge className="bg-gold-gradient text-gold-foreground border-0 mt-5">
                    <Sparkles className="size-3 ml-1" /> رقم العملية: WQF-2026-{Math.floor(Math.random() * 9000 + 1000)}
                  </Badge>

                  <div className="grid sm:grid-cols-2 gap-3 mt-8">
                    <Button variant="outline" className="gap-2"><Download className="size-4" /> تنزيل الإيصال</Button>
                    <Button onClick={() => navigate({ to: "/dashboard" })} className="bg-primary-gradient text-primary-foreground gap-2">
                      <Heart className="size-4" /> لوحة تبرعاتي
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 3 && (
              <div className="flex justify-between pt-8 mt-8 border-t">
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                >
                  السابق
                </Button>
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={step === 0 && amount <= 0}
                  className="bg-primary-gradient text-primary-foreground gap-1"
                >
                  {step === 2 ? <><CreditCard className="size-4" /> تأكيد التبرع</> : <>التالي <ArrowLeft className="size-4" /></>}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className={highlight ? "text-primary font-bold" : "font-medium"}>{v}</span>
    </div>
  );
}
