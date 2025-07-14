
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Employee {
  id: number;
  name: string;
  idNumber: string;
  department: string;
  dailyWage: number;
  dateEmployed: string;
  profilePhoto: string;
}

export interface Department {
  id: number;
  name: string;
  employeeCount: number;
  weeklyPayroll: number;
}

interface EmployeeContextType {
  employees: Employee[];
  departments: Department[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  removeEmployee: (id: number) => void;
  addDepartment: (name: string) => void;
  removeDepartment: (id: number) => void;
  getDepartmentStats: () => { name: string; count: number; totalPayroll: number }[];
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Plumbing", employeeCount: 0, weeklyPayroll: 0 },
    { id: 2, name: "Electrical", employeeCount: 0, weeklyPayroll: 0 },
    { id: 3, name: "Carpentry", employeeCount: 0, weeklyPayroll: 0 },
    { id: 4, name: "Masonry", employeeCount: 0, weeklyPayroll: 0 },
    { id: 5, name: "General Labor", employeeCount: 0, weeklyPayroll: 0 },
    { id: 6, name: "Roofing", employeeCount: 0, weeklyPayroll: 0 },
    { id: 7, name: "Painting", employeeCount: 0, weeklyPayroll: 0 },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "John Smith",
      idNumber: "EMP001",
      department: "Plumbing",
      dailyWage: 1800, // KES 1,800
      dateEmployed: "2023-01-15",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Maria Garcia",
      idNumber: "EMP002",
      department: "Electrical",
      dailyWage: 2000, // KES 2,000
      dateEmployed: "2023-02-20",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 3,
      name: "David Johnson",
      idNumber: "EMP003",
      department: "Carpentry",
      dailyWage: 1700, // KES 1,700
      dateEmployed: "2023-03-10",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      idNumber: "EMP004",
      department: "Masonry",
      dailyWage: 1600, // KES 1,600
      dateEmployed: "2023-04-05",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Mike Brown",
      idNumber: "EMP005",
      department: "General Labor",
      dailyWage: 1400, // KES 1,400
      dateEmployed: "2023-05-12",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Alex Rodriguez",
      idNumber: "EMP006",
      department: "Roofing",
      dailyWage: 1850, // KES 1,850
      dateEmployed: "2023-06-18",
      profilePhoto: "/placeholder.svg",
    },
    {
      id: 7,
      name: "Emma Thompson",
      idNumber: "EMP007",
      department: "Painting",
      dailyWage: 1550, // KES 1,550
      dateEmployed: "2023-07-22",
      profilePhoto: "/placeholder.svg",
    },
  ]);

  const addEmployee = (employeeData: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employeeData,
      id: Math.max(...employees.map(e => e.id), 0) + 1,
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const removeEmployee = (id: number) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const addDepartment = (name: string) => {
    const newDepartment = {
      id: Math.max(...departments.map(d => d.id), 0) + 1,
      name,
      employeeCount: 0,
      weeklyPayroll: 0,
    };
    setDepartments(prev => [...prev, newDepartment]);
  };

  const removeDepartment = (id: number) => {
    setDepartments(prev => prev.filter(dept => dept.id !== id));
  };

  const getDepartmentStats = () => {
    return departments.map(dept => ({
      name: dept.name,
      count: employees.filter(emp => emp.department === dept.name).length,
      totalPayroll: employees
        .filter(emp => emp.department === dept.name)
        .reduce((sum, emp) => sum + (emp.dailyWage * 7), 0) // Weekly pay
    }));
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      departments,
      addEmployee,
      removeEmployee,
      addDepartment,
      removeDepartment,
      getDepartmentStats,
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};
