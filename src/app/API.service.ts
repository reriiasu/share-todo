/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation, GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable } from "zen-observable-ts";

export interface SubscriptionResponse<T> {
  value: GraphQLResult<T>;
}

export type __SubscriptionContainer = {
  onCreateTodo: OnCreateTodoSubscription;
  onUpdateTodo: OnUpdateTodoSubscription;
  onDeleteTodo: OnDeleteTodoSubscription;
};

export type CreateTodoInput = {
  id?: string | null;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  updatedUser: string;
};

export type ModelTodoConditionInput = {
  status?: ModelIntInput | null;
  title?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  url?: ModelStringInput | null;
  targetAt?: ModelStringInput | null;
  carryOver?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  updatedUser?: ModelStringInput | null;
  and?: Array<ModelTodoConditionInput | null> | null;
  or?: Array<ModelTodoConditionInput | null> | null;
  not?: ModelTodoConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Todo = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type UpdateTodoInput = {
  id: string;
  status?: number | null;
  title?: string | null;
  comment?: string | null;
  url?: string | null;
  targetAt?: string | null;
  carryOver?: boolean | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  updatedUser?: string | null;
};

export type DeleteTodoInput = {
  id: string;
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null;
  status?: ModelIntInput | null;
  title?: ModelStringInput | null;
  comment?: ModelStringInput | null;
  url?: ModelStringInput | null;
  targetAt?: ModelStringInput | null;
  carryOver?: ModelBooleanInput | null;
  createdAt?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  updatedUser?: ModelStringInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection";
  items?: Array<Todo | null> | null;
  nextToken?: string | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type CreateTodoMutation = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type UpdateTodoMutation = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type DeleteTodoMutation = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type GetTodoQuery = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type ListTodosQuery = {
  __typename: "ModelTodoConnection";
  items?: Array<{
    __typename: "Todo";
    id: string;
    status: number;
    title: string;
    comment: string;
    url: string;
    targetAt: string;
    carryOver: boolean;
    createdAt: string;
    updatedAt: string;
    updatedUser: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type ListSortedByTargetAtQuery = {
  __typename: "ModelTodoConnection";
  items?: Array<{
    __typename: "Todo";
    id: string;
    status: number;
    title: string;
    comment: string;
    url: string;
    targetAt: string;
    carryOver: boolean;
    createdAt: string;
    updatedAt: string;
    updatedUser: string;
    owner?: string | null;
  } | null> | null;
  nextToken?: string | null;
};

export type OnCreateTodoSubscription = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type OnUpdateTodoSubscription = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

export type OnDeleteTodoSubscription = {
  __typename: "Todo";
  id: string;
  status: number;
  title: string;
  comment: string;
  url: string;
  targetAt: string;
  carryOver: boolean;
  createdAt: string;
  updatedAt: string;
  updatedUser: string;
  owner?: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateTodo(
    input: CreateTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<CreateTodoMutation> {
    const statement = `mutation CreateTodo($input: CreateTodoInput!, $condition: ModelTodoConditionInput) {
        createTodo(input: $input, condition: $condition) {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateTodoMutation>response.data.createTodo;
  }
  async UpdateTodo(
    input: UpdateTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<UpdateTodoMutation> {
    const statement = `mutation UpdateTodo($input: UpdateTodoInput!, $condition: ModelTodoConditionInput) {
        updateTodo(input: $input, condition: $condition) {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateTodoMutation>response.data.updateTodo;
  }
  async DeleteTodo(
    input: DeleteTodoInput,
    condition?: ModelTodoConditionInput
  ): Promise<DeleteTodoMutation> {
    const statement = `mutation DeleteTodo($input: DeleteTodoInput!, $condition: ModelTodoConditionInput) {
        deleteTodo(input: $input, condition: $condition) {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteTodoMutation>response.data.deleteTodo;
  }
  async GetTodo(id: string): Promise<GetTodoQuery> {
    const statement = `query GetTodo($id: ID!) {
        getTodo(id: $id) {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetTodoQuery>response.data.getTodo;
  }
  async ListTodos(
    filter?: ModelTodoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListTodosQuery> {
    const statement = `query ListTodos($filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {
        listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            status
            title
            comment
            url
            targetAt
            carryOver
            createdAt
            updatedAt
            updatedUser
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListTodosQuery>response.data.listTodos;
  }
  async ListSortedByTargetAt(
    status?: number,
    targetAt?: ModelStringKeyConditionInput,
    sortDirection?: ModelSortDirection,
    filter?: ModelTodoFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSortedByTargetAtQuery> {
    const statement = `query ListSortedByTargetAt($status: Int, $targetAt: ModelStringKeyConditionInput, $sortDirection: ModelSortDirection, $filter: ModelTodoFilterInput, $limit: Int, $nextToken: String) {
        listSortedByTargetAt(status: $status, targetAt: $targetAt, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            status
            title
            comment
            url
            targetAt
            carryOver
            createdAt
            updatedAt
            updatedUser
            owner
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (status) {
      gqlAPIServiceArguments.status = status;
    }
    if (targetAt) {
      gqlAPIServiceArguments.targetAt = targetAt;
    }
    if (sortDirection) {
      gqlAPIServiceArguments.sortDirection = sortDirection;
    }
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListSortedByTargetAtQuery>response.data.listSortedByTargetAt;
  }
  OnCreateTodoListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTodo">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateTodo {
        onCreateTodo {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onCreateTodo">>
  >;

  OnUpdateTodoListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTodo">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateTodo {
        onUpdateTodo {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onUpdateTodo">>
  >;

  OnDeleteTodoListener: Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTodo">>
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteTodo {
        onDeleteTodo {
          __typename
          id
          status
          title
          comment
          url
          targetAt
          carryOver
          createdAt
          updatedAt
          updatedUser
          owner
        }
      }`
    )
  ) as Observable<
    SubscriptionResponse<Pick<__SubscriptionContainer, "onDeleteTodo">>
  >;
}
