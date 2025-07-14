
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Download, Calendar, Filter } from "lucide-react";

const ReportGeneration = () => {
  const [reportType, setReportType] = useState("weekly");
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-07");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const departments = ["All Departments", "Plumbing", "Electrical", "Carpentry", "Masonry", "General Labor"];

  const reportData = {
    weeklyPayroll: {
      totalEmployees: 45,
      totalPayroll: 52750,
      departments: [
        { name: "Plumbing", employees: 12, payroll: 14400 },
        { name: "Electrical", employees: 8, payroll: 10800 },
        { name: "Carpentry", employees: 15, payroll: 18000 },
        { name: "Masonry", employees: 7, payroll: 7350 },
        { name: "General Labor", employees: 3, payroll: 2200 },
      ]
    },
    employeeDetails: [
      { name: "John Smith", department: "Plumbing", daysWorked: 5, dailyWage: 180, weeklyPay: 900 },
      { name: "Maria Garcia", department: "Electrical", daysWorked: 4, dailyWage: 200, weeklyPay: 800 },
      { name: "David Johnson", department: "Carpentry", daysWorked: 5, dailyWage: 170, weeklyPay: 850 },
    ]
  };

  const handleGenerateReport = (format: 'pdf' | 'csv') => {
    // In a real application, this would generate and download the actual file
    const fileName = `payroll_report_${startDate}_to_${endDate}.${format}`;
    alert(`Generating ${format.toUpperCase()} report: ${fileName}`);
  };

  const handlePreviewReport = () => {
    alert("Opening report preview...");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Report Generation</h1>
        <p className="text-muted-foreground">Generate and download payroll reports</p>
      </div>

      {/* Report Configuration */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Report Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="reportType">Report Type</Label>
            <select
              id="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background mt-1"
            >
              <option value="weekly">Weekly Payroll</option>
              <option value="monthly">Monthly Summary</option>
              <option value="department">Department Report</option>
              <option value="employee">Employee Details</option>
            </select>
          </div>

          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="department">Department Filter</Label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background mt-1"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept.toLowerCase().replace(' ', '_')}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button onClick={handlePreviewReport}>
            <FileText className="w-4 h-4 mr-2" />
            Preview Report
          </Button>
          <Button onClick={() => handleGenerateReport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={() => handleGenerateReport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
        </div>
      </Card>

      {/* Report Preview */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Report Preview</h2>
        
        {/* Report Header */}
        <div className="mb-6 pb-4 border-b">
          <h3 className="text-2xl font-bold text-center text-foreground">Interbuild Construction Company</h3>
          <p className="text-center text-muted-foreground">Weekly Payroll Report</p>
          <p className="text-center text-sm text-muted-foreground">
            Period: {startDate} to {endDate}
          </p>
        </div>

        {/* Summary Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold text-foreground">{reportData.weeklyPayroll.totalEmployees}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Departments</p>
              <p className="text-2xl font-bold text-foreground">{reportData.weeklyPayroll.departments.length}</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Payroll</p>
              <p className="text-2xl font-bold text-green-600">${reportData.weeklyPayroll.totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Department Breakdown</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">Department</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Employees</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Total Payroll</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Avg per Employee</th>
                </tr>
              </thead>
              <tbody>
                {reportData.weeklyPayroll.departments.map((dept, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-medium text-foreground">{dept.name}</td>
                    <td className="py-2 text-foreground">{dept.employees}</td>
                    <td className="py-2 text-foreground">${dept.payroll.toLocaleString()}</td>
                    <td className="py-2 text-foreground">${Math.round(dept.payroll / dept.employees)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Details Sample */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Employee Details (Sample)</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium text-muted-foreground">Employee</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Department</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Days Worked</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Daily Wage</th>
                  <th className="text-left py-2 font-medium text-muted-foreground">Weekly Pay</th>
                </tr>
              </thead>
              <tbody>
                {reportData.employeeDetails.map((emp, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 font-medium text-foreground">{emp.name}</td>
                    <td className="py-2 text-foreground">{emp.department}</td>
                    <td className="py-2 text-foreground">{emp.daysWorked}</td>
                    <td className="py-2 text-foreground">${emp.dailyWage}</td>
                    <td className="py-2 font-semibold text-green-600">${emp.weeklyPay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>Generated on {new Date().toLocaleDateString()} | Interbuild Construction Company</p>
        </div>
      </Card>
    </div>
  );
};

export default ReportGeneration;
