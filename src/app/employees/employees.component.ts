import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { ICandiate } from 'src/Model/ICandiate';
import { deprecate } from 'util';
import { DataFetchingServiceService } from '../Service/data-fetching-service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  constructor(public employeeData: DataFetchingServiceService) { }
  employeeDataArray: ICandiate[];
  temp: ICandiate[]; // tempory variable changes according to user requirements
  showMainTable = true; // use for hidding the Employees table
  finalDepart = []; // Array  for storing departments and number of employees of respective department 

  // Init Method for fetching Employees data from  DataFetchingService
  ngOnInit(): void {
    this.employeeData.getEmpolyees()
      .subscribe(data => {
        this.employeeDataArray = data;
        this.temp = data;
      }
      );
  }
  //Function to employees by Name
  findByName(value) {
    this.temp = this.employeeDataArray;
    this.temp = this.temp.filter(employee => employee.name === value);
  }

  //Function for soring the table according to user input
  sorting(value) {
    this.temp = this.employeeDataArray;
    if (value === 'name') {
      this.temp.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    } else {

      let sortedDate = this.temp.map(employee => employee.joining_date);
      let dateKey = [];
      var dateArray = sortedDate.map(date =>
        date.split("/").reverse().join("-")
      );
      let newDateArray = dateArray.map(date => new Date(date));
      for (var i = 0; i <= this.temp.length - 1; i++) {
        dateKey.push(newDateArray[i]);
      }
      for (var i = 0; i < this.employeeDataArray.length; i++) {
        this.temp[i]['dateWord'] = dateKey[i];
      }
      var tempDate;
      for (var i = 0; i <= this.temp.length - 1; i++) {
        for (var j = 0; j <= this.temp.length - 1; j++) {
          if (dateKey[i] > dateKey[i + j]) {
            tempDate = dateKey[i];
            dateKey[i] = dateKey[i + j];
            dateKey[i + j] = tempDate;
          }
        }
      }

      console.log(dateKey)
      var finalSortedDate = [];

      for (var i = 0; i <= this.temp.length - 1; i++) {
        for (var j = 0; j <= this.temp.length - 1; j++) {
          if (dateKey[i] === this.temp[j]['dateWord']) {
            finalSortedDate[i] = this.temp[j]
          }
        }
      }

      console.log(finalSortedDate)
      this.temp = finalSortedDate;

    }
  }

  showExp2Y() {
    var currentDate = new Date().toDateString().split(' ')[3];
    this.temp = this.employeeDataArray;
    this.temp = this.temp.map(employee => {
      if ((parseInt(currentDate) - parseInt(employee.joining_date.split("/").pop())) > 2) {
        return employee;
      }
    });
  }

  getoccuratence(array, value) {
    var count = 0;
    array.forEach(element => {
      if (element == value) count++;
    });
    return count;
  }

  showDepartment() {
    this.showMainTable = !this.showMainTable;
    this.temp = this.employeeDataArray;
    var arrayDep = [];
    this.finalDepart = [];
    arrayDep = this.temp.map(employee => employee.department);
    var setDep = new Set(arrayDep);
    var depart;
    for (depart of setDep.values()) {
      let count = this.getoccuratence(arrayDep, depart);
      this.finalDepart.push({ "department": depart, "count": count });
    }
  }

  deleteDepartment(value) {
    this.temp = this.employeeDataArray;
    this.temp = this.temp.map(employee => { if (employee.department != value) return employee; });
    console.log(this.temp);
  }

  reset() {
    this.temp = this.employeeDataArray;
    this.temp.sort((a, b) => {
      if (a.id < b.id) { return -1; }
      if (a.id > b.id) { return 1; }
      return 0;
    });

  }


}
