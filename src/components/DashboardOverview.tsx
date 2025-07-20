
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Users, UserCheck, Building2, DollarSign } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  department: string;
  daily_wage: number;
}

interface Department {
  name: string;
  employee_count: number;
  total_payroll: number;
}

const DashboardOverview = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch employees
      const { data: employeeData } = await supabase
        .from("employees")
        .select("id, name, department, daily_wage");

      if (employeeData) {
        setEmployees(employeeData);
        
        // Calculate department statistics
        const deptStats = employeeData.reduce((acc: any, emp) => {
          if (!acc[emp.department]) {
            acc[emp.department] = {
              name: emp.department,
              employee_count: 0,
              total_payroll: 0
            };
          }
          acc[emp.department].employee_count += 1;
          acc[emp.department].total_payroll += emp.daily_wage * 7; // Weekly payroll
          return acc;
        }, {});
        
        setDepartments(Object.values(deptStats));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalEmployees = employees.length;
  const totalDepartments = departments.length;
  const totalWeeklyPayroll = departments.reduce((total, dept) => total + dept.total_payroll, 0);
  const presentToday = Math.floor(totalEmployees * 0.85); // Mock attendance data

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Dashboard Overview
        </h2>
        <p className="text-muted-foreground">
          Welcome to your employee management system dashboard
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary bg-gradient-to-br from-primary/5 to-primary/10 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primary">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">
              Across all departments
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary bg-gradient-to-br from-secondary/5 to-secondary/10 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Present Today</CardTitle>
            <UserCheck className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{presentToday}</div>
            <p className="text-xs text-muted-foreground">
              {totalEmployees > 0 ? ((presentToday / totalEmployees) * 100).toFixed(1) : 0}% attendance
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent bg-gradient-to-br from-accent/5 to-accent/10 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-accent">Active Departments</CardTitle>
            <Building2 className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{totalDepartments}</div>
            <p className="text-xs text-muted-foreground">
              Operational departments
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 bg-gradient-to-br from-green-50 to-green-100 hover:shadow-lg transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Weekly Payroll</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">KSh {totalWeeklyPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This week's total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview */}
      <Card className="border-t-4 border-t-primary bg-gradient-to-br from-white to-primary/5">
        <CardHeader>
          <CardTitle className="text-primary">Department Overview</CardTitle>
          <CardDescription>
            Summary of all departments and their payroll statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-primary font-semibold">Department</TableHead>
                <TableHead className="text-primary font-semibold">Employees</TableHead>
                <TableHead className="text-primary font-semibold">Weekly Payroll (KSh)</TableHead>
                <TableHead className="text-primary font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((dept, index) => (
                <TableRow key={index} className="hover:bg-primary/5 transition-colors">
                  <TableCell className="font-medium">{dept.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-secondary" />
                      {dept.employee_count}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-green-700">
                    {dept.total_payroll.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={dept.employee_count > 0 ? "default" : "secondary"}
                      className={dept.employee_count > 0 ? "bg-secondary text-white" : ""}
                    >
                      {dept.employee_count > 0 ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {departments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No departments found. Add employees to see department statistics.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Employees Sample */}
      <Card className="border-t-4 border-t-secondary bg-gradient-to-br from-white to-secondary/5">
        <CardHeader>
          <CardTitle className="text-secondary">Recent Employees</CardTitle>
          <CardDescription>
            Latest employees added to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-secondary font-semibold">Employee</TableHead>
                <TableHead className="text-secondary font-semibold">Department</TableHead>
                <TableHead className="text-secondary font-semibold">Daily Wage (KSh)</TableHead>
                <TableHead className="text-secondary font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.slice(0, 5).map((emp) => (
                <TableRow key={emp.id} className="hover:bg-secondary/5 transition-colors">
                  <TableCell className="font-medium">{emp.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-secondary text-secondary">
                      {emp.department}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-green-700">
                    {emp.daily_wage.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-primary text-white">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
              {employees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No employees found. Add employees to see them here.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
