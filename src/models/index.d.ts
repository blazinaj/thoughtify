import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum JournalCadence {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY"
}

export enum NotificationType {
  MESSAGE = "MESSAGE"
}

export enum PrinterStatus {
  IDLE = "IDLE",
  OFFLINE = "OFFLINE",
  PRINTING = "PRINTING",
  PAUSED = "PAUSED",
  ERROR = "ERROR",
  UPDATING = "UPDATING"
}

export enum PrintStatus {
  PREPARING = "PREPARING",
  PRINTING = "PRINTING",
  PAUSED = "PAUSED",
  CANCELLED = "CANCELLED",
  ERROR = "ERROR",
  FINISHED = "FINISHED"
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE"
}

export enum SubscriptionTier {
  FREE = "FREE",
  PREMIUM = "PREMIUM"
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
}

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
}

export declare type Biography = LazyLoading extends LazyLoadingDisabled ? EagerBiography : LazyBiography

export declare const Biography: (new (init: ModelInit<Biography>) => Biography) & {
  copyOf(source: Biography, mutator: (draft: MutableModel<Biography>) => MutableModel<Biography> | void): Biography;
}

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
}

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
}

export declare type HealthReport = LazyLoading extends LazyLoadingDisabled ? EagerHealthReport : LazyHealthReport

export declare const HealthReport: (new (init: ModelInit<HealthReport>) => HealthReport) & {
  copyOf(source: HealthReport, mutator: (draft: MutableModel<HealthReport>) => MutableModel<HealthReport> | void): HealthReport;
}

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
}

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
}

export declare type JournalEntry = LazyLoading extends LazyLoadingDisabled ? EagerJournalEntry : LazyJournalEntry

export declare const JournalEntry: (new (init: ModelInit<JournalEntry>) => JournalEntry) & {
  copyOf(source: JournalEntry, mutator: (draft: MutableModel<JournalEntry>) => MutableModel<JournalEntry> | void): JournalEntry;
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

type EagerPrinter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Printer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly model?: string | null;
  readonly serialNumber?: string | null;
  readonly purchaseDate?: string | null;
  readonly purchasePrice?: number | null;
  readonly purchaseCurrency?: string | null;
  readonly purchaseLocation?: string | null;
  readonly purchaseLink?: string | null;
  readonly purchaseNotes?: string | null;
  readonly prints?: (Print | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrinter = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Printer, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly model?: string | null;
  readonly serialNumber?: string | null;
  readonly purchaseDate?: string | null;
  readonly purchasePrice?: number | null;
  readonly purchaseCurrency?: string | null;
  readonly purchaseLocation?: string | null;
  readonly purchaseLink?: string | null;
  readonly purchaseNotes?: string | null;
  readonly prints: AsyncCollection<Print>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Printer = LazyLoading extends LazyLoadingDisabled ? EagerPrinter : LazyPrinter

export declare const Printer: (new (init: ModelInit<Printer>) => Printer) & {
  copyOf(source: Printer, mutator: (draft: MutableModel<Printer>) => MutableModel<Printer> | void): Printer;
}

type EagerPrintModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PrintModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly modelLink?: string | null;
  readonly modelNotes?: string | null;
  readonly prints?: (Print | null)[] | null;
  readonly estimatedPrintTime?: number | null;
  readonly estimatedVolume?: number | null;
  readonly estimatedCost?: number | null;
  readonly estimatedWeight?: number | null;
  readonly printSizeX?: number | null;
  readonly printSizeY?: number | null;
  readonly printSizeZ?: number | null;
  readonly filamentType?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrintModel = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PrintModel, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly modelLink?: string | null;
  readonly modelNotes?: string | null;
  readonly prints: AsyncCollection<Print>;
  readonly estimatedPrintTime?: number | null;
  readonly estimatedVolume?: number | null;
  readonly estimatedCost?: number | null;
  readonly estimatedWeight?: number | null;
  readonly printSizeX?: number | null;
  readonly printSizeY?: number | null;
  readonly printSizeZ?: number | null;
  readonly filamentType?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PrintModel = LazyLoading extends LazyLoadingDisabled ? EagerPrintModel : LazyPrintModel

export declare const PrintModel: (new (init: ModelInit<PrintModel>) => PrintModel) & {
  copyOf(source: PrintModel, mutator: (draft: MutableModel<PrintModel>) => MutableModel<PrintModel> | void): PrintModel;
}

type EagerPrint = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Print, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly model?: PrintModel | null;
  readonly printer?: Printer | null;
  readonly printDateTime?: string | null;
  readonly printCost?: number | null;
  readonly printCostCurrency?: string | null;
  readonly printCostNotes?: string | null;
  readonly printNotes?: string | null;
  readonly printPhotos?: (string | null)[] | null;
  readonly filament?: Filament | null;
  readonly status?: PrintStatus | keyof typeof PrintStatus | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly printerPrintsId?: string | null;
  readonly printModelPrintsId?: string | null;
  readonly filamentPrintsId?: string | null;
}

type LazyPrint = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Print, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly model: AsyncItem<PrintModel | undefined>;
  readonly printer: AsyncItem<Printer | undefined>;
  readonly printDateTime?: string | null;
  readonly printCost?: number | null;
  readonly printCostCurrency?: string | null;
  readonly printCostNotes?: string | null;
  readonly printNotes?: string | null;
  readonly printPhotos?: (string | null)[] | null;
  readonly filament: AsyncItem<Filament | undefined>;
  readonly status?: PrintStatus | keyof typeof PrintStatus | null;
  readonly startTime?: string | null;
  readonly endTime?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly printerPrintsId?: string | null;
  readonly printModelPrintsId?: string | null;
  readonly filamentPrintsId?: string | null;
}

