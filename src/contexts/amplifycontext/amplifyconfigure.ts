'use client'; // this is required

import { API, Auth, Storage } from 'aws-amplify';

import { config } from './amplifyconfig';

API.configure(config);
Auth.configure(config);
Storage.configure(config);
