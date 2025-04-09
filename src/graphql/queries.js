/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBiography = /* GraphQL */ `
  query GetBiography($id: ID!) {
    getBiography(id: $id) {
      id
      date
      cadence
      entry
      thoughts {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listBiographies = /* GraphQL */ `
  query ListBiographies(
    $filter: ModelBiographyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBiographies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        cadence
        entry
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBiographies = /* GraphQL */ `
  query SyncBiographies(
    $filter: ModelBiographyFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBiographies(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        cadence
        entry
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHealthReport = /* GraphQL */ `
  query GetHealthReport($id: ID!) {
    getHealthReport(id: $id) {
      id
      date
      cadence
      report
      thoughts {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listHealthReports = /* GraphQL */ `
  query ListHealthReports(
    $filter: ModelHealthReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHealthReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        cadence
        report
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHealthReports = /* GraphQL */ `
  query SyncHealthReports(
    $filter: ModelHealthReportFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHealthReports(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        cadence
        report
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getJournalEntry = /* GraphQL */ `
  query GetJournalEntry($id: ID!) {
    getJournalEntry(id: $id) {
      id
      date
      cadence
      entry
      thoughts {
        nextToken
        startedAt
        __typename
      }
      isLoading
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listJournalEntries = /* GraphQL */ `
  query ListJournalEntries(
    $filter: ModelJournalEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJournalEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        cadence
        entry
        isLoading
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncJournalEntries = /* GraphQL */ `
  query SyncJournalEntries(
    $filter: ModelJournalEntryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncJournalEntries(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        cadence
        entry
        isLoading
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      title
      content
      readDate
      type
      userID
      isUnread
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        content
        readDate
        type
        userID
        isUnread
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncNotifications = /* GraphQL */ `
  query SyncNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncNotifications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        content
        readDate
        type
        userID
        isUnread
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const notificationsByUserID = /* GraphQL */ `
  query NotificationsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    notificationsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        content
        readDate
        type
        userID
        isUnread
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getSubscriptionPlan = /* GraphQL */ `
  query GetSubscriptionPlan($id: ID!) {
    getSubscriptionPlan(id: $id) {
      id
      subscriptionTier
      status
      squareSubscriptionID
      owner
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listSubscriptionPlans = /* GraphQL */ `
  query ListSubscriptionPlans(
    $filter: ModelSubscriptionPlanFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSubscriptionPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        subscriptionTier
        status
        squareSubscriptionID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncSubscriptionPlans = /* GraphQL */ `
  query SyncSubscriptionPlans(
    $filter: ModelSubscriptionPlanFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSubscriptionPlans(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        subscriptionTier
        status
        squareSubscriptionID
        owner
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getThought = /* GraphQL */ `
  query GetThought($id: ID!) {
    getThought(id: $id) {
      id
      date
      input
      output
      extract
      journalEntries {
        nextToken
        startedAt
        __typename
      }
      healthReports {
        nextToken
        startedAt
        __typename
      }
      biographies {
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listThoughts = /* GraphQL */ `
  query ListThoughts(
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThoughts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        input
        output
        extract
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncThoughts = /* GraphQL */ `
  query SyncThoughts(
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        input
        output
        extract
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      phone
      Notifications {
        nextToken
        startedAt
        __typename
      }
      profileImage
      cognitoSub
      owner
      showOnboarding
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phone
        profileImage
        cognitoSub
        owner
        showOnboarding
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        firstName
        lastName
        email
        phone
        profileImage
        cognitoSub
        owner
        showOnboarding
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getBiographyThoughts = /* GraphQL */ `
  query GetBiographyThoughts($id: ID!) {
    getBiographyThoughts(id: $id) {
      id
      biographyId
      thoughtId
      biography {
        id
        date
        cadence
        entry
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      thought {
        id
        date
        input
        output
        extract
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listBiographyThoughts = /* GraphQL */ `
  query ListBiographyThoughts(
    $filter: ModelBiographyThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBiographyThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        biographyId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncBiographyThoughts = /* GraphQL */ `
  query SyncBiographyThoughts(
    $filter: ModelBiographyThoughtsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncBiographyThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        biographyId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const biographyThoughtsByBiographyId = /* GraphQL */ `
  query BiographyThoughtsByBiographyId(
    $biographyId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBiographyThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    biographyThoughtsByBiographyId(
      biographyId: $biographyId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        biographyId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const biographyThoughtsByThoughtId = /* GraphQL */ `
  query BiographyThoughtsByThoughtId(
    $thoughtId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelBiographyThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    biographyThoughtsByThoughtId(
      thoughtId: $thoughtId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        biographyId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getHealthReportThoughts = /* GraphQL */ `
  query GetHealthReportThoughts($id: ID!) {
    getHealthReportThoughts(id: $id) {
      id
      healthReportId
      thoughtId
      healthReport {
        id
        date
        cadence
        report
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      thought {
        id
        date
        input
        output
        extract
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listHealthReportThoughts = /* GraphQL */ `
  query ListHealthReportThoughts(
    $filter: ModelHealthReportThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHealthReportThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        healthReportId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncHealthReportThoughts = /* GraphQL */ `
  query SyncHealthReportThoughts(
    $filter: ModelHealthReportThoughtsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHealthReportThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        healthReportId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const healthReportThoughtsByHealthReportId = /* GraphQL */ `
  query HealthReportThoughtsByHealthReportId(
    $healthReportId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHealthReportThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    healthReportThoughtsByHealthReportId(
      healthReportId: $healthReportId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        healthReportId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const healthReportThoughtsByThoughtId = /* GraphQL */ `
  query HealthReportThoughtsByThoughtId(
    $thoughtId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelHealthReportThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    healthReportThoughtsByThoughtId(
      thoughtId: $thoughtId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        healthReportId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const getJournalEntryThoughts = /* GraphQL */ `
  query GetJournalEntryThoughts($id: ID!) {
    getJournalEntryThoughts(id: $id) {
      id
      journalEntryId
      thoughtId
      journalEntry {
        id
        date
        cadence
        entry
        isLoading
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      thought {
        id
        date
        input
        output
        extract
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
      __typename
    }
  }
`;
export const listJournalEntryThoughts = /* GraphQL */ `
  query ListJournalEntryThoughts(
    $filter: ModelJournalEntryThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJournalEntryThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        journalEntryId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const syncJournalEntryThoughts = /* GraphQL */ `
  query SyncJournalEntryThoughts(
    $filter: ModelJournalEntryThoughtsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncJournalEntryThoughts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        journalEntryId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const journalEntryThoughtsByJournalEntryId = /* GraphQL */ `
  query JournalEntryThoughtsByJournalEntryId(
    $journalEntryId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelJournalEntryThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    journalEntryThoughtsByJournalEntryId(
      journalEntryId: $journalEntryId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        journalEntryId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
export const journalEntryThoughtsByThoughtId = /* GraphQL */ `
  query JournalEntryThoughtsByThoughtId(
    $thoughtId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelJournalEntryThoughtsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    journalEntryThoughtsByThoughtId(
      thoughtId: $thoughtId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        journalEntryId
        thoughtId
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      nextToken
      startedAt
      __typename
    }
  }
`;
