import { EnumPartyType } from '@prisma/client';

interface IPartyProvided {
  id: string;
  createdAt: string;
  identity: {
    fullname: string;
    nickname: string;
    birthdate: string;
    identityType: string;
    providerName: string;
  };
  provider: {
    partyName: string;
  };
}

export interface IIdentitiesByParty {
  id: string;
  partyIdProvided: IPartyProvided[];
  partyType: EnumPartyType;
}

export interface IGetIdentityByID {
  id: string;
  createdAt: string;
  updatedAt: string;
  identity: object;
  provider: {
    partyName: string;
    isVerified: boolean;
    isActive: boolean;
  };
}
