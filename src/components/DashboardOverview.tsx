
import { Card } from "@/components/ui/card";
import { Users, Building2, DollarSign, Calendar } from "lucide-react";

const DashboardOverview = () => {
  // Mock data for demonstration
  const stats = {
    totalEmployees: 45,
    presentToday: 38,
    totalDepartments: 5,
    weeklyPayroll: 52750,
  };

  const departmentStats = [
    { name: "Plumbing", employees: 12, weeklyPayroll: 14400 },
    { name: "Electrical", employees: 8, weeklyPayroll: 10800 },
    { name: "Carpentry", employees: 15, weeklyPayroll: 18000 },
    { name: "Masonry", employees: 7, weeklyPayroll: 7350 },
    { name: "General Labor", employees: 3, weeklyPayroll: 2200 },
  ];

  const todayAttendance = [
    { name: "John Smith", department: "Plumbing", dailyWage: 180, status: "Present" },
    { name: "Maria Garcia", department: "Electrical", dailyWage: 200, status: "Present" },
    { name: "David Johnson", department: "Carpentry", dailyWage: 170, status: "Absent" },
    { name: "Sarah Wilson", department: "Masonry", dailyWage: 160, status: "Present" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome to Interbuild Construction Management System</p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Present Today</p>
              <p className="text-2xl font-bold text-foreground">{stats.presentToday}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Departments</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalDepartments}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Weekly Payroll</p>
              <p className="text-2xl font-bold text-foreground">${stats.weeklyPayroll.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Department Statistics */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Department Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Department</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Employees</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Weekly Payroll</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 font-medium text-foreground">{dept.name}</td>
                  <td className="py-3 text-foreground">{dept.employees}</td>
                  <td className="py-3 text-foreground">${dept.weeklyPayroll.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Today's Attendance Sample */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Today's Attendance (Sample)</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Employee</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Department</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Daily Wage</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAttendance.map((emp, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 font-medium text-foreground">{emp.name}</td>
                  <td className="py-3 text-foreground">{emp.department}</td>
                  <td className="py-3 text-foreground">${emp.dailyWage}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      emp.status === 'Present' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
