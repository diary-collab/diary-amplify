import { EnumPartyType } from '@prisma/client';

export type CompleteAccount = {
  email: string;
  partyName: string;
  accountType: EnumPartyType;
  birthdate: Date;
  parentName: string;
};
