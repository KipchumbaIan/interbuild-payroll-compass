
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Check, X, Search } from "lucide-react";

const AttendanceTracking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [employees] = useState([
    { id: 1, name: "John Smith", department: "Plumbing", dailyWage: 180 },
    { id: 2, name: "Maria Garcia", department: "Electrical", dailyWage: 200 },
    { id: 3, name: "David Johnson", department: "Carpentry", dailyWage: 170 },
    { id: 4, name: "Sarah Wilson", department: "Masonry", dailyWage: 160 },
    { id: 5, name: "Mike Brown", department: "General Labor", dailyWage: 140 },
  ]);

  const [attendance, setAttendance] = useState<{[key: string]: boolean}>({});

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAttendanceToggle = (employeeId: number, present: boolean) => {
    const key = `${selectedDate}-${employeeId}`;
    setAttendance(prev => ({
      ...prev,
      [key]: present
    }));
  };

  const isPresent = (employeeId: number) => {
    const key = `${selectedDate}-${employeeId}`;
    return attendance[key] === true;
  };

  const isAbsent = (employeeId: number) => {
    const key = `${selectedDate}-${employeeId}`;
    return attendance[key] === false;
  };

  const presentCount = filteredEmployees.filter(emp => isPresent(emp.id)).length;
  const absentCount = filteredEmployees.filter(emp => isAbsent(emp.id)).length;
  const unmarkedCount = filteredEmployees.length - presentCount - absentCount;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Tracking</h1>
        <p className="text-muted-foreground">Mark daily attendance for all employees</p>
      </div>

      {/* Date Selection and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-lg font-semibold">Select Date</h2>
          </div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-1"
          />
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Today's Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Present:</span>
              <span className="font-medium text-green-600">{presentCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Absent:</span>
              <span className="font-medium text-red-600">{absentCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Unmarked:</span>
              <span className="font-medium text-orange-600">{unmarkedCount}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Employee Attendance List */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Employee Attendance - {selectedDate}</h2>
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-medium text-sm">
                    {employee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {employee.department} • ${employee.dailyWage}/day
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={isPresent(employee.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAttendanceToggle(employee.id, true)}
                  className={isPresent(employee.id) ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <Check className="w-4 h-4 mr-1" />
                  Present
                </Button>
                <Button
                  variant={isAbsent(employee.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleAttendanceToggle(employee.id, false)}
                  className={isAbsent(employee.id) ? "bg-red-600 hover:bg-red-700" : ""}
                >
                  <X className="w-4 h-4 mr-1" />
                  Absent
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AttendanceTracking;
