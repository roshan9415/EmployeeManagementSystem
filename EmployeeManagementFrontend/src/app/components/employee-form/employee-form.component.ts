import { Component, OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = { id: 0, name: '', email: '', position: '', salary: 0, department: 'HR' };

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.employeeService.getEmployee(id).subscribe((data) => {
        this.employee = data;
      });
    }
  }

  saveEmployee(employeeForm: NgForm): void {
    if (employeeForm.valid) {
      if (this.employee.id) {
        // Update existing employee
        this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      } else {
        // Add new employee
        this.employeeService.addEmployee(this.employee).subscribe(() => {
          this.router.navigate(['/employees']);
        });
      }
    }
  }
}
