import { Maybe } from "monet";

const { Just, Nothing } = Maybe

export type PaymentType = 'Fiat' | 'Digital'

export enum Currency {
    USD = 'USD',
    BTC = 'BTC',
    ETH = 'ETH',
    XLM = 'XLM'
}

export interface PaymentMethod {
    id: string;
    currency: Currency
}

export interface FiatPaymentMethod extends PaymentMethod {
    cardholderName: string
    cardNumber: string;
    expiration: string;
    security: string
}

export interface DigitalPaymentMethod extends PaymentMethod {
    publicKey: string
    privateKey: string;
}

export interface PaymentMethodList {
    Fiat: Maybe<FiatPaymentMethod>;
    Digital: Maybe<DigitalPaymentMethod>;
}

export const PAYMENT_METHODS: PaymentMethodList = {
    Fiat: Just({
        id: '1',
        cardholderName: 'TEST Cardholder',
        cardNumber: '**** **** **** 2233',
        expiration: '10/1/23',
        security: '232',
        currency: Currency.USD
    }),
    Digital: Just({
        id: '2',
        publicKey: '1DSsgJdB2AnWSds...',
        privateKey: 'secret',
        currency: Currency.BTC
    }),
}

export function isFiat(paymentMethod: PaymentMethod) {
    return paymentMethod.currency === 'USD'
}