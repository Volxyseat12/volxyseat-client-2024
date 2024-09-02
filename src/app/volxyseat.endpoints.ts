export type Endpoints = Record<string, Function>;

export namespace ServiceOrderEndpoints {

    const base = '/api/v1';

    export const endpoints: Endpoints = {
        getSubscriptions: (apiUrl: string) => `${apiUrl}${base}/subscriptions`,
        getSubscriptionDetails: (apiUrl: string, id: string) => `${apiUrl}${base}/subscription/${id}`,
        openSubscription: (apiUrl: string, id: string) => `${apiUrl}${base}/subscription/${id}/states/action=open`,
        closeSubscription: (apiUrl: string, id: string) => `${apiUrl}${base}/subscription/${id}/states/action=close`,
    };
}
