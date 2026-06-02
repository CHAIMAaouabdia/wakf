import { Link } from "@tanstack/react-router";
import { Twitter, Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import logoAsset from "@/assets/logo-hand.png.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t bg-soft-gradient">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="size-9 rounded-xl bg-primary-gradient grid place-items-center shadow-elegant">
                <Sparkles className="size-5 text-primary-foreground" />
              </div>
              <div className="font-display font-bold">منصة الوقف الرقمي</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              منصة رائدة في الوقف الإسلامي الرقمي، نُعيد إحياء سنة الوقف عبر التكنولوجيا والشفافية الكاملة.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">المنصة</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/projects" className="hover:text-foreground">المشاريع</Link></li>
              <li><Link to="/about" className="hover:text-foreground">من نحن</Link></li>
              <li><Link to="/dashboard" className="hover:text-foreground">حسابي</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">الشفافية</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>التقارير المالية</li>
              <li>الهيئة الشرعية</li>
              <li>سياسة الخصوصية</li>
              <li>شروط الاستخدام</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">تابعنا</h4>
            <div className="flex gap-3">
              {[Twitter, Facebook, Instagram, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="size-10 grid place-items-center rounded-xl glass hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 text-xs text-muted-foreground">
              مرخّصة من الجهات الرقابية والهيئة الشرعية المستقلة.
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between gap-4 text-xs text-muted-foreground">
          <div>© 2026 منصة الوقف الرقمي. جميع الحقوق محفوظة.</div>
          <div className="flex gap-4">
            <span>صُمّمت بشغف لخدمة الأمة 💚</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
