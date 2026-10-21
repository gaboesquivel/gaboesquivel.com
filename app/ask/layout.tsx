import { TooltipProvider } from "@/components/ui/tooltip";

export default function AskLayout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
