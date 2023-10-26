/* eslint-disable @typescript-eslint/no-explicit-any */
import { confirmSignUp, resetPassword, signIn, signUp } from 'aws-amplify/auth';

import logger from '@src/lib/logger';

import {
  AuthRequestResult,
  ConfirmForgotPasswordRequest,
  ForgotPasswordRequest,
  RegisterNewUserRequest,
  SignInWithEmailAndPassword,
} from '@src/types/user-auth';

export async function signInWithEmailAndPassword(
  data: SignInWithEmailAndPassword
): Promise<AuthRequestResult> {
  // return { success: true, data: "sukses" } as returnData;
  try {
    const { isSignedIn, nextStep } = await signIn(data);

    return { success: true, user: isSignedIn } as AuthRequestResult;
  } catch (err: unknown) {
    logger(err);
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
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email, // optional
          nickname,
          name, // optional - E.164 number convention
        },
      },
    });

    return { user: userId, success: true } as AuthRequestResult;
  } catch (error) {
    return { success: false, errorMessage: error } as AuthRequestResult;
  }
}

export async function verifyUser(
  username: string,
  confirmationCode: string
): Promise<AuthRequestResult> {
  try {
    const test = await confirmSignUp({ username, confirmationCode });

    logger('verifyuser: ' + test);
    return {
      success: true,
      message: 'Success verify user',
    };
  } catch (error) {
    logger('verifyuser: ' + error);
    return {
      success: false,
      message: 'Error verify user',
    };
  }
}

export async function forgotPasswordRequest(
  data: ForgotPasswordRequest
): Promise<AuthRequestResult> {
  try {
    const { CodeDeliveryDetails } = await resetPassword(data.username);

    return {
      success: true,
      message: `We have sent a message to your ${CodeDeliveryDetails.AttributeName} (${CodeDeliveryDetails.Destination}). Please kindly check it.`,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    let errormessage;
    if (error.toString().includes('LimitExceededException')) {
      errormessage =
        'Too many Forgot Password Request! Try again tomorrow or contact our team at: support@diaryproject.id';
    } else if (error.toString().includes('UserNotFoundException')) {
      errormessage =
        "Username / Email doesn't exist, please register to Project Diary first!";
    } else {
      errormessage =
        'Unexpected error happen, please submit a ticket to our team at report@projectdiary.id with code: FGTPWD-1';
    }
    return {
      success: false,
      message: errormessage,
    };
  }
}

export async function confirmForgotPassword({
  username,
  verificationcode,
  newpassword,
}: ConfirmForgotPasswordRequest): Promise<AuthRequestResult> {
  logger('wubba ' + username + verificationcode + newpassword);
  try {
    const result = await Auth.forgotPasswordSubmit(
      username,
      verificationcode,
      newpassword
    );
    logger(result);

    return {
      success: true,
      message: 'Success',
    };
  } catch (error: any) {
    logger(error);
    let errormessage;
    if (error.toString().includes('CodeMismatchException')) {
      errormessage =
        'Verification code provided is not valid, please make sure you input the right code!';
    } else if (error.toString().includes('UserNotFoundException')) {
      errormessage =
        "Username / Email doesn't exist, please register to Project Diary first!";
    } else if (error.toString().includes('LimitExceededException')) {
      errormessage =
        'Too many unsuccessful attempts, please make another reset password request!';
    } else {
      errormessage =
        'Unexpected error happen, please submit a ticket to our team at report@projectdiary.id with code: FGTPWD-2';
    }
    return {
      success: false,
      message: errormessage,
    };
  }
}

export async function logout() {
  try {
    await Auth.signOut();
    return true;
  } catch (error) {
    return false;
  }
}
