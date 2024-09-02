export interface ISubscription {
    type: string;
    id: string;
    name: string;
    description: string;
    price: number;
    isActive: boolean;
    isPopular: boolean;
    termInDays: number;
}