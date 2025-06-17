
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ContentArea } from "@/components/ContentArea";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 px-4 py-2 border-b bg-white">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold text-slate-900">Aircraft Engineering Dashboard</h1>
          </div>
          <ContentArea />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
