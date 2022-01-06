import { attendances } from './../interface/attendances';
import { AuthService } from './../service/auth.service';
import { Student } from './../interface/status';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  basicData: any;
  basicOptions: any;
  da: any = [];
  loading: Boolean = false;
  dat: Date
  student: Student[] = [];
  attend: attendances[] = [];
  displayedColumns: string[] = ['StudentNo', 'firstName', 'status', 'date'];
  dataSource = new MatTableDataSource(this.student);
  date = new FormGroup({
    date: new FormControl(''),
  });

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.date.valueChanges.subscribe(data => {
      this.loading = true
      this.dat = data.date;
      let d = moment(this.dat).format('YYYY-MM-DD')

      console.log(d)
      this.auth.getAttendanceBydate(d).subscribe(data => {
        this.loading = false;
        this.student = data;
        this.dataSource = new MatTableDataSource(this.student);
      })
    })
    this.getAttendance();
    this.basicOptions = {
      title: {
        display: true,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    };
  }

  getAttendance() {
    this.auth.getAttendance().subscribe(data => {
      // console.log(data);
      this.student = data;
      this.dataSource = new MatTableDataSource(this.student);

    }, error => {
      console.log(error.error);
    });

    this.auth.getWeekly().subscribe(data => {
      this.attend = data;
      console.log(this.attend);
      this.attend.forEach(element => {
        // console.log(element);
        let temp = {
          label: element.student.firstName + ' ' + element.student.lastName,
          backgroundColor: '#42A5F5',
          data: [(element.attendance.length / 5) * 100]
        }
        this.da.push(temp);
      })

      this.basicData = {
        labels: ['Weekly Percentage Attendance'],
        datasets: this.da
      };

    }, error => {
      console.log(error.error);
    });

  }



  initCap(value: string) {
    return value.charAt(0).toUpperCase() + value.substring(1, value.length).toLowerCase();;
  }


}
