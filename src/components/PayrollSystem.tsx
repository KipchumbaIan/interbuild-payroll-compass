
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Calendar, Users, Building2 } from "lucide-react";

const PayrollSystem = () => {
  const [selectedWeek, setSelectedWeek] = useState("2024-01-15");

  // Mock payroll data
  const employeePayroll = [
    {
      id: 1,
      name: "John Smith",
      department: "Plumbing",
      dailyWage: 180,
      daysPresent: 5,
      weeklyPay: 900,
    },
    {
      id: 2,
      name: "Maria Garcia",
      department: "Electrical",
      dailyWage: 200,
      daysPresent: 4,
      weeklyPay: 800,
    },
    {
      id: 3,
      name: "David Johnson",
      department: "Carpentry",
      dailyWage: 170,
      daysPresent: 5,
      weeklyPay: 850,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      department: "Masonry",
      dailyWage: 160,
      daysPresent: 3,
      weeklyPay: 480,
    },
    {
      id: 5,
      name: "Mike Brown",
      department: "General Labor",
      dailyWage: 140,
      daysPresent: 5,
      weeklyPay: 700,
    },
  ];

  const departmentPayroll = [
    { name: "Plumbing", employees: 12, totalPay: 14400 },
    { name: "Electrical", employees: 8, totalPay: 10800 },
    { name: "Carpentry", employees: 15, totalPay: 18000 },
    { name: "Masonry", employees: 7, totalPay: 7350 },
    { name: "General Labor", employees: 3, totalPay: 2200 },
  ];

  const totalWeeklyPayroll = employeePayroll.reduce((sum, emp) => sum + emp.weeklyPay, 0);
  const totalDepartmentPayroll = departmentPayroll.reduce((sum, dept) => sum + dept.totalPay, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payroll System</h1>
        <p className="text-muted-foreground">Weekly payroll computation and management</p>
      </div>

      {/* Week Selection and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Week Ending</p>
              <input
                type="date"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                className="text-lg font-bold bg-transparent border-none p-0 text-foreground"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Active Employees</p>
              <p className="text-2xl font-bold text-foreground">{employeePayroll.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Departments</p>
              <p className="text-2xl font-bold text-foreground">{departmentPayroll.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Payroll</p>
              <p className="text-2xl font-bold text-foreground">${totalDepartmentPayroll.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Individual Employee Payroll */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-foreground">Individual Employee Payroll</h2>
          <Button>Process Payments</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 font-medium text-muted-foreground">Employee</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Department</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Daily Wage</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Days Present</th>
                <th className="text-left py-3 font-medium text-muted-foreground">Weekly Pay</th>
              </tr>
            </thead>
            <tbody>
              {employeePayroll.map((employee) => (
                <tr key={employee.id} className="border-b">
                  <td className="py-3 font-medium text-foreground">{employee.name}</td>
                  <td className="py-3 text-foreground">{employee.department}</td>
                  <td className="py-3 text-foreground">${employee.dailyWage}</td>
                  <td className="py-3 text-foreground">{employee.daysPresent}/5</td>
                  <td className="py-3 font-semibold text-green-600">${employee.weeklyPay}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2">
                <td colSpan={4} className="py-3 font-semibold text-foreground">Total:</td>
                <td className="py-3 font-bold text-green-600 text-lg">${totalWeeklyPayroll}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>

      {/* Department Payroll Summary */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Department Payroll Summary</h2>
        <div className="grid gap-4">
          {departmentPayroll.map((dept, index) => (
            <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold text-foreground">{dept.name}</h3>
                <p className="text-sm text-muted-foreground">{dept.employees} employees</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-green-600">${dept.totalPay.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  ${Math.round(dept.totalPay / dept.employees)}/employee avg
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-foreground">Total Department Payroll:</span>
            <span className="text-2xl font-bold text-green-600">${totalDepartmentPayroll.toLocaleString()}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PayrollSystem;
