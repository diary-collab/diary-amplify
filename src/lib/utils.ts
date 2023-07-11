import clsx, { ClassValue } from 'clsx';
// import crypto from 'crypto'
import { twMerge } from 'tailwind-merge';

import { env } from '@/env.mjs';

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const randomNumber = (maxNumber: number) => {
  let randomNumberString;
  switch (maxNumber) {
    case 1:
      randomNumberString = getRandomInt(1, 9).toString();
      break;
    case 2:
      randomNumberString = getRandomInt(10, 90).toString();
      break;
    case 3:
      randomNumberString = getRandomInt(100, 900).toString();
      break;
    case 4:
      randomNumberString = getRandomInt(1000, 9000).toString();
      break;
    case 5:
      randomNumberString = getRandomInt(10000, 90000).toString();
      break;
    case 6:
      randomNumberString = getRandomInt(100000, 900000).toString();
      break;
    default:
      randomNumberString = '';
      break;
  }
  return randomNumberString;
};

export function generateUsernameFromFullname(
  fullname: string,
  randomDigits: number
): string {
  // Retrieve name from email address
  const nameParts = fullname.replace(/@.+/, '');
  // Replace all special characters like "@ . _ ";
  const name = nameParts
    .replace(/[&/\\#,+()$~%._@'":*?<>{}\s]/g, '')
    .toLowerCase();
  // Create and return unique username
  return name + randomNumber(randomDigits);
}
