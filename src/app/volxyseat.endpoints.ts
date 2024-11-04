export interface Endpoints {
  getSubscriptions: (apiUrl: string) => string;
  getSubscriptionDetails: (apiUrl: string, id: string) => string;
  openSubscription: (apiUrl: string, id: string) => string;
  closeSubscription: (apiUrl: string, id: string) => string;
  getSubscriptionById: (apiUrl: string, id: string) => string;

  getTransactionById: (apiUrl: string, id: string) => string;
  createTransaction: (apiUrl: string) => string;

  logout: (apiUrl: string) => string;
}

export namespace VolxyseatEndpoints {
  const base = '/api/v1';

  export const endpoints: Endpoints = {
    getSubscriptions: (apiUrl: string) => `${apiUrl}${base}/Subscription`,
    getSubscriptionDetails: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/subscription/${id}`,
    openSubscription: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/subscription/${id}/states/action=open`,
    closeSubscription: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/subscription/${id}/states/action=close`,
    getSubscriptionById: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/subscription/${id}`,

    getTransactionById: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/Transaction/${id}`,
    createTransaction: (apiUrl: string) => `${apiUrl}${base}/Transaction/`,

    logout: (apiUrl: string): string => `${apiUrl}${base}/User/logout`,
  };
}
