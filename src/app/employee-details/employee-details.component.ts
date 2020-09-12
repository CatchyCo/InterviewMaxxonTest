import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICandiate } from 'src/Model/ICandiate';
import { DataFetchingServiceService } from '../Service/data-fetching-service.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {


  constructor(public employeeData: DataFetchingServiceService, private route: ActivatedRoute) { }
  employeeDataArray: ICandiate[];
  temp: ICandiate[];
  id: number;
  ngOnInit(): void {
    this.employeeData.getEmpolyees()
      .subscribe(data => {
        this.employeeDataArray = data;
        this.temp = data;
      }
      );
    this.id = this.route.snapshot.params.id;
  }
}
