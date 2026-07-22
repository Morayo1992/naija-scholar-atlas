import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { SearchFilters } from "@/lib/search-filters";
import { defaultFilters } from "@/lib/search-filters";

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  countries: string[];
  fields: string[];
}

const degreeLevels = ["Undergraduate", "Masters", "PhD", "Postdoctoral", "Exchange"] as const;
const fundingTypes = ["Fully Funded", "Partial Funding", "Tuition Waiver"] as const;

export function FilterPanel({ filters, onChange, countries, fields }: FilterPanelProps) {
  function set<K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="space-y-5">
      <div>
        <Label htmlFor="keyword" className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Keyword
        </Label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="keyword"
            value={filters.keyword}
            onChange={(e) => set("keyword", e.target.value)}
            placeholder="Scholarship, university, provider..."
            className="pl-9"
          />
        </div>
      </div>

      <div>
        <Label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Country</Label>
        <Select value={filters.country} onValueChange={(v) => set("country", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All countries</SelectItem>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Degree Level</Label>
        <Select value={filters.degreeLevel} onValueChange={(v) => set("degreeLevel", v as SearchFilters["degreeLevel"])}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All degree levels</SelectItem>
            {degreeLevels.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Field of Study</Label>
        <Select value={filters.fieldOfStudy} onValueChange={(v) => set("fieldOfStudy", v)}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All fields</SelectItem>
            {fields.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Funding Type</Label>
        <Select value={filters.fundingType} onValueChange={(v) => set("fundingType", v as SearchFilters["fundingType"])}>
          <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All funding types</SelectItem>
            {fundingTypes.map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button variant="ghost" size="sm" className="w-full" onClick={() => onChange(defaultFilters)}>
        <RotateCcw className="size-3.5" />
        Reset filters
      </Button>
    </div>
  );
}
