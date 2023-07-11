import { getWithSSRContext } from '@src/contexts/amplifycontext/amplifyssr';

export async function useamplifyauth() {
  const SSR = getWithSSRContext();
  let result;

  try {
    result = await SSR.Auth.currentAuthenticatedUser();
  } catch (error) {
    return null;
  }

  if (!result || !result.attributes) {
    return null;
  }

  return result.attributes;
}
