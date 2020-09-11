import { Component, OnInit } from '@angular/core';
import { ICandiate } from 'src/Model/ICandiate';
import { DataFetchingServiceService } from '../Service/data-fetching-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  constructor(public employeeData: DataFetchingServiceService) { }
  employeeDataArray: ICandiate[];
  temp: ICandiate[];
  ngOnInit(): void {
    this.employeeData.getEmpolyees()
      .subscribe(data => {
        this.employeeDataArray = data;
        this.temp = data;
      }
      );
  }
  getEmployees() {

  }

  findByName(value) {
    this.temp = this.employeeDataArray;
    this.temp = this.temp.filter(employee => employee.name === value)
  }

  sorting(value) {
    this.temp = this.employeeDataArray;
    this.temp.sort(function(a, b){
      if(a.name < b.name) { return -1; }
      if(a.name > b.name) { return 1; }
      return 0;
  })
  console.log(this.temp);

  }

}
