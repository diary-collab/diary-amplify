import { EnumPartyType } from '@prisma/client';

interface IIdentityDetails {
  partyName: string;
  partyType: string;
  partyAddress: string;
  partyBirthDate: string;
  partyParentName: string;
}
interface IPartyProvided {
  id: string;
  createdAt: string;
  identityDetails: IIdentityDetails;
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  identityDetails: any;
  provider: {
    partyName: string;
    isVerified: boolean;
    isActive: boolean;
  };
}
