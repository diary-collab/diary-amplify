import { Auth } from 'aws-amplify';

import { LoginResult } from '@src/types/user-auth';

export async function login(
  email: string,
  password: string
): Promise<LoginResult> {
  // return { success: true, data: "sukses" } as returnData;
  try {
    await Auth.signIn(email, password);
    const currentUser = await Auth.currentAuthenticatedUser();

    return { success: true, user: currentUser } as LoginResult;
  } catch (err: unknown) {
    return {
      success: false,
      errorMessage: 'Combination of email and password not found!',
    } as LoginResult;
  }
}

// export async function signup(
//   fullname: string,
//   email: string,
//   password: string,
//   roles: string
// ): Promise<returnData> {
//   try {
//     const { user } = await Auth.signUp({
//       username: email,
//       password,
//       attributes: {
//         email: email, // optional
//         name: fullname, // optional - E.164 number convention
//         'custom:user_role': roles,
//         // other custom attributes
//       },
//       autoSignIn: {
//         // optional - enables auto sign in after user is confirmed
//         enabled: false,
//       },
//     });
//     return { success: true, data: user } as returnData;
//   } catch (error) {
//     return { success: false, data: error } as returnData;
//   }
// }

export async function logout() {
  try {
    await Auth.signOut();
    return true;
  } catch (error) {
    return false;
  }
}
