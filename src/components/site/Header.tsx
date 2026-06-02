import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, ROLE_LABELS, ROLE_HOME } from "@/lib/auth";
import logoAsset from "@/assets/logo-hand.png.asset.json";

const baseNav = [
  { to: "/", label: "الرئيسية" },
  { to: "/projects", label: "المشاريع" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل" },
];

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const nav = user
    ? [...baseNav, { to: ROLE_HOME[user.role], label: "لوحتي" }]
    : baseNav;

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? "glass-strong shadow-soft" : "bg-background/0"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-9 rounded-xl bg-primary-gradient grid place-items-center shadow-elegant group-hover:scale-105 transition-transform">
            <Sparkles className="size-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg">منصة الوقف الرقمي</div>
            <div className="text-[10px] text-muted-foreground">Digital Waqf Platform</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDark(!dark)}
            aria-label="تبديل المظهر"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 hidden md:flex">
                  <div className="size-7 rounded-full bg-primary-gradient grid place-items-center text-primary-foreground text-xs font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate text-sm">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-bold">{user.name}</div>
                  <div className="text-xs text-muted-foreground font-normal">{ROLE_LABELS[user.role]}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROLE_HOME[user.role]} className="gap-2">
                    <LayoutDashboard className="size-4" /> لوحة التحكم
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
                  <LogOut className="size-4" /> تسجيل الخروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">دخول</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary-gradient text-primary-foreground shadow-elegant hover:opacity-95">
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-2">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    className="px-4 py-3 rounded-lg hover:bg-accent text-base font-medium"
                  >
                    {n.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-muted-foreground">
                        {user.name} — {ROLE_LABELS[user.role]}
                      </div>
                      <Button onClick={handleLogout} variant="outline" className="gap-2">
                        <LogOut className="size-4" /> تسجيل الخروج
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">دخول</Button>
                      </Link>
                      <Link to="/register">
                        <Button className="w-full bg-primary-gradient text-primary-foreground">
                          إنشاء حساب
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
