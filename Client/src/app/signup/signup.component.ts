import { Component, inject, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Country } from '../interface';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    private router = inject(Router);
    private sharedService = inject(SharedService);
    isResponseSent: boolean = true;
    errorMessage: string = '';
    countries: Country[] = [];
    countryObj: any ={};
    selectedCountry: string = '';
    errorMap = new Map<string, string>();
    passwordFieldType: string = 'password';

    signupObj: any = {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        country:'',
        phoneNumber: '',
        address: '',
        password: ''
    };

    signupConfirmPassword: string = '';

    ngOnInit(): void {
        this.getCountries();
    }


    private getCountries(): void {
        this.sharedService.getCountries().subscribe({
            next: (data: Country[]) => {
                this.countries = data.sort((a, b) => a.countryName.localeCompare(b.countryName));
                if (this.countries.length > 0) {
                    this.signupObj.country = this.countries[0].countryCode; 
                }
            },
            error: (err) => {
                console.error('Failed to fetch countries', err);
            }
        });
    }

    private isValidName(name: string): boolean {
        const NameRegex = /^[a-zA-Z]+$/;
        return NameRegex.test(name);
    }

    private isValidEmail(email: string): boolean {
        const EmailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        return EmailRegex.test(email);
    }

    private isValidPhoneNumber(phoneNumber: number): boolean {
        return phoneNumber.toString().length === 10;
    }

    private displayErrorMessage(key: string, value: string): void {
        this.errorMap.set(key, value);
        this.isResponseSent = false;
    }


    togglePasswordVisibility(): void {
        this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }

    public signupValidate(): void {
        this.errorMap.clear();
        this.errorMessage = '';
        this.isResponseSent = true;

        if (!this.signupObj.userName) {
            this.displayErrorMessage('UserNameErrorMessage', 'Please enter a valid username.');
        }
        if (!this.signupObj.password) {
            this.displayErrorMessage('newPasswordErrorMessage', 'Please enter a valid password.');
        }
        if (!this.isValidName(this.signupObj.firstName)) {
            this.displayErrorMessage('firstNameErrorMessage', 'Firstname should only contain alphabets.');
        }
        if (!this.isValidName(this.signupObj.lastName)) {
            this.displayErrorMessage('LastNameErrorMessage', 'Lastname should only contain alphabets.');
        }
        if (!this.signupObj.address) {
            this.displayErrorMessage('addressErrorMessage', 'Please enter a valid address.');
        }
        if (!this.isValidEmail(this.signupObj.email)) {
            this.displayErrorMessage('emailErrorMessage', 'Please enter a valid email.');
        }
        if (!this.isValidPhoneNumber(this.signupObj.phoneNumber)) {
            this.displayErrorMessage('phoneNoerrorMessage', 'Enter a valid phone number.');
        }
        if (!this.signupObj.country) {
            this.displayErrorMessage('countryErrorMessage', 'Select a country.');
        }
        if (this.signupObj.password !== this.signupConfirmPassword) {
            this.displayErrorMessage('ConfirmPasswordErrorMessage', "New password and confirm password don't match.");
        }

        if (this.isResponseSent) {
            this.sharedService.signup(this.signupObj).subscribe({
                next: (response: any) => {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "new account created",
                        showConfirmButton: false,
                        timer: 1500
                        });
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Invalid Signup Attempt",
                        showConfirmButton: false,
                        timer: 1500
                        });
                    console.error('Signup failed', err);
                    this.router.navigate(['/signup']);
                }
            });
        }
    }
}




