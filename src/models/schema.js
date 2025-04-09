export const schema = {
  models: {
    Biography: {
      name: 'Biography',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        date: {
          name: 'date',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        },
        cadence: {
          name: 'cadence',
          isArray: false,
          type: {
            enum: 'JournalCadence'
          },
          isRequired: false,
          attributes: []
        },
        entry: {
          name: 'entry',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        thoughts: {
          name: 'thoughts',
          isArray: true,
          type: {
            model: 'BiographyThoughts'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['biography']
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Biographies',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    HealthReport: {
      name: 'HealthReport',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        date: {
          name: 'date',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        },
        cadence: {
          name: 'cadence',
          isArray: false,
          type: {
            enum: 'JournalCadence'
          },
          isRequired: false,
          attributes: []
        },
        report: {
          name: 'report',
          isArray: false,
          type: 'AWSJSON',
          isRequired: false,
          attributes: []
        },
        thoughts: {
          name: 'thoughts',
          isArray: true,
          type: {
            model: 'HealthReportThoughts'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['healthReport']
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'HealthReports',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    JournalEntry: {
      name: 'JournalEntry',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        date: {
          name: 'date',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        },
        cadence: {
          name: 'cadence',
          isArray: false,
          type: {
            enum: 'JournalCadence'
          },
          isRequired: false,
          attributes: []
        },
        entry: {
          name: 'entry',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        thoughts: {
          name: 'thoughts',
          isArray: true,
          type: {
            model: 'JournalEntryThoughts'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['journalEntry']
          }
        },
        isLoading: {
          name: 'isLoading',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'JournalEntries',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    Notification: {
      name: 'Notification',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        title: {
          name: 'title',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        content: {
          name: 'content',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        readDate: {
          name: 'readDate',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        },
        type: {
          name: 'type',
          isArray: false,
          type: {
            enum: 'NotificationType'
          },
          isRequired: false,
          attributes: []
        },
        userID: {
          name: 'userID',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        isUnread: {
          name: 'isUnread',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        owner: {
          name: 'owner',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Notifications',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byUser',
            fields: ['userID']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['read', 'create', 'update', 'delete'],
                identityClaim: 'cognito:username'
              }
            ]
          }
        }
      ]
    },
    SubscriptionPlan: {
      name: 'SubscriptionPlan',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        subscriptionTier: {
          name: 'subscriptionTier',
          isArray: false,
          type: {
            enum: 'SubscriptionTier'
          },
          isRequired: false,
          attributes: []
        },
        status: {
          name: 'status',
          isArray: false,
          type: {
            enum: 'SubscriptionStatus'
          },
          isRequired: false,
          attributes: []
        },
        squareSubscriptionID: {
          name: 'squareSubscriptionID',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        owner: {
          name: 'owner',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'SubscriptionPlans',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['read', 'create', 'update'],
                identityClaim: 'cognito:username'
              }
            ]
          }
        }
      ]
    },
    Thought: {
      name: 'Thought',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        date: {
          name: 'date',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: []
        },
        input: {
          name: 'input',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        output: {
          name: 'output',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        extract: {
          name: 'extract',
          isArray: false,
          type: 'AWSJSON',
          isRequired: false,
          attributes: []
        },
        journalEntries: {
          name: 'journalEntries',
          isArray: true,
          type: {
            model: 'JournalEntryThoughts'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['thought']
          }
        },
        healthReports: {
          name: 'healthReports',
          isArray: true,
          type: {
            model: 'HealthReportThoughts'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['thought']
          }
        },
        biographies: {
          name: 'biographies',
          isArray: true,
          type: {
            model: 'BiographyThoughts'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['thought']
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Thoughts',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    User: {
      name: 'User',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        firstName: {
          name: 'firstName',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        lastName: {
          name: 'lastName',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        email: {
          name: 'email',
          isArray: false,
          type: 'AWSEmail',
          isRequired: false,
          attributes: []
        },
        phone: {
          name: 'phone',
          isArray: false,
          type: 'AWSPhone',
          isRequired: false,
          attributes: []
        },
        Notifications: {
          name: 'Notifications',
          isArray: true,
          type: {
            model: 'Notification'
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: 'HAS_MANY',
            associatedWith: ['userID']
          }
        },
        profileImage: {
          name: 'profileImage',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        cognitoSub: {
          name: 'cognitoSub',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        owner: {
          name: 'owner',
          isArray: false,
          type: 'String',
          isRequired: false,
          attributes: []
        },
        showOnboarding: {
          name: 'showOnboarding',
          isArray: false,
          type: 'Boolean',
          isRequired: false,
          attributes: []
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'Users',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                operations: ['read', 'update', 'create', 'delete'],
                identityClaim: 'cognito:username'
              }
            ]
          }
        }
      ]
    },
    BiographyThoughts: {
      name: 'BiographyThoughts',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        biographyId: {
          name: 'biographyId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        thoughtId: {
          name: 'thoughtId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        biography: {
          name: 'biography',
          isArray: false,
          type: {
            model: 'Biography'
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['biographyId']
          }
        },
        thought: {
          name: 'thought',
          isArray: false,
          type: {
            model: 'Thought'
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['thoughtId']
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'BiographyThoughts',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byBiography',
            fields: ['biographyId']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byThought',
            fields: ['thoughtId']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    HealthReportThoughts: {
      name: 'HealthReportThoughts',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        healthReportId: {
          name: 'healthReportId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        thoughtId: {
          name: 'thoughtId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        healthReport: {
          name: 'healthReport',
          isArray: false,
          type: {
            model: 'HealthReport'
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['healthReportId']
          }
        },
        thought: {
          name: 'thought',
          isArray: false,
          type: {
            model: 'Thought'
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['thoughtId']
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'HealthReportThoughts',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byHealthReport',
            fields: ['healthReportId']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byThought',
            fields: ['thoughtId']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    },
    JournalEntryThoughts: {
      name: 'JournalEntryThoughts',
      fields: {
        id: {
          name: 'id',
          isArray: false,
          type: 'ID',
          isRequired: true,
          attributes: []
        },
        journalEntryId: {
          name: 'journalEntryId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        thoughtId: {
          name: 'thoughtId',
          isArray: false,
          type: 'ID',
          isRequired: false,
          attributes: []
        },
        journalEntry: {
          name: 'journalEntry',
          isArray: false,
          type: {
            model: 'JournalEntry'
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['journalEntryId']
          }
        },
        thought: {
          name: 'thought',
          isArray: false,
          type: {
            model: 'Thought'
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: 'BELONGS_TO',
            targetNames: ['thoughtId']
          }
        },
        createdAt: {
          name: 'createdAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        },
        updatedAt: {
          name: 'updatedAt',
          isArray: false,
          type: 'AWSDateTime',
          isRequired: false,
          attributes: [],
          isReadOnly: true
        }
      },
      syncable: true,
      pluralName: 'JournalEntryThoughts',
      attributes: [
        {
          type: 'model',
          properties: {}
        },
        {
          type: 'key',
          properties: {
            name: 'byJournalEntry',
            fields: ['journalEntryId']
          }
        },
        {
          type: 'key',
          properties: {
            name: 'byThought',
            fields: ['thoughtId']
          }
        },
        {
          type: 'auth',
          properties: {
            rules: [
              {
                provider: 'userPools',
                ownerField: 'owner',
                allow: 'owner',
                identityClaim: 'cognito:username',
                operations: ['create', 'update', 'delete', 'read']
              }
            ]
          }
        }
      ]
    }
  },
  enums: {
    JournalCadence: {
      name: 'JournalCadence',
      values: ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']
    },
    NotificationType: {
      name: 'NotificationType',
      values: ['MESSAGE']
    },
    SubscriptionStatus: {
      name: 'SubscriptionStatus',
      values: ['ACTIVE', 'INACTIVE']
    },
    SubscriptionTier: {
      name: 'SubscriptionTier',
      values: ['FREE', 'PREMIUM']
    }
  },
  nonModels: {},
  codegenVersion: '3.4.4',
  version: 'aa339da1aba4773b03a9d8fa801ca2ce'
};
