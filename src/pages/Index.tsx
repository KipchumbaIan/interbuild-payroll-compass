
import { useState } from "react";
import { Users, Building2, Calendar, DollarSign, FileText, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashboardOverview from "@/components/DashboardOverview";
import EmployeeManagement from "@/components/EmployeeManagement";
import DepartmentManagement from "@/components/DepartmentManagement";
import AttendanceTracking from "@/components/AttendanceTracking";
import PayrollSystem from "@/components/PayrollSystem";
import ReportGeneration from "@/components/ReportGeneration";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Building2 },
    { id: "employees", label: "Employees", icon: Users },
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "payroll", label: "Payroll", icon: DollarSign },
    { id: "reports", label: "Reports", icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "employees":
        return <EmployeeManagement />;
      case "departments":
        return <DepartmentManagement />;
      case "attendance":
        return <AttendanceTracking />;
      case "payroll":
        return <PayrollSystem />;
      case "reports":
        return <ReportGeneration />;
      default:
        return <DashboardOverview />;
    }
  };

  const Sidebar = ({ className = "" }) => (
    <div className={`bg-card border-r ${className}`}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-primary">Interbuild</h2>
        <p className="text-sm text-muted-foreground">Construction Management</p>
      </div>
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <h1 className="text-xl font-bold text-primary">Interbuild</h1>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:pl-64">
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
