/* eslint-disable @typescript-eslint/no-explicit-any */

export type SessionData = {
  attributes?: any;
  jwt?: string;
};

export type AccountData = {
  partyId: string;
  accountId: string;
  accountProviderId: string;
  createdAt: string;
};

export type MiddlewareReturn = {
  status: number;
  success: boolean;
  message?: string;
  body?: any;
};