export declare type Print = LazyLoading extends LazyLoadingDisabled ? EagerPrint : LazyPrint

export declare const Print: (new (init: ModelInit<Print>) => Print) & {
  copyOf(source: Print, mutator: (draft: MutableModel<Print>) => MutableModel<Print> | void): Print;
}

type EagerFilament = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Filament, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly color?: string | null;
  readonly weight?: number | null;
  readonly weightUnit?: string | null;
  readonly cost?: number | null;
  readonly costCurrency?: string | null;
  readonly costPerWeight?: number | null;
  readonly costPerWeightCurrency?: string | null;
  readonly costNotes?: string | null;
  readonly purchaseDate?: string | null;
  readonly purchasePrice?: number | null;
  readonly purchaseCurrency?: string | null;
  readonly purchaseLocation?: string | null;
  readonly purchaseLink?: string | null;
  readonly purchaseNotes?: string | null;
  readonly prints?: (Print | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFilament = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Filament, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly color?: string | null;
  readonly weight?: number | null;
  readonly weightUnit?: string | null;
  readonly cost?: number | null;
  readonly costCurrency?: string | null;
  readonly costPerWeight?: number | null;
  readonly costPerWeightCurrency?: string | null;
  readonly costNotes?: string | null;
  readonly purchaseDate?: string | null;
  readonly purchasePrice?: number | null;
  readonly purchaseCurrency?: string | null;
  readonly purchaseLocation?: string | null;
  readonly purchaseLink?: string | null;
  readonly purchaseNotes?: string | null;
  readonly prints: AsyncCollection<Print>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Filament = LazyLoading extends LazyLoadingDisabled ? EagerFilament : LazyFilament

export declare const Filament: (new (init: ModelInit<Filament>) => Filament) & {
  copyOf(source: Filament, mutator: (draft: MutableModel<Filament>) => MutableModel<Filament> | void): Filament;
}

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
}

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
}

export declare type SubscriptionPlan = LazyLoading extends LazyLoadingDisabled ? EagerSubscriptionPlan : LazySubscriptionPlan

export declare const SubscriptionPlan: (new (init: ModelInit<SubscriptionPlan>) => SubscriptionPlan) & {
  copyOf(source: SubscriptionPlan, mutator: (draft: MutableModel<SubscriptionPlan>) => MutableModel<SubscriptionPlan> | void): SubscriptionPlan;
}

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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Thought = LazyLoading extends LazyLoadingDisabled ? EagerThought : LazyThought

export declare const Thought: (new (init: ModelInit<Thought>) => Thought) & {
  copyOf(source: Thought, mutator: (draft: MutableModel<Thought>) => MutableModel<Thought> | void): Thought;
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
  readonly showOnboarding?: boolean | null;
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
  readonly showOnboarding?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

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
}

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
}

export declare type BiographyThoughts = LazyLoading extends LazyLoadingDisabled ? EagerBiographyThoughts : LazyBiographyThoughts

export declare const BiographyThoughts: (new (init: ModelInit<BiographyThoughts>) => BiographyThoughts) & {
  copyOf(source: BiographyThoughts, mutator: (draft: MutableModel<BiographyThoughts>) => MutableModel<BiographyThoughts> | void): BiographyThoughts;
}

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
}

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
}

export declare type HealthReportThoughts = LazyLoading extends LazyLoadingDisabled ? EagerHealthReportThoughts : LazyHealthReportThoughts

export declare const HealthReportThoughts: (new (init: ModelInit<HealthReportThoughts>) => HealthReportThoughts) & {
  copyOf(source: HealthReportThoughts, mutator: (draft: MutableModel<HealthReportThoughts>) => MutableModel<HealthReportThoughts> | void): HealthReportThoughts;
}

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
}

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
}

export declare type JournalEntryThoughts = LazyLoading extends LazyLoadingDisabled ? EagerJournalEntryThoughts : LazyJournalEntryThoughts

export declare const JournalEntryThoughts: (new (init: ModelInit<JournalEntryThoughts>) => JournalEntryThoughts) & {
  copyOf(source: JournalEntryThoughts, mutator: (draft: MutableModel<JournalEntryThoughts>) => MutableModel<JournalEntryThoughts> | void): JournalEntryThoughts;
}