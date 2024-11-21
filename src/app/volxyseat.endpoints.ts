export interface Endpoints {
  getSubscriptions: (apiUrl: string) => string;
  getSubscriptionDetails: (apiUrl: string, id: string) => string;
  getSubscriptionById: (apiUrl: string, id: string) => string;

  getTransactionById: (apiUrl: string, id: string) => string;
  createTransaction: (apiUrl: string) => string;
  disableTransation: (apiUrl: string, id: string) => string;
  calcelMPSubscription: (apiUrl: string, id: string) => string;
  createMPSubscription: (mpApiUrl: string) => string;

  register: (apiUrl: string) => string;
  login: (apiUrl: string) => string;
  logout: (apiUrl: string) => string;
}

export namespace VolxyseatEndpoints {
  const base = '/api/v1';

  export const endpoints: Endpoints = {
    getSubscriptions: (apiUrl: string) => `${apiUrl}${base}/Subscription`,
    getSubscriptionDetails: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/subscription/${id}`,
    getSubscriptionById: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/subscription/${id}`,

    getTransactionById: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/Transaction/${id}`,
    createTransaction: (apiUrl: string) => `${apiUrl}${base}/Transaction`,
    disableTransation: (apiUrl: string, id: string) =>
      `${apiUrl}${base}/Transaction/${id}`,

    register: (apiUrl: string): string => `${apiUrl}${base}/User/register`,
    login: (apiUrl: string): string => `${apiUrl}${base}/User/login`,
    logout: (apiUrl: string): string => `${apiUrl}${base}/User/logout`,

    calcelMPSubscription: (apiUrl: string, id: string): string =>
      `${apiUrl}${base}/Payment/cancel-preapproval/${id}`,

    createMPSubscription: (apiUrl: string): string =>
      `${apiUrl}${base}/Payment/create-preapproval`,
  };
}