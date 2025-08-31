import { useSidebarStore } from "@/lib/sidebar-store";
import { Button } from "./ui/button";
import { PanelLeft, PanelRight } from "lucide-react";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <Button variant="ghost" size="icon" onClick={toggle} className="h-7 w-7">
      {isOpen ? (
        <PanelLeft className="h-4 w-4" />
      ) : (
        <PanelRight className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
