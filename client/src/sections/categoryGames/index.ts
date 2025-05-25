import { ReactNode } from "react";

export interface Category {
  id: string;
  icon: ReactNode;
  title: string;
  description: string;
}

export interface CategorySectionProps {
  title: string;
  subtitle: string;
  features: Category[];
  variant?: "default" | "boxed";
  columns?: 3 | 4;
}
