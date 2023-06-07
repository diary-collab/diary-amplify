import { CognitoUser } from '@aws-amplify/auth';

export type SignInWithEmailAndPassword = {
  email: string;
  password: string;
};

export type LoginResult = {
  user?: CognitoUser | null;
  success: boolean;
  message?: string;
  errorMessage?: string;
};
