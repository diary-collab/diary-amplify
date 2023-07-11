import { Auth } from 'aws-amplify';

import {
  AuthRequestResult,
  RegisterNewUserRequest,
  SignInWithEmailAndPassword,
} from '@src/types/user-auth';

export async function signInWithEmailAndPassword(
  data: SignInWithEmailAndPassword
): Promise<AuthRequestResult> {
  // return { success: true, data: "sukses" } as returnData;
  try {
    await Auth.signIn(data.email, data.password);
    const currentUser = await Auth.currentAuthenticatedUser();

    return { success: true, user: currentUser } as AuthRequestResult;
  } catch (err: unknown) {
    return {
      success: false,
      errorMessage: 'Combination of email and password not found!',
    } as AuthRequestResult;
  }
}

export async function register(
  data: RegisterNewUserRequest
): Promise<AuthRequestResult> {
  const username = data.username;
  const nickname = data.nickname;
  const password = data.password;
  const email = data.email;
  const name = data.fullname;

  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        nickname,
        name, // optional - E.164 number convention
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });

    return { user: user, success: true } as AuthRequestResult;
  } catch (error) {
    return { success: false, errorMessage: error } as AuthRequestResult;
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
