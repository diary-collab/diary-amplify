// 'use client';

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { CognitoUser } from '@aws-amplify/auth';
// // import usePush from '@utils/UsePush';
// import { Auth, Hub } from 'aws-amplify';
// import { useRouter } from 'next/router';
// import {
//   createContext,
//   Dispatch,
//   ReactElement,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useState,
// } from 'react';

// import logger from '@src/lib/logger';

// import PrivateRoute from '@src/components/protectedroute/private-route';

// interface UserContextType {
//   user: CognitoUser | null;
//   setUser: Dispatch<SetStateAction<CognitoUser | null>>;
//   loading: boolean;
//   setLoading: Dispatch<SetStateAction<boolean>>;
//   authenticated: boolean;
//   setAuthenticated: Dispatch<SetStateAction<boolean>>;
// }

// const UserContext = createContext<UserContextType>({} as UserContextType);

// interface Props {
//   children: React.ReactElement;
// }

// export default function AuthContext(
//   this: any,
//   { children }: Props
// ): ReactElement {
//   const [user, setUser] = useState<CognitoUser | null>(null);

//   const [loading, setLoading] = useState<boolean>(false);
//   const [authenticated, setAuthenticated] = useState<boolean>(false);
//   const [username, setUsername] = useState<string>('');
//   // const push = usePush();
//   // const router = useRouter();

//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   async function checkUser() {
//     setLoading(true);
//     // const logger = new Logger('My-Logger');
//     logger('trigger user check');

//     try {
//       logger(username);
//       const amplifyUser = await Auth.currentAuthenticatedUser();
//       setUser(amplifyUser);
//       setAuthenticated(true);
//       setLoading(false);
//       setUsername(amplifyUser.getUsername());
//     } catch (error) {
//       // No current signed in user.
//       setUser(null);
//       setAuthenticated(false);
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     checkUser();
//   });

//   useEffect(() => {
//     logger('trigger user hub');
//     const listener = () => {
//       // checkUser();
//     };

//     Hub.listen('auth', listener);
//   });

//   useEffect(() => {
//     // console.log("loading-ganti: ", loading);
//   }, [loading]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         setUser,
//         loading,
//         setLoading,
//         authenticated,
//         setAuthenticated,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// }

// interface IProtectRoute {
//   children?: any;
// }

// export const ProtectRoute = ({ children }: IProtectRoute) => {
//   const { authenticated, user } = useUser();
//   // const push = usePush();
//   const router = useRouter();

//   if (!authenticated) {
//     if (
//       !router.pathname.includes('login') &&
//       !router.pathname.includes('signup') &&
//       !router.pathname.includes('verifyuser') &&
//       !router.pathname.includes('forgotpassword') &&
//       router.pathname !== '/'
//     ) {
//       return <PrivateRoute user={user} success={authenticated} />;
//     } else {
//       return children;
//     }
//   } else {
//     if (
//       router.pathname.includes('login') ||
//       router.pathname.includes('signup') ||
//       router.pathname.includes('verifyuser') ||
//       router.pathname.includes('forgotpassword')
//     ) {
//       return <PrivateRoute user={user} success={authenticated} />;
//     } else {
//       return children;
//     }
//   }
// };

// export const useUser = (): UserContextType => useContext(UserContext);
