import { AuthService } from './../service/auth.service';
import { Student } from './../interface/status';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  student: Student[] = [];
  displayedColumns: string[] = ['StudentNo', 'firstName', 'lastName', 'id'];
  dataSource = new MatTableDataSource(this.student);
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.getAttendance();
  }

  getAttendance() {
    this.auth.getAttendance().subscribe(data => {
      console.log(data);
      this.student = data;
      this.dataSource = new MatTableDataSource(this.student);

    }, error => {
      console.log(error.error);
    });

  }
}
