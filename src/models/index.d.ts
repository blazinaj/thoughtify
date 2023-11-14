import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";

export enum NotificationType {
  MESSAGE = "MESSAGE"
}



type EagerThought = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Thought, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly input?: string | null;
  readonly output?: string | null;
  readonly extract?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyThought = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Thought, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly input?: string | null;
  readonly output?: string | null;
  readonly extract?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Thought = LazyLoading extends LazyLoadingDisabled ? EagerThought : LazyThought

export declare const Thought: (new (init: ModelInit<Thought>) => Thought) & {
  copyOf(source: Thought, mutator: (draft: MutableModel<Thought>) => MutableModel<Thought> | void): Thought;
}

type EagerNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly readDate?: string | null;
  readonly type?: NotificationType | keyof typeof NotificationType | null;
  readonly userID: string;
  readonly isUnread?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNotification = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Notification, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly readDate?: string | null;
  readonly type?: NotificationType | keyof typeof NotificationType | null;
  readonly userID: string;
  readonly isUnread?: boolean | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification

export declare const Notification: (new (init: ModelInit<Notification>) => Notification) & {
  copyOf(source: Notification, mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void): Notification;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly Notifications?: (Notification | null)[] | null;
  readonly profileImage?: string | null;
  readonly cognitoSub?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly Notifications: AsyncCollection<Notification>;
  readonly profileImage?: string | null;
  readonly cognitoSub?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}