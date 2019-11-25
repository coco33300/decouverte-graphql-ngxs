import { Component, OnInit } from '@angular/core';
import { User } from 'src/generated/types.graphql-gen';
import { tap } from 'rxjs/operators';
import { Store, Select } from '@ngxs/store';
import { QueryUsersAction, MutateCreateUserAction } from './store/actions/user.action';
import { UserState } from './store/states/user.state';
import { Observable } from 'apollo-link';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Select(UserState.users)
  users$: Observable<User[]>;

  addControl = new FormControl('', Validators.required);
  searchControl = new FormControl('');

  constructor(private store: Store) {
  }

  createUser() {
    this.store.dispatch(new MutateCreateUserAction(this.addControl.value));
  }

  ngOnInit() {
    this.store.dispatch(new QueryUsersAction());
    this.searchControl.valueChanges.pipe(
      tap( value => this.store.dispatch(new QueryUsersAction(value)))
    ).subscribe();
  }
}
