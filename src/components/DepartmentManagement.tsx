
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Users, DollarSign } from "lucide-react";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Plumbing", employeeCount: 12, weeklyPayroll: 14400 },
    { id: 2, name: "Electrical", employeeCount: 8, weeklyPayroll: 10800 },
    { id: 3, name: "Carpentry", employeeCount: 15, weeklyPayroll: 18000 },
    { id: 4, name: "Masonry", employeeCount: 7, weeklyPayroll: 7350 },
    { id: 5, name: "General Labor", employeeCount: 3, weeklyPayroll: 2200 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      const department = {
        id: departments.length + 1,
        name: newDepartment,
        employeeCount: 0,
        weeklyPayroll: 0,
      };
      setDepartments([...departments, department]);
      setNewDepartment("");
      setShowAddForm(false);
    }
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter(dept => dept.id !== id));
  };

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalPayroll = departments.reduce((sum, dept) => sum + dept.weeklyPayroll, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Department Management</h1>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Departments</p>
              <p className="text-2xl font-bold text-foreground">{departments.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Employees</p>
              <p className="text-2xl font-bold text-foreground">{totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Weekly Payroll</p>
              <p className="text-2xl font-bold text-foreground">${totalPayroll.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Add Department Form */}
      {showAddForm && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Department</h2>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="departmentName">Department Name</Label>
              <Input
                id="departmentName"
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
                placeholder="Enter department name"
              />
            </div>
            <Button onClick={handleAddDepartment}>Add Department</Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
          </div>
        </Card>
      )}

      {/* Department List */}
      <div className="grid gap-4">
        {departments.map((department) => (
          <Card key={department.id} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-foreground">{department.name}</h3>
                <div className="flex gap-6 mt-2">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">
                      {department.employeeCount} employees
                    </span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">
                      ${department.weeklyPayroll.toLocaleString()} weekly
                    </span>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDeleteDepartment(department.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentManagement;
