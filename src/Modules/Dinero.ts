import Dinero from 'dinero.js';

export type Money = Dinero.Dinero;

export function toDinero(rawAmount: number) {
  const splitString = rawAmount.toString().split('.');

  if (splitString.length === 1) {
    const amount = parseInt(splitString + '00', 10);
    return Dinero({ amount });
  }
}
