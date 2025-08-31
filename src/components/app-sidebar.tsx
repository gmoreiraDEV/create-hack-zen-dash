import { useSidebarStore } from "@/lib/sidebar-store";
import { menuItems } from "@/constants";
import {
  Home,
  LogOut,
  Settings,
  User,
  MapPin,
  Calendar,
  Bell,
  Leaf,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp } from "lucide-react";

export function AppSidebar() {
  const { isOpen } = useSidebarStore();

  return (
    <div
      className={`h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
      } overflow-hidden`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-auto items-center justify-center">
            <Leaf className="h-8 w-8 text-orange-600 mr-2" />
            <h1 className="text-primary-foreground text-4xl font-bold">Leaf</h1>
          </div>
          <div className="h-8 w-px border-b border-sidebar-border" />
        </div>
        <div className="flex items-center gap-2 mt-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600 text-primary-foreground">
            <Home className="h-4 w-4" />
          </div>
          <a
            href="/dashboard"
            className="font-semibold text-sidebar-foreground"
          >
            Dashboard
          </a>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className="flex items-center gap-2 px-2 py-2 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ))}
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-auto p-3 hover:bg-sidebar-accent/50"
            >
              <div className="relative">
                <Avatar className="h-10 w-10 rounded-lg">
                  <AvatarImage src="/avatars/01.png" alt="John Smith" />
                  <AvatarFallback className="rounded-lg bg-orange-600 text-primary-foreground">
                    JS
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-sidebar rounded-full"></div>
              </div>
              <div className="flex-1 text-left text-sm min-w-0">
                <div className="font-semibold text-sidebar-foreground truncate">
                  John Smith
                </div>
                <div className="text-xs text-sidebar-foreground/70 truncate">
                  Senior Missionary
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-sidebar-foreground/50" />
                  <span className="text-xs text-sidebar-foreground/50 truncate">
                    São Paulo, Brazil
                  </span>
                </div>
              </div>
              <ChevronUp className="h-4 w-4 text-sidebar-foreground/70 flex-shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64" side="top" align="end">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 px-3 py-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarImage src="/avatars/01.png" alt="John Smith" />
                    <AvatarFallback className="rounded-lg bg-orange-600 text-primary-foreground">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full"></div>
                </div>
                <div className="text-sm min-w-0 flex-1">
                  <div className="font-semibold">John Smith</div>
                  <div className="text-xs text-muted-foreground">
                    john.smith@mission.org
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      Senior Missionary
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      São Paulo, Brazil
                    </span>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>My Profile</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="/dashboard/calendar" className="cursor-pointer">
                <Calendar className="mr-2 h-4 w-4" />
                <span>My Schedule</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
              <Badge className="ml-auto bg-orange-600 text-primary-foreground">
                3
              </Badge>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <a href="/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
