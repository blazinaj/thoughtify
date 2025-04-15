import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from '@aws-amplify/datastore';
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from '@aws-amplify/datastore';

export enum JournalCadence {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY'
}

export enum NotificationType {
  MESSAGE = 'MESSAGE'
}

export enum ProjectStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum SubscriptionTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

export enum TaskStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

export enum ThoughtAttributes {
  OVERALL_TONE = 'overallTone',
  PEOPLE = 'people',
  PROJECTS = 'projects',
  CATEGORIES = 'categories',
  EMOTIONS = 'emotions',
  REMINDERS = 'reminders',
  QUESTIONS = 'questions',
  PLACES = 'places',
  EVENTS = 'events'
}

export enum WritingStyle {
  SIMPLE = 'SIMPLE',
  FUNNY = 'FUNNY',
  DETAILED = 'DETAILED',
  ENGINEERING = 'ENGINEERING',
  POETIC = 'POETIC',
  NARRATIVE = 'NARRATIVE',
  REFLECTIVE = 'REFLECTIVE',
  WHIMSICAL = 'WHIMSICAL',
  SPIRITUAL = 'SPIRITUAL',
  MOTIVATIONAL = 'MOTIVATIONAL'
}

export enum WritingBrevity {
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
  LONG = 'LONG'
}

type EagerBiography = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Biography, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly cadence?: JournalCadence | keyof typeof JournalCadence | null;
  readonly entry?: string | null;
  readonly thoughts?: (BiographyThoughts | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyBiography = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Biography, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly cadence?: JournalCadence | keyof typeof JournalCadence | null;
  readonly entry?: string | null;
  readonly thoughts: AsyncCollection<BiographyThoughts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Biography = LazyLoading extends LazyLoadingDisabled ? EagerBiography : LazyBiography;

export declare const Biography: (new (init: ModelInit<Biography>) => Biography) & {
  copyOf(source: Biography, mutator: (draft: MutableModel<Biography>) => MutableModel<Biography> | void): Biography;
};

type EagerHealthReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HealthReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly cadence?: JournalCadence | keyof typeof JournalCadence | null;
  readonly report?: string | null;
  readonly thoughts?: (HealthReportThoughts | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyHealthReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HealthReport, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly cadence?: JournalCadence | keyof typeof JournalCadence | null;
  readonly report?: string | null;
  readonly thoughts: AsyncCollection<HealthReportThoughts>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type HealthReport = LazyLoading extends LazyLoadingDisabled ? EagerHealthReport : LazyHealthReport;

export declare const HealthReport: (new (init: ModelInit<HealthReport>) => HealthReport) & {
  copyOf(
    source: HealthReport,
    mutator: (draft: MutableModel<HealthReport>) => MutableModel<HealthReport> | void
  ): HealthReport;
};

type EagerJournalEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JournalEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly cadence?: JournalCadence | keyof typeof JournalCadence | null;
  readonly entry?: string | null;
  readonly thoughts?: (JournalEntryThoughts | null)[] | null;
  readonly isLoading?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyJournalEntry = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JournalEntry, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly cadence?: JournalCadence | keyof typeof JournalCadence | null;
  readonly entry?: string | null;
  readonly thoughts: AsyncCollection<JournalEntryThoughts>;
  readonly isLoading?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type JournalEntry = LazyLoading extends LazyLoadingDisabled ? EagerJournalEntry : LazyJournalEntry;

export declare const JournalEntry: (new (init: ModelInit<JournalEntry>) => JournalEntry) & {
  copyOf(
    source: JournalEntry,
    mutator: (draft: MutableModel<JournalEntry>) => MutableModel<JournalEntry> | void
  ): JournalEntry;
};

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
};

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
};

export declare type Notification = LazyLoading extends LazyLoadingDisabled ? EagerNotification : LazyNotification;

export declare const Notification: (new (init: ModelInit<Notification>) => Notification) & {
  copyOf(
    source: Notification,
    mutator: (draft: MutableModel<Notification>) => MutableModel<Notification> | void
  ): Notification;
};

type EagerProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly name: string;
  readonly description?: string | null;
  readonly status?: ProjectStatus | keyof typeof ProjectStatus | null;
  readonly thoughts?: (ProjectThoughts | null)[] | null;
  readonly tasks?: (ProjectTasks | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyProject = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Project, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly name: string;
  readonly description?: string | null;
  readonly status?: ProjectStatus | keyof typeof ProjectStatus | null;
  readonly thoughts: AsyncCollection<ProjectThoughts>;
  readonly tasks: AsyncCollection<ProjectTasks>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Project = LazyLoading extends LazyLoadingDisabled ? EagerProject : LazyProject;

export declare const Project: (new (init: ModelInit<Project>) => Project) & {
  copyOf(source: Project, mutator: (draft: MutableModel<Project>) => MutableModel<Project> | void): Project;
};

type EagerSubscriptionPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubscriptionPlan, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subscriptionTier?: SubscriptionTier | keyof typeof SubscriptionTier | null;
  readonly status?: SubscriptionStatus | keyof typeof SubscriptionStatus | null;
  readonly squareSubscriptionID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazySubscriptionPlan = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubscriptionPlan, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subscriptionTier?: SubscriptionTier | keyof typeof SubscriptionTier | null;
  readonly status?: SubscriptionStatus | keyof typeof SubscriptionStatus | null;
  readonly squareSubscriptionID?: string | null;
  readonly owner?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type SubscriptionPlan = LazyLoading extends LazyLoadingDisabled
  ? EagerSubscriptionPlan
  : LazySubscriptionPlan;

export declare const SubscriptionPlan: (new (init: ModelInit<SubscriptionPlan>) => SubscriptionPlan) & {
  copyOf(
    source: SubscriptionPlan,
    mutator: (draft: MutableModel<SubscriptionPlan>) => MutableModel<SubscriptionPlan> | void
  ): SubscriptionPlan;
};

type EagerTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly name: string;
  readonly description?: string | null;
  readonly status?: TaskStatus | keyof typeof TaskStatus | null;
  readonly thoughts?: (TaskThoughts | null)[] | null;
  readonly projects?: (ProjectTasks | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyTask = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Task, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly name: string;
  readonly description?: string | null;
  readonly status?: TaskStatus | keyof typeof TaskStatus | null;
  readonly thoughts: AsyncCollection<TaskThoughts>;
  readonly projects: AsyncCollection<ProjectTasks>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Task = LazyLoading extends LazyLoadingDisabled ? EagerTask : LazyTask;

export declare const Task: (new (init: ModelInit<Task>) => Task) & {
  copyOf(source: Task, mutator: (draft: MutableModel<Task>) => MutableModel<Task> | void): Task;
};

type EagerThought = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Thought, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly input?: string | null;
  readonly output?: string | null;
  readonly extract?: string | null;
  readonly journalEntries?: (JournalEntryThoughts | null)[] | null;
  readonly healthReports?: (HealthReportThoughts | null)[] | null;
  readonly biographies?: (BiographyThoughts | null)[] | null;
  readonly relatedProjects?: (ProjectThoughts | null)[] | null;
  readonly tasks?: (TaskThoughts | null)[] | null;
  readonly overallTone?: string | null;
  readonly people?: (string | null)[] | null;
  readonly projects?: (string | null)[] | null;
  readonly categories?: (string | null)[] | null;
  readonly emotions?: (string | null)[] | null;
  readonly reminders?: (string | null)[] | null;
  readonly questions?: (string | null)[] | null;
  readonly places?: (string | null)[] | null;
  readonly events?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyThought = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Thought, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly date?: string | null;
  readonly input?: string | null;
  readonly output?: string | null;
  readonly extract?: string | null;
  readonly journalEntries: AsyncCollection<JournalEntryThoughts>;
  readonly healthReports: AsyncCollection<HealthReportThoughts>;
  readonly biographies: AsyncCollection<BiographyThoughts>;
  readonly relatedProjects: AsyncCollection<ProjectThoughts>;
  readonly tasks: AsyncCollection<TaskThoughts>;
  readonly overallTone?: string | null;
  readonly people?: (string | null)[] | null;
  readonly projects?: (string | null)[] | null;
  readonly categories?: (string | null)[] | null;
  readonly emotions?: (string | null)[] | null;
  readonly reminders?: (string | null)[] | null;
  readonly questions?: (string | null)[] | null;
  readonly places?: (string | null)[] | null;
  readonly events?: (string | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type Thought = LazyLoading extends LazyLoadingDisabled ? EagerThought : LazyThought;

export declare const Thought: (new (init: ModelInit<Thought>) => Thought) & {
  copyOf(source: Thought, mutator: (draft: MutableModel<Thought>) => MutableModel<Thought> | void): Thought;
};

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
  readonly showOnboarding?: boolean | null;
  readonly hometown?: string | null;
  readonly hobbies?: (string | null)[] | null;
  readonly journalStyle?: WritingStyle | keyof typeof WritingStyle | null;
  readonly journalBrevity?: WritingBrevity | keyof typeof WritingBrevity | null;
  readonly biographyStyle?: WritingStyle | keyof typeof WritingStyle | null;
  readonly biographyBrevity?: WritingBrevity | keyof typeof WritingBrevity | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

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
  readonly showOnboarding?: boolean | null;
  readonly hometown?: string | null;
  readonly hobbies?: (string | null)[] | null;
  readonly journalStyle?: WritingStyle | keyof typeof WritingStyle | null;
  readonly journalBrevity?: WritingBrevity | keyof typeof WritingBrevity | null;
  readonly biographyStyle?: WritingStyle | keyof typeof WritingStyle | null;
  readonly biographyBrevity?: WritingBrevity | keyof typeof WritingBrevity | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser;

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
};

type EagerBiographyThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BiographyThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly biographyId?: string | null;
  readonly thoughtId?: string | null;
  readonly biography: Biography;
  readonly thought: Thought;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyBiographyThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BiographyThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly biographyId?: string | null;
  readonly thoughtId?: string | null;
  readonly biography: AsyncItem<Biography>;
  readonly thought: AsyncItem<Thought>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type BiographyThoughts = LazyLoading extends LazyLoadingDisabled
  ? EagerBiographyThoughts
  : LazyBiographyThoughts;

export declare const BiographyThoughts: (new (init: ModelInit<BiographyThoughts>) => BiographyThoughts) & {
  copyOf(
    source: BiographyThoughts,
    mutator: (draft: MutableModel<BiographyThoughts>) => MutableModel<BiographyThoughts> | void
  ): BiographyThoughts;
};

type EagerHealthReportThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HealthReportThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly healthReportId?: string | null;
  readonly thoughtId?: string | null;
  readonly healthReport: HealthReport;
  readonly thought: Thought;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyHealthReportThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<HealthReportThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly healthReportId?: string | null;
  readonly thoughtId?: string | null;
  readonly healthReport: AsyncItem<HealthReport>;
  readonly thought: AsyncItem<Thought>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type HealthReportThoughts = LazyLoading extends LazyLoadingDisabled
  ? EagerHealthReportThoughts
  : LazyHealthReportThoughts;

export declare const HealthReportThoughts: (new (init: ModelInit<HealthReportThoughts>) => HealthReportThoughts) & {
  copyOf(
    source: HealthReportThoughts,
    mutator: (draft: MutableModel<HealthReportThoughts>) => MutableModel<HealthReportThoughts> | void
  ): HealthReportThoughts;
};

type EagerJournalEntryThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JournalEntryThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly journalEntryId?: string | null;
  readonly thoughtId?: string | null;
  readonly journalEntry: JournalEntry;
  readonly thought: Thought;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyJournalEntryThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<JournalEntryThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly journalEntryId?: string | null;
  readonly thoughtId?: string | null;
  readonly journalEntry: AsyncItem<JournalEntry>;
  readonly thought: AsyncItem<Thought>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type JournalEntryThoughts = LazyLoading extends LazyLoadingDisabled
  ? EagerJournalEntryThoughts
  : LazyJournalEntryThoughts;

export declare const JournalEntryThoughts: (new (init: ModelInit<JournalEntryThoughts>) => JournalEntryThoughts) & {
  copyOf(
    source: JournalEntryThoughts,
    mutator: (draft: MutableModel<JournalEntryThoughts>) => MutableModel<JournalEntryThoughts> | void
  ): JournalEntryThoughts;
};

type EagerProjectThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProjectThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly projectId?: string | null;
  readonly thoughtId?: string | null;
  readonly project: Project;
  readonly thought: Thought;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyProjectThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProjectThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly projectId?: string | null;
  readonly thoughtId?: string | null;
  readonly project: AsyncItem<Project>;
  readonly thought: AsyncItem<Thought>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type ProjectThoughts = LazyLoading extends LazyLoadingDisabled
  ? EagerProjectThoughts
  : LazyProjectThoughts;

export declare const ProjectThoughts: (new (init: ModelInit<ProjectThoughts>) => ProjectThoughts) & {
  copyOf(
    source: ProjectThoughts,
    mutator: (draft: MutableModel<ProjectThoughts>) => MutableModel<ProjectThoughts> | void
  ): ProjectThoughts;
};

type EagerProjectTasks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProjectTasks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly projectId?: string | null;
  readonly taskId?: string | null;
  readonly project: Project;
  readonly task: Task;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyProjectTasks = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProjectTasks, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly projectId?: string | null;
  readonly taskId?: string | null;
  readonly project: AsyncItem<Project>;
  readonly task: AsyncItem<Task>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type ProjectTasks = LazyLoading extends LazyLoadingDisabled ? EagerProjectTasks : LazyProjectTasks;

export declare const ProjectTasks: (new (init: ModelInit<ProjectTasks>) => ProjectTasks) & {
  copyOf(
    source: ProjectTasks,
    mutator: (draft: MutableModel<ProjectTasks>) => MutableModel<ProjectTasks> | void
  ): ProjectTasks;
};

type EagerTaskThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TaskThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly taskId?: string | null;
  readonly thoughtId?: string | null;
  readonly task: Task;
  readonly thought: Thought;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

type LazyTaskThoughts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<TaskThoughts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly taskId?: string | null;
  readonly thoughtId?: string | null;
  readonly task: AsyncItem<Task>;
  readonly thought: AsyncItem<Thought>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
};

export declare type TaskThoughts = LazyLoading extends LazyLoadingDisabled ? EagerTaskThoughts : LazyTaskThoughts;

export declare const TaskThoughts: (new (init: ModelInit<TaskThoughts>) => TaskThoughts) & {
  copyOf(
    source: TaskThoughts,
    mutator: (draft: MutableModel<TaskThoughts>) => MutableModel<TaskThoughts> | void
  ): TaskThoughts;
};
