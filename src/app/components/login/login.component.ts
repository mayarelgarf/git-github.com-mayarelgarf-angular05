import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (data: any) => {
          this.authService.saveLoginData(data);
          this.router.navigate(['/home']);
        },
        (error: any) => {
          alert('Invalid username or password');
        }
      );
    }
  }
}
