import { IComponent } from './dynamic-rendering.interfaces';

const mockResponse: IComponent = {
  type: 'Container',
  data: {
    id: '4400936b-6158-1354-9dc8-a04c57e1af46',
    className: 'flex flex-col justify-center items-center min-w-full gap-y-10',
    fluid: false,
    items: [
      {
        type: 'Card',
        data: {
          id: '26b3f355-2f65-4aae-b9fd-609779f24fdd',
          title: 'A custom title',
          headline: 'A random Headline',
          copy: 'A really long text....',
          className: 'w-1/4',
        },
      },
      {
        type: 'Divider',
        data: {
          id: '4400936b-6158-4943-9dc8-dsfhjs32723',
          marginY: 5,
        },
      },
      {
        type: 'Card',
        data: {
          id: '4400936b-6158-4943-9dc8-a04c57e1af46',
          title: 'Title',
          headline: 'This can be anything',
          copy: 'A really long text....',
          image: {
            url: 'https://i.stack.imgur.com/y9DpT.jpg',
          },
        },
      },
      {
        type: 'Divider',
        data: {
          id: '4400936b-6158-4845-9dc8-dsfhjs32723',
          marginY: 5,
        },
      },
      {
        type: 'Container',
        data: {
          id: 'd76e3a5f-01ad-46f6-a45d-3ad9699ecf99',
          embeddedView: {
            type: 'Form',
            data: {
              id: '26b3f355-2f65-4aae-b9fd-609779f24fdd',
              itemsForm: [
                {
                  labelText: { accountType: '' },
                  labelFor: 'username',
                  id: 'username',
                  name: 'username',
                  type: 'text',
                  autoComplete: 'username',
                  isRequired: false,
                  placeholder: 'Username',
                  titlekey: 'title_username',
                },
                {
                  labelText: 'Fullname / Organisation name',
                  labelFor: 'fullname',
                  id: 'fullname',
                  name: 'fullname',
                  type: 'text',
                  autoComplete: 'fullname',
                  isRequired: true,
                  placeholder: 'Name without any salutations',
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
                  validation: {
                    required: `email must be filled!`,
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi,
                      message: 'Please input a valid email!',
                    },
                  },
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
              ],
            },
          },
        },
      },
    ],
  },
};

export default mockResponse;
