import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-entrance',
  templateUrl: './entrance.component.html',
  styleUrls: ['./entrance.component.css'],
})
export class EntranceComponent implements OnInit {
  frmUserData: FormGroup | any;
  entranceOption: any;
  isSigning: boolean = true;

  optionMessages = {
    signInOption: "Não possui uma conta?",
    signUpOption: "Já possui uma conta?"
  }
  errorMessage: any;

  constructor(
    private userSvc: UserService,
    private frmBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.entranceOption = this.optionMessages.signInOption;
  }

  initializeForm() {
    this.frmUserData = this.frmBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  entranceSubmit() {

    if (this.isSigning) {
      const {username, password} = this.frmUserData.value;

      const userData = {
        username: username,
        password: password,
      };

      this.userSvc.doSignIn(userData).subscribe(
        async res =>  await this.successEntrance(res.data),
        (error) => {
          this.errorMessage = error.error.message
        }
      );
    } else {
      const {email, username, password} = this.frmUserData.value;

      const userData = {
        email: email.trim(),
        username: username.trim(),
        password: password.trim(),
      };

      this.userSvc.doSignUp(userData).subscribe(
        async res =>  await this.successEntrance(res.data),
        (error) => {
          this.errorMessage = error.error.message
        }
      );
    }
  }

  async successEntrance(userData: any) {
    localStorage.setItem("username", userData.username)
    localStorage.setItem("userId", userData.userId)
    this.frmUserData.reset();
    await this.router.navigateByUrl('/home')
  }

  switchEntranceOption() {
    this.isSigning = !this.isSigning;
    this.entranceOption = (this.isSigning)? this.optionMessages.signInOption: this.optionMessages.signUpOption
    this.errorMessage = '';
  }
}
