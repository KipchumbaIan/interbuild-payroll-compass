
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Check, X, Search, Sun, Moon } from "lucide-react";
import { useEmployeeContext } from "@/contexts/EmployeeContext";

const AttendanceTracking = () => {
  const { employees, getDepartmentStats } = useEmployeeContext();
  const [selectedWeek, setSelectedWeek] = useState(getWeekDates());
  const [searchTerm, setSearchTerm] = useState("");
  const [attendance, setAttendance] = useState<{[key: string]: boolean}>({});

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayColors = [
    'bg-blue-100 border-blue-300 text-blue-800',
    'bg-green-100 border-green-300 text-green-800', 
    'bg-purple-100 border-purple-300 text-purple-800',
    'bg-orange-100 border-orange-300 text-orange-800',
    'bg-pink-100 border-pink-300 text-pink-800',
    'bg-indigo-100 border-indigo-300 text-indigo-800',
    'bg-red-100 border-red-300 text-red-800'
  ];

  function getWeekDates() {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      return date.toISOString().split('T')[0];
    });
  }

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceToggle = (employeeId: string, dayIndex: number, present: boolean) => {
    const key = `${employeeId}-${dayIndex}`;
    setAttendance(prev => ({
      ...prev,
      [key]: present
    }));
  };

  const isPresent = (employeeId: string, dayIndex: number) => {
    const key = `${employeeId}-${dayIndex}`;
    return attendance[key] === true;
  };

  const isAbsent = (employeeId: string, dayIndex: number) => {
    const key = `${employeeId}-${dayIndex}`;
    return attendance[key] === false;
  };

  const getPresentDaysCount = (employeeId: string) => {
    return daysOfWeek.reduce((count, _, dayIndex) => {
      return count + (isPresent(employeeId, dayIndex) ? 1 : 0);
    }, 0);
  };

  const getWeeklyPay = (employeeId: string, dailyWage: number) => {
    const presentDays = getPresentDaysCount(employeeId);
    return presentDays * dailyWage;
  };

  const getWeeklyStats = () => {
    const totalPresent = filteredEmployees.reduce((sum, emp) => sum + getPresentDaysCount(emp.id), 0);
    const totalPossible = filteredEmployees.length * 7;
    const totalPayroll = filteredEmployees.reduce((sum, emp) => sum + getWeeklyPay(emp.id, emp.dailyWage), 0);
    
    return { totalPresent, totalPossible, totalPayroll };
  };

  const stats = getWeeklyStats();
  const departmentStats = getDepartmentStats();

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-6">
      <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center">
          <Calendar className="w-8 h-8 text-primary mr-3" />
          Weekly Attendance Tracking
        </h1>
        <p className="text-muted-foreground">Track daily attendance for all employees across the week</p>
      </div>

      {/* Week Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center">
            <Sun className="h-8 w-8 mr-4" />
            <div>
              <p className="text-sm font-medium opacity-90">Week Range</p>
              <p className="text-lg font-bold">
                {new Date(selectedWeek[0]).toLocaleDateString()} - {new Date(selectedWeek[6]).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center">
            <Check className="h-8 w-8 mr-4" />
            <div>
              <p className="text-sm font-medium opacity-90">Total Present Days</p>
              <p className="text-2xl font-bold">{stats.totalPresent}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 mr-4" />
            <div>
              <p className="text-sm font-medium opacity-90">Attendance Rate</p>
              <p className="text-2xl font-bold">{((stats.totalPresent / stats.totalPossible) * 100).toFixed(1)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <div className="flex items-center">
            <Moon className="h-8 w-8 mr-4" />
            <div>
              <p className="text-sm font-medium opacity-90">Weekly Payroll</p>
              <p className="text-2xl font-bold">KES {stats.totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-white shadow-sm"
        />
      </div>

      {/* Days of Week Header */}
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Weekly Attendance Grid</h2>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-9 gap-2 mb-4">
              <div className="font-semibold text-center py-2">Employee</div>
              {daysOfWeek.map((day, index) => (
                <div key={day} className={`font-semibold text-center py-2 px-1 rounded-lg border-2 ${dayColors[index]}`}>
                  <div className="text-xs">{day}</div>
                  <div className="text-xs opacity-75">{new Date(selectedWeek[index]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
                </div>
              ))}
              <div className="font-semibold text-center py-2">Summary</div>
            </div>

            {/* Employee Attendance Rows */}
            {filteredEmployees.map((employee) => {
              const presentDays = getPresentDaysCount(employee.id);
              const weeklyPay = getWeeklyPay(employee.id, employee.dailyWage);
              
              return (
                <div key={employee.id} className="grid grid-cols-9 gap-2 mb-3 p-2 bg-gray-50 rounded-lg">
                  {/* Employee Info */}
                  <div className="flex flex-col justify-center">
                    <div className="font-medium text-sm text-foreground">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.department}</div>
                    <div className="text-xs text-green-600 font-medium">KES {employee.dailyWage.toLocaleString()}/day</div>
                  </div>

                  {/* Daily Attendance Buttons */}
                  {daysOfWeek.map((_, dayIndex) => (
                    <div key={dayIndex} className="flex flex-col gap-1">
                      <Button
                        variant={isPresent(employee.id, dayIndex) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAttendanceToggle(employee.id, dayIndex, true)}
                        className={`h-8 px-2 text-xs ${
                          isPresent(employee.id, dayIndex) 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "hover:bg-green-100"
                        }`}
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button
                        variant={isAbsent(employee.id, dayIndex) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleAttendanceToggle(employee.id, dayIndex, false)}
                        className={`h-8 px-2 text-xs ${
                          isAbsent(employee.id, dayIndex) 
                            ? "bg-red-600 hover:bg-red-700 text-white" 
                            : "hover:bg-red-100"
                        }`}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}

                  {/* Weekly Summary */}
                  <div className="flex flex-col justify-center text-center bg-white rounded p-2">
                    <div className="text-sm font-bold text-green-600">{presentDays}/7 days</div>
                    <div className="text-xs text-muted-foreground">Present</div>
                    <div className="text-sm font-bold text-blue-600">KES {weeklyPay.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Weekly Pay</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Department Statistics */}
      <Card className="p-6 bg-white shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Department Attendance Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentStats.map((dept, index) => {
            const deptEmployees = employees.filter(emp => emp.department === dept.name);
            const deptPresentDays = deptEmployees.reduce((sum, emp) => sum + getPresentDaysCount(emp.id), 0);
            const deptTotalPossible = deptEmployees.length * 7;
            const deptPayroll = deptEmployees.reduce((sum, emp) => sum + getWeeklyPay(emp.id, emp.dailyWage), 0);
            const attendanceRate = deptTotalPossible > 0 ? (deptPresentDays / deptTotalPossible) * 100 : 0;
            
            return (
              <div key={dept.name} className={`p-4 rounded-lg border-2 ${dayColors[index % dayColors.length]}`}>
                <h3 className="font-semibold text-lg">{dept.name}</h3>
                <div className="space-y-1 text-sm">
                  <p>Employees: {deptEmployees.length}</p>
                  <p>Present Days: {deptPresentDays}/{deptTotalPossible}</p>
                  <p>Attendance: {attendanceRate.toFixed(1)}%</p>
                  <p className="font-bold">Payroll: KES {deptPayroll.toLocaleString()}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AttendanceTracking;
