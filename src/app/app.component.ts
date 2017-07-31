import { Component } from '@angular/core';
import { trigger,state,style,transition,animate } from '@angular/animations';
import { User } from './models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
  trigger('fadeIn', [
    state('*' , style({ opacity: 1 })),
    state('void', style({ opacity: 0 })),
    transition('* => *', animate('.4s'))
  ])
],


})
export class AppComponent {
  users: User[] = [];
  userForm: FormGroup;

  constructor (private fb: FormBuilder) {
    this.setUpUserForm();
  }

  onUpdateUser(f: FormGroup) {
    if (f.valid) {
      if (!f.value.id) {
        const lastUserId = this.users.length ? this.users[this.users.length - 1].id : 0;
        const duplicatedEmail = this.users.findIndex((u: User) => f.value.email === u.email) > -1;
        if (duplicatedEmail) {
          alert('User with same email was found!')
        } else {
          this.users.push(new User(lastUserId + 1, f.value.name, f.value.email));
          f.reset();
        }
      } else {
        const foundUser = this.users.find((u: User) => f.value.id === u.id);
        if (foundUser) {
          foundUser.copyFrom(f.value.name, f.value.email);
          f.reset();
        } else {
          alert("User with same is isn't found!")
        }
      }

    }
  }

  onEditUser(user: User) {
    this.setUpUserForm(user.id, user.name, user.email);
  }

  onDeleteUser(i: number) {
    if (this.userForm.value.id === this.users[i].id) {
      this.userForm.reset();
    }
    this.users.splice(i, 1);
  }

  setUpUserForm(id: number = null, name: string = null, email: string = null) {
    this.userForm = this.fb.group({
      'id': [id],
      'name': [name || '', [
        Validators.required
      ]],
      'email': [email || '', [
        Validators.required,
        Validators.pattern(emailValidator)
      ]]
    })
  }



  }
