import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Users, Clock, ShieldCheck } from "lucide-react";
import type { Project } from "@/data/projects";
import { categories } from "@/data/projects";
import { formatCurrency, formatNumber, pct } from "@/lib/format";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const cat = categories.find((c) => c.id === project.category)!;
  const p = pct(project.raised, project.goal);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group rounded-3xl overflow-hidden bg-card border shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
        <div className="absolute top-3 right-3 flex gap-1.5">
          <Badge className="bg-card/90 text-foreground backdrop-blur border-0">
            <span className="ml-1">{cat.icon}</span> {cat.label}
          </Badge>
        </div>
        {project.shariaCompliant && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-primary-gradient text-primary-foreground border-0 gap-1">
              <ShieldCheck className="size-3" /> شرعي
            </Badge>
          </div>
        )}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white">
          <MapPin className="size-3" /> {project.location}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">{project.shortDescription}</p>
        </div>

        <div>
          <div className="flex items-end justify-between text-sm mb-2">
            <div>
              <div className="font-bold text-primary">{formatCurrency(project.raised)}</div>
              <div className="text-xs text-muted-foreground">من {formatCurrency(project.goal)}</div>
            </div>
            <div className="text-2xl font-display font-bold text-hero-gradient">{p}%</div>
          </div>
          <Progress value={p} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="size-3.5" /> {formatNumber(project.donors)} متبرع</span>
          <span className="flex items-center gap-1"><Clock className="size-3.5" /> {project.daysLeft} يوم متبقٍ</span>
        </div>

        <Link to="/projects/$projectId" params={{ projectId: project.id }} className="block">
          <Button className="w-full bg-primary-gradient text-primary-foreground hover:opacity-95">
            تبرع الآن
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
