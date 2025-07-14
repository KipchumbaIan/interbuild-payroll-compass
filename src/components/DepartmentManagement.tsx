
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Users, DollarSign } from "lucide-react";
import { useEmployeeContext } from "@/contexts/EmployeeContext";

const DepartmentManagement = () => {
  const { departments, getDepartmentStats, addDepartment, removeDepartment } = useEmployeeContext();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");

  const departmentStats = getDepartmentStats();
  const totalEmployees = departmentStats.reduce((sum, dept) => sum + dept.count, 0);
  const totalPayroll = departmentStats.reduce((sum, dept) => sum + dept.totalPayroll, 0);

  const handleAddDepartment = () => {
    if (newDepartment.trim()) {
      addDepartment(newDepartment);
      setNewDepartment("");
      setShowAddForm(false);
    }
  };

  const handleDeleteDepartment = (id: number) => {
    const dept = departments.find(d => d.id === id);
    const hasEmployees = dept && departmentStats.find(s => s.name === dept.name)?.count > 0;
    
    if (hasEmployees) {
      alert("Cannot delete department with active employees. Please reassign employees first.");
      return;
    }
    
    removeDepartment(id);
  };

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
              <p className="text-2xl font-bold text-foreground">KES {totalPayroll.toLocaleString()}</p>
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
        {departmentStats.map((dept, index) => {
          const department = departments.find(d => d.name === dept.name);
          return (
            <Card key={dept.name} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{dept.name}</h3>
                  <div className="flex gap-6 mt-2">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {dept.count} employees
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 text-muted-foreground mr-1" />
                      <span className="text-sm text-muted-foreground">
                        KES {dept.totalPayroll.toLocaleString()} weekly
                      </span>
                    </div>
                  </div>
                </div>
                {department && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteDepartment(department.id)}
                    disabled={dept.count > 0}
                    className={dept.count > 0 ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default DepartmentManagement;
