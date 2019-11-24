import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  // Attempt to register
  register(form) {
    this.auth.doRegister(form.form.value).then(res => {
      document.getElementById('bad-register').style.display = 'none';
      this.router.navigate(['/login']);
    }, err => {
      document.getElementById('bad-register').style.display = 'block';
      console.log(err);
    });
  }

}
