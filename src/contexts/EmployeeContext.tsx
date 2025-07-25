
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Employee {
  id: string;
  name: string;
  idNumber: string;
  department: string;
  dailyWage: number;
  dateEmployed: string;
  profilePhoto: string;
  contacts: string;
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
  loading: boolean;
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  removeEmployee: (id: string) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
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
  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: "Plumbing", employeeCount: 0, weeklyPayroll: 0 },
    { id: 2, name: "Electrical", employeeCount: 0, weeklyPayroll: 0 },
    { id: 3, name: "Carpentry", employeeCount: 0, weeklyPayroll: 0 },
    { id: 4, name: "Masonry", employeeCount: 0, weeklyPayroll: 0 },
    { id: 5, name: "General Labor", employeeCount: 0, weeklyPayroll: 0 },
    { id: 6, name: "Roofing", employeeCount: 0, weeklyPayroll: 0 },
    { id: 7, name: "Painting", employeeCount: 0, weeklyPayroll: 0 },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  // Load employees from Supabase on mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mappedEmployees: Employee[] = data.map(emp => ({
        id: emp.id,
        name: emp.name,
        idNumber: emp.id_number,
        department: emp.department,
        dailyWage: Number(emp.daily_wage),
        dateEmployed: emp.date_employed,
        profilePhoto: emp.profile_photo || "/placeholder.svg",
        contacts: emp.contacts || "",
      }));

      setEmployees(mappedEmployees);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert({
          name: employeeData.name,
          id_number: employeeData.idNumber,
          department: employeeData.department,
          daily_wage: employeeData.dailyWage,
          date_employed: employeeData.dateEmployed,
          profile_photo: employeeData.profilePhoto,
          contacts: employeeData.contacts,
        })
        .select()
        .single();

      if (error) throw error;

      const newEmployee: Employee = {
        id: data.id,
        name: data.name,
        idNumber: data.id_number,
        department: data.department,
        dailyWage: Number(data.daily_wage),
        dateEmployed: data.date_employed,
        profilePhoto: data.profile_photo || "/placeholder.svg",
        contacts: data.contacts || "",
      };

      setEmployees(prev => [newEmployee, ...prev]);
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  };

  const removeEmployee = async (id: string) => {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error removing employee:', error);
      throw error;
    }
  };

  const updateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      const updateData: any = {};
      if (employeeData.name) updateData.name = employeeData.name;
      if (employeeData.idNumber) updateData.id_number = employeeData.idNumber;
      if (employeeData.department) updateData.department = employeeData.department;
      if (employeeData.dailyWage) updateData.daily_wage = employeeData.dailyWage;
      if (employeeData.dateEmployed) updateData.date_employed = employeeData.dateEmployed;
      if (employeeData.profilePhoto) updateData.profile_photo = employeeData.profilePhoto;
      if (employeeData.contacts) updateData.contacts = employeeData.contacts;

      const { data, error } = await supabase
        .from('employees')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      const updatedEmployee: Employee = {
        id: data.id,
        name: data.name,
        idNumber: data.id_number,
        department: data.department,
        dailyWage: Number(data.daily_wage),
        dateEmployed: data.date_employed,
        profilePhoto: data.profile_photo || "/placeholder.svg",
        contacts: data.contacts || "",
      };

      setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
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
      loading,
      addEmployee,
      removeEmployee,
      updateEmployee,
      addDepartment,
      removeDepartment,
      getDepartmentStats,
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};
