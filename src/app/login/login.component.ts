import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  token:any;
  loginForm = new FormGroup({
    username: new FormControl('',Validators.minLength(3)),
    password: new FormControl('',Validators.minLength(3))
  });



  constructor(private auth: AuthService, private router: Router,private snackBar: MatSnackBar) { }

  ngOnInit() {
    if(this.auth.isLoggedIn())
    this.router.navigate['/home']
  }

  Submit() {
    console.log(this.loginForm.value)
    this.auth.login(this.loginForm.value).subscribe(token => {
      token = token.token;
      this.auth.storeJwtToken(token);
      this.router.navigate(['/home']);
    },error => {
      this.snackBar.open('Something went wrong', error.message, {
        duration: 3000
      });
      console.log(error)
    });

  }

}
