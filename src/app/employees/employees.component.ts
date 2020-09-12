import { Component, OnInit } from '@angular/core';
import { count } from 'console';
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
  temp: ICandiate[];
  showMainTable = true;
  finalDepart = [];
  ngOnInit(): void {
    this.employeeData.getEmpolyees()
      .subscribe(data => {
        this.employeeDataArray = data;
        this.temp = data;
      }
      );
  }
  findByName(value) {
    this.temp = this.employeeDataArray;
    this.temp = this.temp.filter(employee => employee.name === value);
  }
  sorting(value) {
    this.temp = this.employeeDataArray;
    if (value === 'name') {
      this.temp.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
      });
    } else {

      let dateKey = [];
      let sortedDate = this.temp.map(employee => employee.joining_date);
      console.log(sortedDate);
      var dateArray = sortedDate.map(date =>
        date.split("/").reverse().join("-")
      )
      let newDateArray = dateArray.map(date => new Date(date))


      for (var i = 0; i <= this.temp.length - 1; i++) {
        dateKey.push({ dateNumber: sortedDate[i], dateWords: newDateArray[i] })
      }
      console.log(dateKey);
      var tempDate;

      for (var i = 0; i < this.temp.length - 1; i++) {
        for (var j = 1; j < this.temp.length - 1; j++) {
          if (newDateArray[i] > newDateArray[i + j]) {
            tempDate = newDateArray[i];
            newDateArray[i] = newDateArray[i + j]
            newDateArray[i + j] = tempDate;
          }
        }
      }

      console.log(dateKey['dateWords']);
      /*     var finaleArray=[];
        for (var i = 0; i < this.temp.length - 1; i++) {
          for (var j = 1; j < this.temp.length - 1 ; j++) {
                    if(newDateArray[i] == dateKey['dateWords'][j]  ){
                        finaleArray.push(dateKey)
                    }
          }
        } */

      // console.log(finaleArray);
      /*     for (var i = 0; i <=this.temp.length - 1; i++) {
            for (var j = 1; j <=this.temp.length - 1; j++) {
              if (dateKey['dateWords'][i] > dateKey['dateWords'][i + j]) {
                tempDate = dateKey['dateWords'][i];
                dateKey['dateWords'][i] = dateKey['dateWords'][i + j]
                dateKey['dateWords'][i + j] = tempDate;
              }
            }
          } */

      /* console.log(dateKey['dateword'][0])
      console.log(newDateArray[5]);
      console.log(dateKey.includes(newDateArray[0])); */
      /*  const sortedMonths = sortedDate.map(emp => parseInt((emp.split('/')[1])));
       console.log(sortedMonths.sort());
       const sortedDays = sortedDate.map(emp => parseInt((emp.split('/')[0])));
       console.log(sortedDays.sort());
       var a = new Date('2019-06-28')
  var b = new Date('2018-06-11')
  console.log(a<b)
  */
    }
  }

  showExp2Y() {
    var currentDate = new Date().toDateString().split(' ')[3];
    this.temp = this.employeeDataArray;
    this.temp = this.temp.map(employee => {
      if ((parseInt(currentDate) - parseInt(employee.joining_date.split("/").pop())) > 2) {
        return employee;
      }
    })
  }

  getoccuratence(array, value) {
    var count = 0;
    array.forEach(element => {
      if (element == value) count++
    });
    return count;
  }

  showDepartment() {
    this.showMainTable = !this.showMainTable;
    var arrayDep = this.temp.map(employee => employee.department);
    var setDep = new Set(arrayDep);
    var depart;
    for (depart of setDep.values()) {
      let count = this.getoccuratence(arrayDep, depart)
      this.finalDepart.push({ "department": depart, "count": count })
    }
    console.log(this.finalDepart);



  }

}
