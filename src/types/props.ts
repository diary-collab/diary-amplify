import { SessionData } from './use-session';

export interface LayoutProps {
  children: React.ReactNode;
  params: {
    sessionData: SessionData | null;
  };
}
