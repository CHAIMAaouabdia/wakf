import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProjectCard } from "@/components/site/ProjectCard";
import { categories, publicProjects as projects, type Category } from "@/data/projects";

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "المشاريع — منصة الوقف الرقمي" },
      { name: "description", content: "تصفّح مشاريع وقفية موثقة في التعليم والصحة والمياه والمساجد وأكثر." },
    ],
  }),
});

function ProjectsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const [sort, setSort] = useState<"latest" | "ending" | "popular">("latest");

  const filtered = useMemo(() => {
    let list = projects.filter((p) => {
      const matchQ = p.title.includes(q) || p.shortDescription.includes(q) || p.location.includes(q);
      const matchC = cat === "all" || p.category === cat;
      return matchQ && matchC;
    });
    if (sort === "ending") list = [...list].sort((a, b) => a.daysLeft - b.daysLeft);
    if (sort === "popular") list = [...list].sort((a, b) => b.donors - a.donors);
    return list;
  }, [q, cat, sort]);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="bg-soft-gradient pt-14 pb-10 border-b">
        <div className="container mx-auto px-4">
          <Badge className="bg-accent text-accent-foreground border-0 mb-3">المشاريع الوقفية</Badge>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight max-w-2xl">
            ابحث عن المشروع الذي يلامس قلبك.
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl">
            {projects.length} مشروعاً موثقاً شرعياً، في 7 تصنيفات، في الجزائر.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث عن مشروع، ولاية، أو تصنيف..."
                className="h-12 pr-12 bg-card text-base"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="h-12 px-4 rounded-md border bg-card text-sm font-medium"
            >
              <option value="latest">الأحدث</option>
              <option value="ending">الأقرب انتهاءً</option>
              <option value="popular">الأكثر دعماً</option>
            </select>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <FilterChip active={cat === "all"} onClick={() => setCat("all")} label="الكل" icon="✨" />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                active={cat === c.id}
                onClick={() => setCat(c.id)}
                label={c.label}
                icon={c.icon}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-muted-foreground">
              <SlidersHorizontal className="size-12 mx-auto mb-4 opacity-40" />
              لم نجد مشاريع مطابقة. جرّب تعديل البحث.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function FilterChip({
  active, onClick, label, icon,
}: { active: boolean; onClick: () => void; label: string; icon: string }) {
  return (
    <Button
      onClick={onClick}
      variant={active ? "default" : "outline"}
      className={`rounded-full ${active ? "bg-primary-gradient text-primary-foreground" : ""}`}
      size="sm"
    >
      <span className="ml-1">{icon}</span> {label}
    </Button>
  );
}
