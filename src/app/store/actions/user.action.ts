export class QueryUsersAction {
  static readonly type = '[User] Query Users';

  constructor(public name = '') {}
}

export class MutateCreateUserAction {
  static readonly type = '[User adding user';

  constructor(public name = '') {}
}