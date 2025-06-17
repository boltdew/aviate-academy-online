
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Plane, Book, Settings, User } from "lucide-react";
import { useState } from "react";

const ataChapters = [
  { code: "05", title: "Time Limits/Maintenance Checks" },
  { code: "21", title: "Air Conditioning" },
  { code: "24", title: "Electrical Power" },
  { code: "27", title: "Flight Controls" },
  { code: "28", title: "Fuel" },
  { code: "29", title: "Hydraulic Power" },
  { code: "32", title: "Landing Gear" },
  { code: "34", title: "Navigation" },
  { code: "36", title: "Pneumatic" },
  { code: "49", title: "Airborne Auxiliary Power" },
  { code: "70", title: "Standard Practices - Engines" },
  { code: "71", title: "Power Plant" },
  { code: "72", title: "Engine" },
  { code: "73", title: "Engine Fuel and Control" },
  { code: "74", title: "Ignition" },
  { code: "75", title: "Air" },
  { code: "76", title: "Engine Controls" },
  { code: "77", title: "Engine Indicating" },
  { code: "78", title: "Exhaust" },
  { code: "79", title: "Oil" },
  { code: "80", title: "Starting" }
];

export function AppSidebar() {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-lg">AeroLearn</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Book className="h-4 w-4" />
                  <span>All Content</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <User className="h-4 w-4" />
                  <span>My Progress</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>ATA Chapters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ataChapters.map((chapter) => (
                <SidebarMenuItem key={chapter.code}>
                  <SidebarMenuButton
                    isActive={activeChapter === chapter.code}
                    onClick={() => setActiveChapter(chapter.code)}
                  >
                    <span className="text-xs font-mono bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      ATA {chapter.code}
                    </span>
                    <span className="text-sm">{chapter.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
