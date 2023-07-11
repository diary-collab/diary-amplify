import { CognitoUser } from '@aws-amplify/auth';

import { FormFields } from '.';

export const AuthLoginfields: FormFields[] = [
  {
    labelText: 'Username',
    labelFor: 'username',
    id: 'username',
    name: 'username',
    type: 'text',
    autoComplete: 'username',
    isRequired: true,
    placeholder: 'username',
    titlekey: 'title_username',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current_password',
    isRequired: true,
    placeholder: 'Password',
    titlekey: 'title_password',
  },
];

export const AuthRegisterFields: FormFields[] = [
  {
    labelText: 'Username',
    labelFor: 'username',
    id: 'username',
    name: 'username',
    type: 'text',
    autoComplete: 'username',
    isRequired: false,
    placeholder: 'username',
    titlekey: 'title_username',
  },
  {
    labelText: 'Fullname',
    labelFor: 'fullname',
    id: 'fullname',
    name: 'fullname',
    type: 'text',
    autoComplete: 'fullname',
    isRequired: true,
    placeholder: 'Fullname',
    titlekey: 'title_fullname',
  },
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
    titlekey: 'title_email',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current_password',
    isRequired: true,
    placeholder: 'Password',
    titlekey: 'title_password',
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm_password',
    id: 'confirm_password',
    name: 'confirm_password',
    type: 'password',
    autoComplete: 'confirm_password',
    isRequired: true,
    placeholder: 'Re-type Password',
    titlekey: 'title_confirm_password',
  },
];

export type SignInWithEmailAndPassword = {
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  username: string;
};

export type ConfirmForgotPasswordRequest = {
  username: string;
  verificationcode: string;
  newpassword: string;
};

export type RegisterNewUserForm = {
  email: string;
  password: string;
  confirm_password: string;
  fullname: string;
  username: string;
};

export type RegisterNewUserRequest = {
  email: string;
  password: string;
  fullname: string;
  username: string;
  nickname: string;
};

export type AuthRequestResult = {
  user?: CognitoUser | null;
  success: boolean;
  message?: string;
  errorMessage?: string;
};
