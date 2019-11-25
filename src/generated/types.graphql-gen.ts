export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  createUser?: Maybe<User>,
};


export type MutationCreateUserArgs = {
  name: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<Maybe<User>>>,
};


export type QueryUsersArgs = {
  name?: Maybe<Scalars['String']>
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { users: Maybe<Array<Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'id'>
  )>>> }
);
