import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // or .css if that's your file
})
export class LoginComponent {
  loading = false;
  serverError = '';
  serverSuccess = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  submit() {
    this.serverError = '';
    this.serverSuccess = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.auth.login(this.form.value as any)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          // ReqRes returns { token }, your API might return { message } or user info
          this.serverSuccess = res.token
            ? `Logged in! Token: ${res.token}`
            : (res.message ?? 'Logged in!');
        },
        error: (err) => {
          const msg = err?.error?.error || err?.error?.message || 'Login failed.';
          this.serverError = typeof msg === 'string' ? msg : 'Login failed.';
        },
      });
  }

  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
}
