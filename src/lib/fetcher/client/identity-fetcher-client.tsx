// import { env } from '@/env.mjs';

export async function identitiesByParty(partyid: string) {
  const postnewaccount = await fetch(`/api/middleware`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: `/parties/${partyid}/identities`,
      method: 'get',
    }),
  });

  return postnewaccount;
}

export async function getIdentitiesById(identityid: string) {
  const getidentity = await fetch(`/api/middleware`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      path: `/identities/${identityid}`,
      method: 'get',
    }),
  });

  return getidentity;
}
