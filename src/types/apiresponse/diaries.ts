export interface IDiariesByIdentity {
  id: string;
  diaries: IDiaries[];
}

interface IDiaries {
  id: string;
  diaryName: string;
  diaryTag: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any;
  isAchived: boolean;
  createdAt: string;
  updatedAt: string;
}
