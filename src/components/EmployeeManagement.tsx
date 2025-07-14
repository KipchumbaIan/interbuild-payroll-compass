
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Search } from "lucide-react";

const EmployeeManagement = () => {
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

  const departments = ["Plumbing", "Electrical", "Carpentry", "Masonry", "General Labor"];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.idNumber && newEmployee.department) {
      const employee = {
        id: employees.length + 1,
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Employee Management</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
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

      {/* Add Employee Form */}
      {showAddForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                value={newEmployee.idNumber}
                onChange={(e) => setNewEmployee({...newEmployee, idNumber: e.target.value})}
                placeholder="Enter ID number"
              />
            </div>
            <div>
              <Label htmlFor="department">Department</Label>
              <select
                id="department"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                className="w-full p-2 border border-input rounded-md bg-background"
              >
                <option value="">Select Department</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="dailyWage">Daily Wage ($)</Label>
              <Input
                id="dailyWage"
                type="number"
                value={newEmployee.dailyWage}
                onChange={(e) => setNewEmployee({...newEmployee, dailyWage: e.target.value})}
                placeholder="Enter daily wage"
              />
            </div>
            <div>
              <Label htmlFor="dateEmployed">Date Employed</Label>
              <Input
                id="dateEmployed"
                type="date"
                value={newEmployee.dateEmployed}
                onChange={(e) => setNewEmployee({...newEmployee, dateEmployed: e.target.value})}
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={handleAddEmployee}>Add Employee</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Employee List */}
      <div className="grid gap-4">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={employee.profilePhoto}
                  alt={employee.name}
                  className="w-12 h-12 rounded-full bg-muted"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{employee.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {employee.idNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-foreground">{employee.department}</p>
                <p className="text-sm text-muted-foreground">${employee.dailyWage}/day</p>
                <p className="text-xs text-muted-foreground">Since: {employee.dateEmployed}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;
