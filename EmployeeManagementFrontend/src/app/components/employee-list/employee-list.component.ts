import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeService } from '../../services/employee.service';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  employeeService = inject(EmployeeService);

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}

