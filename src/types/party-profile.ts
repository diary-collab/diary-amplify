import { EnumAccountType } from '@prisma/client';

export type CompleteAccount = {
  email: string;
  partyName: string;
  accountType: EnumAccountType;
  birthdate: Date;
  parentName: string;
};
