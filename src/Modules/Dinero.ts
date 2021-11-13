import Dinero from 'dinero.js';

export type Money = Dinero.Dinero;

export function toDinero(rawAmount: number) {
  const splitString = rawAmount.toString().split('.');

  if (splitString.length === 1) {
    const amount = parseInt(splitString + '00', 10);
    return Dinero({ amount });
  }

  if (splitString[1].length === 1) {
    const amount = parseInt(splitString[0] + splitString[1] + '0', 10);
    return Dinero({ amount });
  }

  const amount = parseInt(splitString[0] + splitString[1], 10);
  return Dinero({ amount });
}
