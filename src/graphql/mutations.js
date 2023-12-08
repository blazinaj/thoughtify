/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBiography = /* GraphQL */ `
  mutation CreateBiography(
    $input: CreateBiographyInput!
    $condition: ModelBiographyConditionInput
  ) {
    createBiography(input: $input, condition: $condition) {
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
  }
`;
export const updateBiography = /* GraphQL */ `
  mutation UpdateBiography(
    $input: UpdateBiographyInput!
    $condition: ModelBiographyConditionInput
  ) {
    updateBiography(input: $input, condition: $condition) {
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
  }
`;
export const deleteBiography = /* GraphQL */ `
  mutation DeleteBiography(
    $input: DeleteBiographyInput!
    $condition: ModelBiographyConditionInput
  ) {
    deleteBiography(input: $input, condition: $condition) {
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
  }
`;
export const createHealthReport = /* GraphQL */ `
  mutation CreateHealthReport(
    $input: CreateHealthReportInput!
    $condition: ModelHealthReportConditionInput
  ) {
    createHealthReport(input: $input, condition: $condition) {
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
  }
`;
export const updateHealthReport = /* GraphQL */ `
  mutation UpdateHealthReport(
    $input: UpdateHealthReportInput!
    $condition: ModelHealthReportConditionInput
  ) {
    updateHealthReport(input: $input, condition: $condition) {
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
  }
`;
export const deleteHealthReport = /* GraphQL */ `
  mutation DeleteHealthReport(
    $input: DeleteHealthReportInput!
    $condition: ModelHealthReportConditionInput
  ) {
    deleteHealthReport(input: $input, condition: $condition) {
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
  }
`;
export const createJournalEntry = /* GraphQL */ `
  mutation CreateJournalEntry(
    $input: CreateJournalEntryInput!
    $condition: ModelJournalEntryConditionInput
  ) {
    createJournalEntry(input: $input, condition: $condition) {
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
export const updateJournalEntry = /* GraphQL */ `
  mutation UpdateJournalEntry(
    $input: UpdateJournalEntryInput!
    $condition: ModelJournalEntryConditionInput
  ) {
    updateJournalEntry(input: $input, condition: $condition) {
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
export const deleteJournalEntry = /* GraphQL */ `
  mutation DeleteJournalEntry(
    $input: DeleteJournalEntryInput!
    $condition: ModelJournalEntryConditionInput
  ) {
    deleteJournalEntry(input: $input, condition: $condition) {
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
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createSubscriptionPlan = /* GraphQL */ `
  mutation CreateSubscriptionPlan(
    $input: CreateSubscriptionPlanInput!
    $condition: ModelSubscriptionPlanConditionInput
  ) {
    createSubscriptionPlan(input: $input, condition: $condition) {
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
export const updateSubscriptionPlan = /* GraphQL */ `
  mutation UpdateSubscriptionPlan(
    $input: UpdateSubscriptionPlanInput!
    $condition: ModelSubscriptionPlanConditionInput
  ) {
    updateSubscriptionPlan(input: $input, condition: $condition) {
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
export const deleteSubscriptionPlan = /* GraphQL */ `
  mutation DeleteSubscriptionPlan(
    $input: DeleteSubscriptionPlanInput!
    $condition: ModelSubscriptionPlanConditionInput
  ) {
    deleteSubscriptionPlan(input: $input, condition: $condition) {
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
export const createThought = /* GraphQL */ `
  mutation CreateThought(
    $input: CreateThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    createThought(input: $input, condition: $condition) {
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
export const updateThought = /* GraphQL */ `
  mutation UpdateThought(
    $input: UpdateThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    updateThought(input: $input, condition: $condition) {
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
export const deleteThought = /* GraphQL */ `
  mutation DeleteThought(
    $input: DeleteThoughtInput!
    $condition: ModelThoughtConditionInput
  ) {
    deleteThought(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createJournalEntryThoughts = /* GraphQL */ `
  mutation CreateJournalEntryThoughts(
    $input: CreateJournalEntryThoughtsInput!
    $condition: ModelJournalEntryThoughtsConditionInput
  ) {
    createJournalEntryThoughts(input: $input, condition: $condition) {
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
export const updateJournalEntryThoughts = /* GraphQL */ `
  mutation UpdateJournalEntryThoughts(
    $input: UpdateJournalEntryThoughtsInput!
    $condition: ModelJournalEntryThoughtsConditionInput
  ) {
    updateJournalEntryThoughts(input: $input, condition: $condition) {
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
export const deleteJournalEntryThoughts = /* GraphQL */ `
  mutation DeleteJournalEntryThoughts(
    $input: DeleteJournalEntryThoughtsInput!
    $condition: ModelJournalEntryThoughtsConditionInput
  ) {
    deleteJournalEntryThoughts(input: $input, condition: $condition) {
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
