import {
  GraduationCap,
  BookOpen,
  Microscope,
  Sparkles,
  Globe2,
  MapPin,
  Users,
  FlaskConical,
  SearchCode,
  ArrowLeftRight,
  type LucideIcon,
} from "lucide-react";

export const categoryIconMap: Record<string, LucideIcon> = {
  GraduationCap,
  BookOpen,
  Microscope,
  Sparkles,
  Globe2,
  MapPin,
  Users,
  FlaskConical,
  SearchCode,
  ArrowLeftRight,
};

export function getCategoryIcon(name: string): LucideIcon {
  return categoryIconMap[name] ?? Sparkles;
}
