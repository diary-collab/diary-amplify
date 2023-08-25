import { env } from '@/env.mjs';

export async function identitiesByParty(jwt: string, partyid: string) {
  const postnewaccount = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/v1/parties/${partyid}/identities`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return postnewaccount;
}

export async function getIdentitiesById(jwt: string, identityid: string) {
  const getidentity = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/v1/identities/${identityid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }
  );

  return getidentity;
}
