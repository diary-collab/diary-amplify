/* eslint-disable @typescript-eslint/no-explicit-any */
// import logger from '@src/lib/logger';

export function replaceWildcards(item: any, params: any) {
  if (!item.href) {
    return null; // Handle the case when href doesn't exist
  }

  const hasWildcards = /\[\w+\]/.test(item.href);

  if (hasWildcards) {
    let replacedHref = item.href;

    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        const wildcard = `[${key}]`;
        const value = params[key];
        replacedHref = replacedHref.replace(wildcard, value);
      }
    }

    return replacedHref;
  } else {
    return item.href;
  }
}
