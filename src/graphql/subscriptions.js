/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateBiography = /* GraphQL */ `
  subscription OnCreateBiography(
    $filter: ModelSubscriptionBiographyFilterInput
    $owner: String
  ) {
    onCreateBiography(filter: $filter, owner: $owner) {
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
export const onUpdateBiography = /* GraphQL */ `
  subscription OnUpdateBiography(
    $filter: ModelSubscriptionBiographyFilterInput
    $owner: String
  ) {
    onUpdateBiography(filter: $filter, owner: $owner) {
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
export const onDeleteBiography = /* GraphQL */ `
  subscription OnDeleteBiography(
    $filter: ModelSubscriptionBiographyFilterInput
    $owner: String
  ) {
    onDeleteBiography(filter: $filter, owner: $owner) {
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
export const onCreateHealthReport = /* GraphQL */ `
  subscription OnCreateHealthReport(
    $filter: ModelSubscriptionHealthReportFilterInput
    $owner: String
  ) {
    onCreateHealthReport(filter: $filter, owner: $owner) {
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
export const onUpdateHealthReport = /* GraphQL */ `
  subscription OnUpdateHealthReport(
    $filter: ModelSubscriptionHealthReportFilterInput
    $owner: String
  ) {
    onUpdateHealthReport(filter: $filter, owner: $owner) {
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
export const onDeleteHealthReport = /* GraphQL */ `
  subscription OnDeleteHealthReport(
    $filter: ModelSubscriptionHealthReportFilterInput
    $owner: String
  ) {
    onDeleteHealthReport(filter: $filter, owner: $owner) {
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
export const onCreateJournalEntry = /* GraphQL */ `
  subscription OnCreateJournalEntry(
    $filter: ModelSubscriptionJournalEntryFilterInput
    $owner: String
  ) {
    onCreateJournalEntry(filter: $filter, owner: $owner) {
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
export const onUpdateJournalEntry = /* GraphQL */ `
  subscription OnUpdateJournalEntry(
    $filter: ModelSubscriptionJournalEntryFilterInput
    $owner: String
  ) {
    onUpdateJournalEntry(filter: $filter, owner: $owner) {
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
export const onDeleteJournalEntry = /* GraphQL */ `
  subscription OnDeleteJournalEntry(
    $filter: ModelSubscriptionJournalEntryFilterInput
    $owner: String
  ) {
    onDeleteJournalEntry(filter: $filter, owner: $owner) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onCreateNotification(filter: $filter, owner: $owner) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onUpdateNotification(filter: $filter, owner: $owner) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
    $owner: String
  ) {
    onDeleteNotification(filter: $filter, owner: $owner) {
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
export const onCreatePrinter = /* GraphQL */ `
  subscription OnCreatePrinter(
    $filter: ModelSubscriptionPrinterFilterInput
    $owner: String
  ) {
    onCreatePrinter(filter: $filter, owner: $owner) {
      id
      name
      model
      serialNumber
      purchaseDate
      purchasePrice
      purchaseCurrency
      purchaseLocation
      purchaseLink
      purchaseNotes
      prints {
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
export const onUpdatePrinter = /* GraphQL */ `
  subscription OnUpdatePrinter(
    $filter: ModelSubscriptionPrinterFilterInput
    $owner: String
  ) {
    onUpdatePrinter(filter: $filter, owner: $owner) {
      id
      name
      model
      serialNumber
      purchaseDate
      purchasePrice
      purchaseCurrency
      purchaseLocation
      purchaseLink
      purchaseNotes
      prints {
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
export const onDeletePrinter = /* GraphQL */ `
  subscription OnDeletePrinter(
    $filter: ModelSubscriptionPrinterFilterInput
    $owner: String
  ) {
    onDeletePrinter(filter: $filter, owner: $owner) {
      id
      name
      model
      serialNumber
      purchaseDate
      purchasePrice
      purchaseCurrency
      purchaseLocation
      purchaseLink
      purchaseNotes
      prints {
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
export const onCreatePrintModel = /* GraphQL */ `
  subscription OnCreatePrintModel(
    $filter: ModelSubscriptionPrintModelFilterInput
    $owner: String
  ) {
    onCreatePrintModel(filter: $filter, owner: $owner) {
      id
      name
      description
      modelLink
      modelNotes
      prints {
        nextToken
        startedAt
        __typename
      }
      estimatedPrintTime
      estimatedVolume
      estimatedCost
      estimatedWeight
      printSizeX
      printSizeY
      printSizeZ
      filamentType
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
export const onUpdatePrintModel = /* GraphQL */ `
  subscription OnUpdatePrintModel(
    $filter: ModelSubscriptionPrintModelFilterInput
    $owner: String
  ) {
    onUpdatePrintModel(filter: $filter, owner: $owner) {
      id
      name
      description
      modelLink
      modelNotes
      prints {
        nextToken
        startedAt
        __typename
      }
      estimatedPrintTime
      estimatedVolume
      estimatedCost
      estimatedWeight
      printSizeX
      printSizeY
      printSizeZ
      filamentType
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
export const onDeletePrintModel = /* GraphQL */ `
  subscription OnDeletePrintModel(
    $filter: ModelSubscriptionPrintModelFilterInput
    $owner: String
  ) {
    onDeletePrintModel(filter: $filter, owner: $owner) {
      id
      name
      description
      modelLink
      modelNotes
      prints {
        nextToken
        startedAt
        __typename
      }
      estimatedPrintTime
      estimatedVolume
      estimatedCost
      estimatedWeight
      printSizeX
      printSizeY
      printSizeZ
      filamentType
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
export const onCreatePrint = /* GraphQL */ `
  subscription OnCreatePrint(
    $filter: ModelSubscriptionPrintFilterInput
    $owner: String
  ) {
    onCreatePrint(filter: $filter, owner: $owner) {
      id
      name
      description
      model {
        id
        name
        description
        modelLink
        modelNotes
        estimatedPrintTime
        estimatedVolume
        estimatedCost
        estimatedWeight
        printSizeX
        printSizeY
        printSizeZ
        filamentType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      printer {
        id
        name
        model
        serialNumber
        purchaseDate
        purchasePrice
        purchaseCurrency
        purchaseLocation
        purchaseLink
        purchaseNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      printDateTime
      printCost
      printCostCurrency
      printCostNotes
      printNotes
      printPhotos
      filament {
        id
        name
        description
        color
        weight
        weightUnit
        cost
        costCurrency
        costPerWeight
        costPerWeightCurrency
        costNotes
        purchaseDate
        purchasePrice
        purchaseCurrency
        purchaseLocation
        purchaseLink
        purchaseNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      status
      startTime
      endTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      printerPrintsId
      printModelPrintsId
      filamentPrintsId
      owner
      __typename
    }
  }
`;
export const onUpdatePrint = /* GraphQL */ `
  subscription OnUpdatePrint(
    $filter: ModelSubscriptionPrintFilterInput
    $owner: String
  ) {
    onUpdatePrint(filter: $filter, owner: $owner) {
      id
      name
      description
      model {
        id
        name
        description
        modelLink
        modelNotes
        estimatedPrintTime
        estimatedVolume
        estimatedCost
        estimatedWeight
        printSizeX
        printSizeY
        printSizeZ
        filamentType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      printer {
        id
        name
        model
        serialNumber
        purchaseDate
        purchasePrice
        purchaseCurrency
        purchaseLocation
        purchaseLink
        purchaseNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      printDateTime
      printCost
      printCostCurrency
      printCostNotes
      printNotes
      printPhotos
      filament {
        id
        name
        description
        color
        weight
        weightUnit
        cost
        costCurrency
        costPerWeight
        costPerWeightCurrency
        costNotes
        purchaseDate
        purchasePrice
        purchaseCurrency
        purchaseLocation
        purchaseLink
        purchaseNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      status
      startTime
      endTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      printerPrintsId
      printModelPrintsId
      filamentPrintsId
      owner
      __typename
    }
  }
`;
export const onDeletePrint = /* GraphQL */ `
  subscription OnDeletePrint(
    $filter: ModelSubscriptionPrintFilterInput
    $owner: String
  ) {
    onDeletePrint(filter: $filter, owner: $owner) {
      id
      name
      description
      model {
        id
        name
        description
        modelLink
        modelNotes
        estimatedPrintTime
        estimatedVolume
        estimatedCost
        estimatedWeight
        printSizeX
        printSizeY
        printSizeZ
        filamentType
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      printer {
        id
        name
        model
        serialNumber
        purchaseDate
        purchasePrice
        purchaseCurrency
        purchaseLocation
        purchaseLink
        purchaseNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      printDateTime
      printCost
      printCostCurrency
      printCostNotes
      printNotes
      printPhotos
      filament {
        id
        name
        description
        color
        weight
        weightUnit
        cost
        costCurrency
        costPerWeight
        costPerWeightCurrency
        costNotes
        purchaseDate
        purchasePrice
        purchaseCurrency
        purchaseLocation
        purchaseLink
        purchaseNotes
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
        __typename
      }
      status
      startTime
      endTime
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      printerPrintsId
      printModelPrintsId
      filamentPrintsId
      owner
      __typename
    }
  }
`;
export const onCreateFilament = /* GraphQL */ `
  subscription OnCreateFilament(
    $filter: ModelSubscriptionFilamentFilterInput
    $owner: String
  ) {
    onCreateFilament(filter: $filter, owner: $owner) {
      id
      name
      description
      color
      weight
      weightUnit
      cost
      costCurrency
      costPerWeight
      costPerWeightCurrency
      costNotes
      purchaseDate
      purchasePrice
      purchaseCurrency
      purchaseLocation
      purchaseLink
      purchaseNotes
      prints {
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
export const onUpdateFilament = /* GraphQL */ `
  subscription OnUpdateFilament(
    $filter: ModelSubscriptionFilamentFilterInput
    $owner: String
  ) {
    onUpdateFilament(filter: $filter, owner: $owner) {
      id
      name
      description
      color
      weight
      weightUnit
      cost
      costCurrency
      costPerWeight
      costPerWeightCurrency
      costNotes
      purchaseDate
      purchasePrice
      purchaseCurrency
      purchaseLocation
      purchaseLink
      purchaseNotes
      prints {
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
export const onDeleteFilament = /* GraphQL */ `
  subscription OnDeleteFilament(
    $filter: ModelSubscriptionFilamentFilterInput
    $owner: String
  ) {
    onDeleteFilament(filter: $filter, owner: $owner) {
      id
      name
      description
      color
      weight
      weightUnit
      cost
      costCurrency
      costPerWeight
      costPerWeightCurrency
      costNotes
      purchaseDate
      purchasePrice
      purchaseCurrency
      purchaseLocation
      purchaseLink
      purchaseNotes
      prints {
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
export const onCreateSubscriptionPlan = /* GraphQL */ `
  subscription OnCreateSubscriptionPlan(
    $filter: ModelSubscriptionSubscriptionPlanFilterInput
    $owner: String
  ) {
    onCreateSubscriptionPlan(filter: $filter, owner: $owner) {
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
export const onUpdateSubscriptionPlan = /* GraphQL */ `
  subscription OnUpdateSubscriptionPlan(
    $filter: ModelSubscriptionSubscriptionPlanFilterInput
    $owner: String
  ) {
    onUpdateSubscriptionPlan(filter: $filter, owner: $owner) {
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
export const onDeleteSubscriptionPlan = /* GraphQL */ `
  subscription OnDeleteSubscriptionPlan(
    $filter: ModelSubscriptionSubscriptionPlanFilterInput
    $owner: String
  ) {
    onDeleteSubscriptionPlan(filter: $filter, owner: $owner) {
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
export const onCreateThought = /* GraphQL */ `
  subscription OnCreateThought(
    $filter: ModelSubscriptionThoughtFilterInput
    $owner: String
  ) {
    onCreateThought(filter: $filter, owner: $owner) {
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
export const onUpdateThought = /* GraphQL */ `
  subscription OnUpdateThought(
    $filter: ModelSubscriptionThoughtFilterInput
    $owner: String
  ) {
    onUpdateThought(filter: $filter, owner: $owner) {
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
export const onDeleteThought = /* GraphQL */ `
  subscription OnDeleteThought(
    $filter: ModelSubscriptionThoughtFilterInput
    $owner: String
  ) {
    onDeleteThought(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateBiographyThoughts = /* GraphQL */ `
  subscription OnCreateBiographyThoughts(
    $filter: ModelSubscriptionBiographyThoughtsFilterInput
    $owner: String
  ) {
    onCreateBiographyThoughts(filter: $filter, owner: $owner) {
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
export const onUpdateBiographyThoughts = /* GraphQL */ `
  subscription OnUpdateBiographyThoughts(
    $filter: ModelSubscriptionBiographyThoughtsFilterInput
    $owner: String
  ) {
    onUpdateBiographyThoughts(filter: $filter, owner: $owner) {
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
export const onDeleteBiographyThoughts = /* GraphQL */ `
  subscription OnDeleteBiographyThoughts(
    $filter: ModelSubscriptionBiographyThoughtsFilterInput
    $owner: String
  ) {
    onDeleteBiographyThoughts(filter: $filter, owner: $owner) {
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
export const onCreateHealthReportThoughts = /* GraphQL */ `
  subscription OnCreateHealthReportThoughts(
    $filter: ModelSubscriptionHealthReportThoughtsFilterInput
    $owner: String
  ) {
    onCreateHealthReportThoughts(filter: $filter, owner: $owner) {
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
export const onUpdateHealthReportThoughts = /* GraphQL */ `
  subscription OnUpdateHealthReportThoughts(
    $filter: ModelSubscriptionHealthReportThoughtsFilterInput
    $owner: String
  ) {
    onUpdateHealthReportThoughts(filter: $filter, owner: $owner) {
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
export const onDeleteHealthReportThoughts = /* GraphQL */ `
  subscription OnDeleteHealthReportThoughts(
    $filter: ModelSubscriptionHealthReportThoughtsFilterInput
    $owner: String
  ) {
    onDeleteHealthReportThoughts(filter: $filter, owner: $owner) {
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
export const onCreateJournalEntryThoughts = /* GraphQL */ `
  subscription OnCreateJournalEntryThoughts(
    $filter: ModelSubscriptionJournalEntryThoughtsFilterInput
    $owner: String
  ) {
    onCreateJournalEntryThoughts(filter: $filter, owner: $owner) {
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
export const onUpdateJournalEntryThoughts = /* GraphQL */ `
  subscription OnUpdateJournalEntryThoughts(
    $filter: ModelSubscriptionJournalEntryThoughtsFilterInput
    $owner: String
  ) {
    onUpdateJournalEntryThoughts(filter: $filter, owner: $owner) {
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
export const onDeleteJournalEntryThoughts = /* GraphQL */ `
  subscription OnDeleteJournalEntryThoughts(
    $filter: ModelSubscriptionJournalEntryThoughtsFilterInput
    $owner: String
  ) {
    onDeleteJournalEntryThoughts(filter: $filter, owner: $owner) {
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
