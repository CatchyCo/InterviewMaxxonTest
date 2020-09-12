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

      //Creates new array of only dates
      let sortedDate = this.temp.map(employee => employee.joining_date);
      let dateKey = [];
      //Changes the pattern of date from 'dd/mm/yyy' into 'yyyy-mm-dd'
      var dateArray = sortedDate.map(date =>
        date.split("/").reverse().join("-")
      );
      /*Applies new Date() function on each date to Change the formate of date.
      The changed date formate helps for sorting the date in accending manner.*/
      let newDateArray = dateArray.map(date => new Date(date));
      for (var i = 0; i <= this.temp.length - 1; i++) {
        dateKey.push(newDateArray[i]);
      }

      //Date sorting 
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
      //add addiditional property in 'this.temp'  
      for (var i = 0; i < this.employeeDataArray.length; i++) {
        this.temp[i]['dateWord'] = dateKey[i];
      }

      var finalSortedDate = [];
      // Array the element of Employee array in same sequence as of sorted dates, and stored in finalSortedDate
      for (var i = 0; i <= this.temp.length - 1; i++) {
        for (var j = 0; j <= this.temp.length - 1; j++) {
          if (dateKey[i] === this.temp[j]['dateWord']) {
            finalSortedDate[i] = this.temp[j]
          }
        }
      }
      //Assigning Finalsortedarray to 'this.temp'
      this.temp = finalSortedDate;

    }
  }
 
  showExp2Y() {
    //Fetch the year of Employee's joining 
    var currentDate = new Date().toDateString().split(' ')[3];
    this.temp = this.employeeDataArray;
    this.temp = this.temp.map(employee => {
      if ((parseInt(currentDate) - parseInt(employee.joining_date.split("/").pop())) > 2) {
        return employee;
      }
    });
  }

  //Function the department and counts of their appears
  getoccuratence(array, value) {
    var count = 0;
    array.forEach(element => {
      if (element == value) count++;
    });
    return count;
  }

  //Show the table of department and number of employees on respective department
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

  //Function to delete 'Development' department
  deleteDepartment(value) {
    this.temp = this.employeeDataArray;
    this.temp = this.temp.map(employee => { if (employee.department != value) return employee; });
    console.log(this.temp);
  }

  //Function to reset the Employees table
  reset() {
    this.temp = this.employeeDataArray;
    this.temp.sort((a, b) => {
      if (a.id < b.id) { return -1; }
      if (a.id > b.id) { return 1; }
      return 0;
    });

  }


}
