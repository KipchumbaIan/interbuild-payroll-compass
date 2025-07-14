
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Search, Users, Building2 } from "lucide-react";

const EmployeeManagement = () => {
  // Centralized departments list that syncs across components
  const [departments] = useState([
    "Plumbing", "Electrical", "Carpentry", "Masonry", "General Labor", "Roofing", "Painting"
  ]);

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "John Smith",
      idNumber: "EMP001",
      department: "Plumbing",
      dailyWage: 180,
      dateEmployed: "2023-01-15",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Maria Garcia",
      idNumber: "EMP002",
      department: "Electrical",
      dailyWage: 200,
      dateEmployed: "2023-02-20",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 3,
      name: "David Johnson",
      idNumber: "EMP003",
      department: "Carpentry",
      dailyWage: 170,
      dateEmployed: "2023-03-10",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      idNumber: "EMP004",
      department: "Masonry",
      dailyWage: 160,
      dateEmployed: "2023-04-05",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Mike Brown",
      idNumber: "EMP005",
      department: "General Labor",
      dailyWage: 140,
      dateEmployed: "2023-05-12",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Alex Rodriguez",
      idNumber: "EMP006",
      department: "Roofing",
      dailyWage: 185,
      dateEmployed: "2023-06-18",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Emma Thompson",
      idNumber: "EMP007",
      department: "Painting",
      dailyWage: 155,
      dateEmployed: "2023-07-22",
      profilePhoto: "/placeholder.svg",
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    idNumber: "",
    department: "",
    dailyWage: "",
    dateEmployed: "",
  });

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.idNumber && newEmployee.department) {
      const employee = {
        id: Math.max(...employees.map(e => e.id), 0) + 1,
        ...newEmployee,
        dailyWage: parseInt(newEmployee.dailyWage),
        profilePhoto: "/placeholder.svg",
      };
      setEmployees([...employees, employee]);
      setNewEmployee({
        name: "",
        idNumber: "",
        department: "",
        dailyWage: "",
        dateEmployed: "",
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const getDepartmentStats = () => {
    return departments.map(dept => ({
      name: dept,
      count: employees.filter(emp => emp.department === dept).length,
      totalPayroll: employees
        .filter(emp => emp.department === dept)
        .reduce((sum, emp) => sum + (emp.dailyWage * 7), 0) // Assuming full week
    }));
  };

  const departmentStats = getDepartmentStats();

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen p-6">
      <div className="flex justify-between items-center bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center">
            <Users className="w-8 h-8 text-primary mr-3" />
            Employee Management
          </h1>
          <p className="text-muted-foreground">Manage all employee records and assignments</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Department Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {departmentStats.map((dept, index) => {
          const colors = [
            'from-blue-500 to-blue-600',
            'from-green-500 to-green-600', 
            'from-purple-500 to-purple-600',
            'from-orange-500 to-orange-600',
            'from-pink-500 to-pink-600',
            'from-indigo-500 to-indigo-600',
            'from-red-500 to-red-600'
          ];
          
          return (
            <Card key={dept.name} className={`p-4 bg-gradient-to-r ${colors[index % colors.length]} text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm">{dept.name}</h3>
                  <p className="text-2xl font-bold">{dept.count}</p>
                  <p className="text-xs opacity-90">employees</p>
                </div>
                <Building2 className="w-8 h-8 opacity-80" />
              </div>
            </Card>
          );
        })}
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

      {/* Add Employee Form */}
      {showAddForm && (
        <Card className="p-6 bg-white shadow-lg border-2 border-blue-200">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">Add New Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="Enter full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="idNumber" className="text-sm font-medium">ID Number</Label>
              <Input
                id="idNumber"
                value={newEmployee.idNumber}
                onChange={(e) => setNewEmployee({...newEmployee, idNumber: e.target.value})}
                placeholder="Enter ID number"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="department" className="text-sm font-medium">Department</Label>
              <select
                id="department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                className="w-full p-2 border border-input rounded-md bg-background mt-1"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="dailyWage" className="text-sm font-medium">Daily Wage ($)</Label>
              <Input
                id="dailyWage"
                type="number"
                value={newEmployee.dailyWage}
                onChange={(e) => setNewEmployee({...newEmployee, dailyWage: e.target.value})}
                placeholder="Enter daily wage"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dateEmployed" className="text-sm font-medium">Date Employed</Label>
              <Input
                id="dateEmployed"
                type="date"
                value={newEmployee.dateEmployed}
                onChange={(e) => setNewEmployee({...newEmployee, dateEmployed: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button 
              onClick={handleAddEmployee}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              Add Employee
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Employee List */}
      <div className="grid gap-4">
        {filteredEmployees.map((employee) => {
          const deptIndex = departments.indexOf(employee.department);
          const cardColors = [
            'border-l-blue-500 bg-blue-50',
            'border-l-green-500 bg-green-50',
            'border-l-purple-500 bg-purple-50',
            'border-l-orange-500 bg-orange-50',
            'border-l-pink-500 bg-pink-50',
            'border-l-indigo-500 bg-indigo-50',
            'border-l-red-500 bg-red-50'
          ];
          
          return (
            <Card key={employee.id} className={`p-6 shadow-md border-l-4 ${cardColors[deptIndex % cardColors.length]}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={employee.profilePhoto}
                    alt={employee.name}
                    className="w-16 h-16 rounded-full bg-muted border-4 border-white shadow-md"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{employee.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {employee.idNumber}</p>
                    <p className="text-sm font-medium text-blue-600">{employee.department}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">${employee.dailyWage}/day</p>
                  <p className="text-sm text-muted-foreground">Since: {employee.dateEmployed}</p>
                  <p className="text-sm font-medium text-purple-600">Weekly: ${employee.dailyWage * 7}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="hover:bg-blue-100">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteEmployee(employee.id)}
                    className="hover:bg-red-100 text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeManagement;
