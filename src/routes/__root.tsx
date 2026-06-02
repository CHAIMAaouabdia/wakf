import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-hero-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الرابط الذي تبحث عنه غير صحيح أو تم نقله.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">حدث خطأ غير متوقع</h1>
        <p className="mt-2 text-sm text-muted-foreground">يرجى المحاولة مرة أخرى.</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "منصة الوقف الرقمي — الوقف الإسلامي والتمويل الجماعي" },
      { name: "description", content: "منصة رائدة في الوقف الإسلامي الرقمي والتمويل الجماعي للمشاريع الخيرية، بشفافية كاملة وامتثال شرعي." },
      { property: "og:title", content: "منصة الوقف الرقمي — الوقف الإسلامي والتمويل الجماعي" },
      { property: "og:description", content: "منصة رائدة في الوقف الإسلامي الرقمي والتمويل الجماعي للمشاريع الخيرية، بشفافية كاملة وامتثال شرعي." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "منصة الوقف الرقمي — الوقف الإسلامي والتمويل الجماعي" },
      { name: "twitter:description", content: "منصة رائدة في الوقف الإسلامي الرقمي والتمويل الجماعي للمشاريع الخيرية، بشفافية كاملة وامتثال شرعي." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/IxrAsZr8YvcRKNRcjZdg5Ct5wPk1/social-images/social-1780422758305-hand_log.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/IxrAsZr8YvcRKNRcjZdg5Ct5wPk1/social-images/social-1780422758305-hand_log.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cairo:wght@500;700;800;900&family=Tajawal:wght@400;500;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster position="top-center" richColors />
      </AuthProvider>
    </QueryClientProvider>
  );
}
