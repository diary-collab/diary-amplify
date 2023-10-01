import { EnumPartyType } from '@prisma/client';

export type CompleteAccount = {
  email: string;
  partyName: string;
  partyType: EnumPartyType;
  partyBirthdate: Date;
  partyParentName: string;
  partyAddress: string;
};
