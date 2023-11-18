import {Client, Environment} from "square";
import {handleGraphql} from "../_utils/handleGraphql.js";

export const createSubscription = async ({ user, subscriptionTier = "FREE" }) => {
    console.log('Setting up a SubscriptionPlan the Cognito User', { user, subscriptionTier });

    // first, create a new Square Customer. Check for existing Customer first.
    const customer = await createSquareCustomer({ user });

    // then, create a new FREE subscription plan in square
    const subscription = await createSquareSubscription({ customer });

    // then, create a new SubscriptionPlan object in the database and connect it with the User object
    const subscriptionPlan = await createSubscriptionPlanObject({ user, subscriptionTier, squareSubscriptionID: subscription.id });

    return subscriptionPlan
};

const createSquareCustomer = async ({ user }) => {

    console.log('Creating a new Square Customer', { user })

    try {
        const client = new Client({
            accessToken: process.env.ACCESS_TOKEN,
            environment: Environment.Sandbox,
        });

        const response = await client.customersApi.createCustomer({
            givenName: user.firstName || 'Test',
            familyName: user.lastName || 'McTestington',
            emailAddress: user.email,
            phoneNumber: user.phone || '+15093590350',
            referenceId: user.id,
            note: 'test'
        });

        console.log(response.result);

        return response.result.customer;
    } catch(error) {
        console.log(error);
    }
}

const createSquareSubscription = async ({ customer }) => {

    // const FREE_PLAN_ID = "NMHPQPCRFTHCETTQTLVSENUI";
    const PLAN_VARIANT_ID_MONTHLY = process.env.PLAN_VARIANT_ID_MONTHLY || "NMHPQPCRFTHCETTQTLVSENUI";
    const PLAN_VARIANT_ID_ANNUAL = process.env.PLAN_VARIANT_ID_ANNUAL || "K2C2RSH54EVZMUNDBF6AMVIV";
    const PLAN_CATALOG_ITEM_ID = process.env.PLAN_CATALOG_ITEM_ID || "K7KBGDY4SSN3DO3DTGSWI3MW";
    const PLAN_CATALOG_ITEM_VARIANT_FREE = process.env.PLAN_CATALOG_ITEM_VARIANT_FREE || "TN6NQQ5EIEFVIJ45VFECKLRI";
    const PLAN_CATALOG_ITEM_VARIANT_PREMIUM = process.env.PLAN_CATALOG_ITEM_VARIANT_PREMIUM || "TYDTRUEXGDV6FX2NQRG5DTM2";

    try {

        // const key = Math.random();

        const client = new Client({
            accessToken: process.env.ACCESS_TOKEN,
            environment: Environment.Sandbox,
        });

        const orderTemplate = await client.ordersApi.createOrder({
            order: {
                locationId: process.env.LOCATION_ID,
                lineItems: [
                    {
                        quantity: '1',
                        catalogObjectId: PLAN_CATALOG_ITEM_ID
                    }
                ],
                state: 'DRAFT'
            },
            // idempotencyKey: '{UNIQUE_KEY}'
        });

        console.log(response.result);

        const response = await client.subscriptionsApi.createSubscription({
            // idempotencyKey: '{UNIQUE_KEY}',
            locationId: process.env.LOCATION_ID,
            planVariationId: PLAN_VARIANT_ID_MONTHLY,
            customerId: customer.id,
            phases: [
                {
                    ordinal: 0,
                    orderTemplateId: orderTemplate.order.id
                }
            ],
            // startDate: '2027-01-01',
            // cardId: '{CARD ID}'
        });

        console.log(response.result);

        return response.result.subscription;
    } catch(error) {
        console.log(error);
    }
}

const createSubscriptionPlanObject = async ({ user, subscriptionTier, squareSubscriptionID }) => {

        const createSubscriptionPlan = `
            mutation CreateSubscriptionPlan($input: CreateSubscriptionPlanInput!) {
                createSubscriptionPlan(input: $input) {
                    id
                    subscriptionTier
                    status
                    squareSubscriptionID
                    owner
                }
            }    
        `;

        const subscription = await handleGraphql({
            query: createSubscriptionPlan,
            variables: {
                input: {
                    subscriptionTier,
                    squareSubscriptionID,
                    owner: user.cognitoSub,
                }
            }
        })

        console.log({ subscription })

        return subscription.data.createSubscriptionPlan;
}