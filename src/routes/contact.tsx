import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MapPin, Phone, Send, MessageCircle, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/SiteLayout";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/data/projects";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "تواصل معنا — منصة الوقف الرقمي" },
      { name: "description", content: "نحن هنا للإجابة على كل أسئلتك حول الوقف الرقمي والمشاريع." },
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="bg-soft-gradient py-16 border-b">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <Badge className="bg-accent text-accent-foreground border-0 mb-3">تواصل معنا</Badge>
          <h1 className="font-display text-5xl font-extrabold leading-tight">دعنا نتحدث.</h1>
          <p className="text-muted-foreground mt-3 text-lg">
            فريقنا يرد خلال ساعتين عمل. نحن نحب الأسئلة الصعبة.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-card border rounded-3xl p-8 shadow-soft">
          <h2 className="font-display text-2xl font-bold mb-6">أرسل لنا رسالة</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("تم استلام رسالتك. سنرد قريباً إن شاء الله.");
            }}
            className="space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="الاسم الكريم" required className="h-12" />
              <Input type="email" placeholder="البريد الإلكتروني" required className="h-12" />
            </div>
            <Input placeholder="الموضوع" className="h-12" />
            <Textarea placeholder="رسالتك..." rows={6} required />
            <Button type="submit" className="bg-primary-gradient text-primary-foreground h-12 gap-2 w-full sm:w-auto">
              <Send className="size-4" /> إرسال الرسالة
            </Button>
            {sent && <div className="text-sm text-primary">✓ تم الإرسال بنجاح</div>}
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Mail, t: "البريد الإلكتروني", d: "waqf.platform@gmail.com" },
            { icon: Phone, t: "الهاتف", d: "0554552643" },
            { icon: MapPin, t: "العنوان", d: "الجزائر، برج بوعريريج" },
            { icon: MessageCircle, t: "دعم مباشر", d: "متاح 24/7 على الواتساب" },
          ].map((c, i) => (
            <div key={i} className="bg-card border rounded-2xl p-5 flex items-center gap-4 hover:shadow-soft transition-all">
              <div className="size-12 rounded-xl bg-primary-gradient grid place-items-center shadow-soft">
                <c.icon className="size-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{c.t}</div>
                <div className="font-bold">{c.d}</div>
              </div>
            </div>
          ))}

          <div className="bg-card border rounded-2xl p-5">
            <div className="text-sm font-bold mb-3">تابعنا</div>
            <div className="flex gap-2">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="size-10 grid place-items-center rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="aspect-[5/3] rounded-2xl overflow-hidden border bg-muted relative">
            <div className="absolute inset-0 pattern-grid opacity-40" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="text-center">
                <MapPin className="size-8 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">الرياض، المملكة العربية السعودية</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 max-w-3xl">
        <h2 className="font-display text-3xl font-extrabold text-center mb-8">الأسئلة الشائعة</h2>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`f-${i}`} className="border bg-card rounded-2xl px-6">
              <AccordionTrigger className="text-right font-bold hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </SiteLayout>
  );
}
