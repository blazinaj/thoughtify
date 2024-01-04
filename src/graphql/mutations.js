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
export const createPrinter = /* GraphQL */ `
  mutation CreatePrinter(
    $input: CreatePrinterInput!
    $condition: ModelPrinterConditionInput
  ) {
    createPrinter(input: $input, condition: $condition) {
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
export const updatePrinter = /* GraphQL */ `
  mutation UpdatePrinter(
    $input: UpdatePrinterInput!
    $condition: ModelPrinterConditionInput
  ) {
    updatePrinter(input: $input, condition: $condition) {
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
export const deletePrinter = /* GraphQL */ `
  mutation DeletePrinter(
    $input: DeletePrinterInput!
    $condition: ModelPrinterConditionInput
  ) {
    deletePrinter(input: $input, condition: $condition) {
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
export const createPrintModel = /* GraphQL */ `
  mutation CreatePrintModel(
    $input: CreatePrintModelInput!
    $condition: ModelPrintModelConditionInput
  ) {
    createPrintModel(input: $input, condition: $condition) {
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
export const updatePrintModel = /* GraphQL */ `
  mutation UpdatePrintModel(
    $input: UpdatePrintModelInput!
    $condition: ModelPrintModelConditionInput
  ) {
    updatePrintModel(input: $input, condition: $condition) {
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
export const deletePrintModel = /* GraphQL */ `
  mutation DeletePrintModel(
    $input: DeletePrintModelInput!
    $condition: ModelPrintModelConditionInput
  ) {
    deletePrintModel(input: $input, condition: $condition) {
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
export const createPrint = /* GraphQL */ `
  mutation CreatePrint(
    $input: CreatePrintInput!
    $condition: ModelPrintConditionInput
  ) {
    createPrint(input: $input, condition: $condition) {
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
export const updatePrint = /* GraphQL */ `
  mutation UpdatePrint(
    $input: UpdatePrintInput!
    $condition: ModelPrintConditionInput
  ) {
    updatePrint(input: $input, condition: $condition) {
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
export const deletePrint = /* GraphQL */ `
  mutation DeletePrint(
    $input: DeletePrintInput!
    $condition: ModelPrintConditionInput
  ) {
    deletePrint(input: $input, condition: $condition) {
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
export const createFilament = /* GraphQL */ `
  mutation CreateFilament(
    $input: CreateFilamentInput!
    $condition: ModelFilamentConditionInput
  ) {
    createFilament(input: $input, condition: $condition) {
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
export const updateFilament = /* GraphQL */ `
  mutation UpdateFilament(
    $input: UpdateFilamentInput!
    $condition: ModelFilamentConditionInput
  ) {
    updateFilament(input: $input, condition: $condition) {
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
export const deleteFilament = /* GraphQL */ `
  mutation DeleteFilament(
    $input: DeleteFilamentInput!
    $condition: ModelFilamentConditionInput
  ) {
    deleteFilament(input: $input, condition: $condition) {
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
export const createBiographyThoughts = /* GraphQL */ `
  mutation CreateBiographyThoughts(
    $input: CreateBiographyThoughtsInput!
    $condition: ModelBiographyThoughtsConditionInput
  ) {
    createBiographyThoughts(input: $input, condition: $condition) {
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
export const updateBiographyThoughts = /* GraphQL */ `
  mutation UpdateBiographyThoughts(
    $input: UpdateBiographyThoughtsInput!
    $condition: ModelBiographyThoughtsConditionInput
  ) {
    updateBiographyThoughts(input: $input, condition: $condition) {
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
export const deleteBiographyThoughts = /* GraphQL */ `
  mutation DeleteBiographyThoughts(
    $input: DeleteBiographyThoughtsInput!
    $condition: ModelBiographyThoughtsConditionInput
  ) {
    deleteBiographyThoughts(input: $input, condition: $condition) {
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
export const createHealthReportThoughts = /* GraphQL */ `
  mutation CreateHealthReportThoughts(
    $input: CreateHealthReportThoughtsInput!
    $condition: ModelHealthReportThoughtsConditionInput
  ) {
    createHealthReportThoughts(input: $input, condition: $condition) {
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
export const updateHealthReportThoughts = /* GraphQL */ `
  mutation UpdateHealthReportThoughts(
    $input: UpdateHealthReportThoughtsInput!
    $condition: ModelHealthReportThoughtsConditionInput
  ) {
    updateHealthReportThoughts(input: $input, condition: $condition) {
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
export const deleteHealthReportThoughts = /* GraphQL */ `
  mutation DeleteHealthReportThoughts(
    $input: DeleteHealthReportThoughtsInput!
    $condition: ModelHealthReportThoughtsConditionInput
  ) {
    deleteHealthReportThoughts(input: $input, condition: $condition) {
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
