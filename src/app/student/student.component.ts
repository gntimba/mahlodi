import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  studentForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    studentNo: new FormControl('')
  });


  constructor(private auth: AuthService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.studentForm.value);

    this.auth.registerStudent(this.studentForm.value).subscribe(data => {
      console.log(data);
      this.snackBar.open('Saved Successfully', data.firstName, {
        duration: 3000
      });
    }, err => {
      this.snackBar.open('Something went wrong', err.error.debugMessage, {
        duration: 3000
      });
      console.log(err);
    });


  }


}
