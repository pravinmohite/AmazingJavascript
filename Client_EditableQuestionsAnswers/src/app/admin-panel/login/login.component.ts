import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { QuestionAnswerService } from '../../services/question-answer-service/question-answer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  platformId: Object;
  userForm: FormGroup;
  showRegistrationFields: boolean = false;
  isUserRegistered: boolean = false;
  users: any[] = [];
  login: any = { username: "", password: "" };

  constructor(
    private questionAnswerService: QuestionAnswerService,
    private router: Router,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.platformId = platformId;

    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    if (this.platformId && localStorage.getItem('loggedIn') == "true") {
      this.questionAnswerService.setIsAdmin(true);
      this.questionAnswerService.getUserDetails();
      // this.redirectToUpdateQuestions();
    }
  }

  toggleRegistrationFields() {
    this.showRegistrationFields = !this.showRegistrationFields;
    this.userForm.get('confirmPassword').setValue('');
  }

  submitForm() {
    if (this.showRegistrationFields) {
      // Registration logic
      if (this.userForm.get('confirmPassword').hasError('passwordMismatch')) {
        // Check for password mismatch error
        alert('Password and Confirm Password should match!');
        return; // Stop processing and exit the function
      }

      // Check if blur event conditions are satisfied for username and password
      if (
        this.userForm.get('username').hasError('minlength') ||
        this.userForm.get('username').hasError('required') ||
        this.userForm.get('password').hasError('required') ||
        this.userForm.get('username').value.length < 3 ||
        this.userForm.get('password').value.length < 3
      ) {
        alert('Minimum 3 alphabets or numbers required!');
        return; // Stop processing and exit the function
      }

      if (this.userForm.valid) {
        // If the form is valid, proceed with registration
        const username = this.userForm.get('username').value;
        const password = this.userForm.get('password').value;

        // Call the signUp API to register the user
        this.questionAnswerService.signUp({ username, password, isAdmin: false }).subscribe(
          (response: any) => {
            if (response) {
              // Registration successful
              alert('Registration successful!');
              this.isUserRegistered = true;
              this.userForm.reset(); // Reset the form
            } else {
              alert('Registration failed: ' + response.message);
            }
          },
          (error) => {
            alert('Registration failed: ' + error.message);
          }
        );
      } else {
        // Registration form validation failed
        alert('Please fill in all required fields and ensure passwords match.');
      }
    } else {
      // Login logic
      if (this.userForm.get('username').valid && this.userForm.get('password').valid) {
        // If the form is valid, proceed with login
        const username = this.userForm.get('username').value;
        const password = this.userForm.get('password').value;

        // Call the getloginDetails API to retrieve registered user details
        this.questionAnswerService.getloginDetails().subscribe(
          (response: any) => {
            if (response) {
              const matchingUser = response.find((user) => user.username === username && user.password === password);
              if (matchingUser) {
                console.log('isAdmin:', matchingUser.isAdmin); // Debugging line

                // alert('Login successful!');
                this.questionAnswerService.setIsAdmin(matchingUser.isAdmin);
                localStorage.setItem('loggedIn', 'true');
                if (matchingUser.isAdmin) {
                  // Admin login
                  // alert('Admin login successful!');
                  this.router.navigateByUrl('/admin-panel/updateInterviewQuestions');
                } else {
                  // Regular user login
                  // alert('User login successful!');
                  this.router.navigate(['/userPost']);
                }
                // Login successful
                // alert('Login successful!');
                this.questionAnswerService.setIsAdmin(false);
                this.setLoggedInUserDetails(matchingUser);
                localStorage.setItem('loggedIn', 'true');
                // this.redirectToUpdateQuestions();
              } else {
                // Login failed: Invalid credentials
                alert('Login failed: Invalid username or password.');
              }
            } else {
              alert('Login failed: ' + response.message);
            }
          },
          (error) => {
            alert('Login failed: ' + error.message);
          }
        );
      } else {
        // Login form validation failed
        alert('Please fill in valid username and password.');
      }
    }
  }

  setLoggedInUserDetails(userDetails) {
    const formattedUserDetails ={
      userName: userDetails.username,
      isAdmin: userDetails.isAdmin,
      _id: userDetails._id
    }
    this.questionAnswerService.setUserDetails(formattedUserDetails);
  }

  // Function to retrieve users
  getUsers() {
    this.questionAnswerService.getloginDetails().subscribe(
      (response: any) => {
        if (response.success) {
          // Handle successful retrieval of users here
          this.users = response.data;
        } else {
          alert('Failed to retrieve users: ' + response.message);
        }
      },
      (error) => {
        alert('Failed to retrieve users: ' + error.message);
      }
    );
  }

  // Function to delete a user
  deleteUser(username: string) {
    this.questionAnswerService.deleteloginDetails(username).subscribe(
      (response: any) => {
        if (response.success) {
          // Handle successful deletion of the user here
          alert('User deleted successfully.');
          // Optionally, you can update the user list or perform other actions
        } else {
          alert('Failed to delete user: ' + response.message);
        }
      },
      (error) => {
        alert('Failed to delete user: ' + error.message);
      }
    );
  }

  // Function to update user password
  updatePassword(username: string, newPassword: string) {
    this.questionAnswerService.updateloginDetails({ username, password: newPassword }).subscribe(
      (response: any) => {
        if (response.success) {
          // Handle successful password update here
          alert('Password updated successfully.');
          // Optionally, you can reset the form or perform other actions
        } else {
          alert('Failed to update password: ' + response.message);
        }
      },
      (error) => {
        alert('Failed to update password: ' + error.message);
      }
    );
  }

  blurEventHandler(event: FocusEvent) {
    (event.target as HTMLInputElement).classList.remove('invalid-input');
    const enteredValue = (event.target as HTMLInputElement).value;
    if (enteredValue.length < 3) {
      (event.target as HTMLInputElement).classList.add('invalid-input');
    }
  }
  // redirectToUpdateQuestions() {
  //   this.router.navigateByUrl('/admin-panel/updateInterviewQuestions');
  // }

  // Custom validator function to check if passwords match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;

    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ passwordMismatch: true });
    } else {
      // Clear the custom error when passwords match
      control.get('confirmPassword').setErrors(null);
      return null;
    }
  }
}
