import { User } from 'src/generated/types.graphql-gen';
import { State, Action, StateContext, Select, Selector } from '@ngxs/store';
import { Apollo } from 'apollo-angular';
import { QueryUsersAction, MutateCreateUserAction } from '../actions/user.action';
import gql from 'graphql-tag';
import { tap, switchMap } from 'rxjs/operators';


export class UserStateModel {
  users: User[] = [];
}

@State({
  name: 'UserState',
  defaults: new UserStateModel()
})
export class UserState {

  constructor(private apollo: Apollo){}

  @Selector()
  static users(state: UserStateModel) {
    return state.users;
  }

  // class UserState
  @Action(QueryUsersAction)
  queryUsersAction({patchState}: StateContext<UserStateModel>, {name}: QueryUsersAction) {
    return this.apollo.query<{users: User[]}>({
      query: gql` query users($name: String){
        users(name: $name) {
          id
          name
        }
      }
      `,
      variables: {
        name
      },
      fetchPolicy: 'no-cache'
    }).pipe(
        tap(({data : {users}}) => patchState({users}))
      );
  }

  @Action(MutateCreateUserAction)
  createUser({dispatch}: StateContext<UserStateModel>, {name}: MutateCreateUserAction) {
    return this.apollo.mutate<{createUser: User}>({
      mutation: gql`
       mutation createUser($name: String!){
        createUser(name:$name){
          id
          name
        }
      }`,
      variables : {name}
    }).pipe(
      switchMap(() => dispatch(new QueryUsersAction()))
    );
  }

}
