
import { Card } from "@/components/ui/card";
import { Users, Building2, DollarSign, Calendar } from "lucide-react";
import { useEmployeeContext } from "@/contexts/EmployeeContext";

const DashboardOverview = () => {
  const { employees, getDepartmentStats } = useEmployeeContext();
  
  const departmentStats = getDepartmentStats();
  const totalEmployees = employees.length;
  const totalDepartments = departmentStats.filter(dept => dept.count > 0).length;
  const totalWeeklyPayroll = departmentStats.reduce((sum, dept) => sum + dept.totalPayroll, 0);
  
  // Mock present today data - in real app would come from attendance tracking
  const presentToday = Math.floor(totalEmployees * 0.85); // 85% attendance rate

  const todayAttendance = employees.slice(0, 4).map(emp => ({
    name: emp.name,
    department: emp.department,
    dailyWage: emp.dailyWage,
    status: Math.random() > 0.2 ? "Present" : "Absent"
  }));

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
              <p className="text-2xl font-bold text-foreground">{totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Present Today</p>
              <p className="text-2xl font-bold text-foreground">{presentToday}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Departments</p>
              <p className="text-2xl font-bold text-foreground">{totalDepartments}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Weekly Payroll</p>
              <p className="text-2xl font-bold text-foreground">KES {totalWeeklyPayroll.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* All Departments Overview */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">All Departments Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium text-muted-foreground">Department</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Employees</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Weekly Payroll (KES)</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {departmentStats.map((dept, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 font-medium text-foreground">{dept.name}</td>
                  <td className="py-3 text-foreground">{dept.count}</td>
                  <td className="py-3 text-foreground">KES {dept.totalPayroll.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      dept.count > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {dept.count > 0 ? 'Active' : 'No Staff'}
                    </span>
                  </td>
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
                <th className="text-left py-2 font-medium text-muted-foreground">Daily Wage (KES)</th>
                <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {todayAttendance.map((emp, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 font-medium text-foreground">{emp.name}</td>
                  <td className="py-3 text-foreground">{emp.department}</td>
                  <td className="py-3 text-foreground">KES {emp.dailyWage.toLocaleString()}</td>
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
