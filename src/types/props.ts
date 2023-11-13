/* eslint-disable @typescript-eslint/no-explicit-any */
import { MiddlewareReturn, SessionData } from './use-session';

export interface LayoutProps {
  children: React.ReactNode;
  params: {
    sessionData: SessionData | null;
    accountData?: MiddlewareReturn | null;
    data: any;
  };
}
