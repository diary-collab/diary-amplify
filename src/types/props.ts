/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionData } from './use-session';

export interface LayoutProps {
  children: React.ReactNode;
  params: {
    sessionData: SessionData | null;
    data: any;
  };
}
