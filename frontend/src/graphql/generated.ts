import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
}

export type Mutation = {
  __typename?: 'Mutation'
  createDraft?: Maybe<Post>
  deletePost?: Maybe<Post>
  incrementPostViewCount?: Maybe<Post>
  signupUser: User
  togglePublishPost?: Maybe<Post>
}

export type MutationCreateDraftArgs = {
  authorEmail: Scalars['String']
  data: PostCreateInput
}

export type MutationDeletePostArgs = {
  id: Scalars['Int']
}

export type MutationIncrementPostViewCountArgs = {
  id: Scalars['Int']
}

export type MutationSignupUserArgs = {
  data: UserCreateInput
}

export type MutationTogglePublishPostArgs = {
  id: Scalars['Int']
}

export type Post = {
  __typename?: 'Post'
  author?: Maybe<User>
  content?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  published: Scalars['Boolean']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
  viewCount: Scalars['Int']
}

export type PostCreateInput = {
  content?: InputMaybe<Scalars['String']>
  title: Scalars['String']
}

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder
}

export type Query = {
  __typename?: 'Query'
  allUsers: Array<User>
  draftsByUser?: Maybe<Array<Maybe<Post>>>
  feed: Array<Post>
  postById?: Maybe<Post>
}

export type QueryDraftsByUserArgs = {
  userUniqueInput: UserUniqueInput
}

export type QueryFeedArgs = {
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>
  searchString?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type QueryPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']>
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc',
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  id: Scalars['Int']
  name?: Maybe<Scalars['String']>
  posts: Array<Post>
}

export type UserCreateInput = {
  email: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  posts?: InputMaybe<Array<PostCreateInput>>
}

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
}

export type PostsQueryVariables = Exact<{ [key: string]: never }>

export type PostsQuery = {
  __typename?: 'Query'
  feed: Array<{
    __typename?: 'Post'
    id: number
    title: string
    content?: string | null
    published: boolean
  }>
}

export const PostsDocument = gql`
  query posts {
    feed {
      id
      title
      content
      published
    }
  }
`

export function usePostsQuery(
  options?: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'>,
) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options })
}
