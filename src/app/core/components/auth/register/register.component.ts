import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { RegisterRequest } from '../../../models/auth';
import { catchError, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    RegistrationSuccessComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private readonly destroy$ = new Subject<void>();
  registrationForm!: FormGroup;
  registrationSuccess = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegisterClicked(): void {
    if (!this.registrationForm.valid) {
      this.markFormGroupTouched();
    }
    const registrationData: RegisterRequest = {
      userName: this.registrationForm.value.userName,
      password: this.registrationForm.value.password,
    };
    this.authService
      .register(registrationData)
      .pipe(
        tap({
          error: (error) => {
            console.error('Registration error:', error);
          },
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((response) => {
        this.registrationSuccess = true;
        console.log('Registration response:', response);
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registrationForm.controls).forEach((key) => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();
    });
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
