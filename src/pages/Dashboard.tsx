
import { AircraftSidebar } from "@/components/AircraftSidebar";
import { ContentArea } from "@/components/ContentArea";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen flex-row">
      <AircraftSidebar />
      <main className="flex h-screen grow flex-col overflow-auto ml-12">
        <div className="flex items-center gap-2 px-4 py-2 border-b bg-white">
          <h1 className="text-lg font-semibold text-slate-900">Aircraft Engineering Dashboard</h1>
        </div>
        <ContentArea />
      </main>
    </div>
  );
};

export default Dashboard;
