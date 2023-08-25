export async function identitiesByParty(jwt: string, partyid: string) {
  const postnewaccount = await fetch(
    `http://localhost:3010/v1/parties/${partyid}/identities`,
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
    `http://localhost:3010/v1/identities/${identityid}`,
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
