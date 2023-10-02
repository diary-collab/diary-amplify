/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDiaryInput = {
  diaryId: string;
  diaryOwnerId: string;
  diaryOwnerName: string;
  diaryName: string;
  diaryType: EnumDiaryType;
  diarySchoolName: string;
  diaryPassword?: string | null;
  createdOn?: string | null;
  updatedOn?: string | null;
};

export enum EnumDiaryType {
  murid = 'murid',
  guru = 'guru',
  sekolah = 'sekolah',
  kelas = 'kelas',
}

export type ModelDiaryConditionInput = {
  diaryOwnerId?: ModelStringInput | null;
  diaryOwnerName?: ModelStringInput | null;
  diaryName?: ModelStringInput | null;
  diaryType?: ModelEnumDiaryTypeInput | null;
  diarySchoolName?: ModelStringInput | null;
  diaryPassword?: ModelStringInput | null;
  createdOn?: ModelStringInput | null;
  updatedOn?: ModelStringInput | null;
  and?: Array<ModelDiaryConditionInput | null> | null;
  or?: Array<ModelDiaryConditionInput | null> | null;
  not?: ModelDiaryConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelEnumDiaryTypeInput = {
  eq?: EnumDiaryType | null;
  ne?: EnumDiaryType | null;
};

export type Diary = {
  __typename: 'Diary';
  diaryId: string;
  diaryOwnerId: string;
  diaryOwnerName: string;
  diaryName: string;
  diaryType: EnumDiaryType;
  diarySchoolName: string;
  diaryPassword?: string | null;
  createdOn: string;
  updatedOn: string;
  pages?: ModelPageConnection | null;
};

export type ModelPageConnection = {
  __typename: 'ModelPageConnection';
  items: Array<Page | null>;
  nextToken?: string | null;
};

export type Page = {
  __typename: 'Page';
  pageId: string;
  diaryId: string;
  diary?: Diary | null;
  pageContent: PageContent;
  pageType: EnumPageType;
  createdOn: string;
  updatedOn: string;
};

export type PageContent = {
  __typename: 'PageContent';
  mood: string;
  imageUrl: string;
  activityDetail: string;
};

export enum EnumPageType {
  absen_datang = 'absen_datang',
  absen_pulang = 'absen_pulang',
  pengunguman_kelas = 'pengunguman_kelas',
  pengunguman_sekolah = 'pengunguman_sekolah',
  laporan_kegiatan = 'laporan_kegiatan',
  laporan_nilai = 'laporan_nilai',
}

export type UpdateDiaryInput = {
  diaryId: string;
  diaryOwnerId?: string | null;
  diaryOwnerName?: string | null;
  diaryName?: string | null;
  diaryType?: EnumDiaryType | null;
  diarySchoolName?: string | null;
  diaryPassword?: string | null;
  createdOn?: string | null;
  updatedOn?: string | null;
};

export type DeleteDiaryInput = {
  diaryId: string;
};

export type CreateTesttableInput = {
  id?: string | null;
};

export type ModelTesttableConditionInput = {
  and?: Array<ModelTesttableConditionInput | null> | null;
  or?: Array<ModelTesttableConditionInput | null> | null;
  not?: ModelTesttableConditionInput | null;
};

export type testtable = {
  __typename: 'testtable';
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateTesttableInput = {
  id: string;
};

export type DeleteTesttableInput = {
  id: string;
};

export type CreatePageInput = {
  pageId: string;
  diaryId: string;
  pageContent: PageContentInput;
  pageType: EnumPageType;
  createdOn?: string | null;
  updatedOn?: string | null;
};

export type PageContentInput = {
  mood: string;
  imageUrl: string;
  activityDetail: string;
};

export type ModelPageConditionInput = {
  diaryId?: ModelIDInput | null;
  pageType?: ModelEnumPageTypeInput | null;
  createdOn?: ModelStringInput | null;
  updatedOn?: ModelStringInput | null;
  and?: Array<ModelPageConditionInput | null> | null;
  or?: Array<ModelPageConditionInput | null> | null;
  not?: ModelPageConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelEnumPageTypeInput = {
  eq?: EnumPageType | null;
  ne?: EnumPageType | null;
};

export type UpdatePageInput = {
  pageId: string;
  diaryId?: string | null;
  pageContent?: PageContentInput | null;
  pageType?: EnumPageType | null;
  createdOn?: string | null;
  updatedOn?: string | null;
};

export type DeletePageInput = {
  pageId: string;
};

export type ModelDiaryFilterInput = {
  diaryId?: ModelIDInput | null;
  diaryOwnerId?: ModelStringInput | null;
  diaryOwnerName?: ModelStringInput | null;
  diaryName?: ModelStringInput | null;
  diaryType?: ModelEnumDiaryTypeInput | null;
  diarySchoolName?: ModelStringInput | null;
  diaryPassword?: ModelStringInput | null;
  createdOn?: ModelStringInput | null;
  updatedOn?: ModelStringInput | null;
  and?: Array<ModelDiaryFilterInput | null> | null;
  or?: Array<ModelDiaryFilterInput | null> | null;
  not?: ModelDiaryFilterInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelDiaryConnection = {
  __typename: 'ModelDiaryConnection';
  items: Array<Diary | null>;
  nextToken?: string | null;
};

export type ModelTesttableFilterInput = {
  id?: ModelIDInput | null;
  and?: Array<ModelTesttableFilterInput | null> | null;
  or?: Array<ModelTesttableFilterInput | null> | null;
  not?: ModelTesttableFilterInput | null;
};

export type ModelTesttableConnection = {
  __typename: 'ModelTesttableConnection';
  items: Array<testtable | null>;
  nextToken?: string | null;
};

export type ModelPageFilterInput = {
  pageId?: ModelIDInput | null;
  diaryId?: ModelIDInput | null;
  pageType?: ModelEnumPageTypeInput | null;
  createdOn?: ModelStringInput | null;
  updatedOn?: ModelStringInput | null;
  and?: Array<ModelPageFilterInput | null> | null;
  or?: Array<ModelPageFilterInput | null> | null;
  not?: ModelPageFilterInput | null;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelSubscriptionDiaryFilterInput = {
  diaryId?: ModelSubscriptionIDInput | null;
  diaryOwnerId?: ModelSubscriptionStringInput | null;
  diaryOwnerName?: ModelSubscriptionStringInput | null;
  diaryName?: ModelSubscriptionStringInput | null;
  diaryType?: ModelSubscriptionStringInput | null;
  diarySchoolName?: ModelSubscriptionStringInput | null;
  diaryPassword?: ModelSubscriptionStringInput | null;
  createdOn?: ModelSubscriptionStringInput | null;
  updatedOn?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionDiaryFilterInput | null> | null;
  or?: Array<ModelSubscriptionDiaryFilterInput | null> | null;
};

export type ModelSubscriptionIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  in?: Array<string | null> | null;
  notIn?: Array<string | null> | null;
};

export type ModelSubscriptionTesttableFilterInput = {
  id?: ModelSubscriptionIDInput | null;
  and?: Array<ModelSubscriptionTesttableFilterInput | null> | null;
  or?: Array<ModelSubscriptionTesttableFilterInput | null> | null;
};

export type ModelSubscriptionPageFilterInput = {
  pageId?: ModelSubscriptionIDInput | null;
  diaryId?: ModelSubscriptionIDInput | null;
  pageType?: ModelSubscriptionStringInput | null;
  createdOn?: ModelSubscriptionStringInput | null;
  updatedOn?: ModelSubscriptionStringInput | null;
  and?: Array<ModelSubscriptionPageFilterInput | null> | null;
  or?: Array<ModelSubscriptionPageFilterInput | null> | null;
};

export type CreateDiaryMutationVariables = {
  input: CreateDiaryInput;
  condition?: ModelDiaryConditionInput | null;
};

export type CreateDiaryMutation = {
  createDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type UpdateDiaryMutationVariables = {
  input: UpdateDiaryInput;
  condition?: ModelDiaryConditionInput | null;
};

export type UpdateDiaryMutation = {
  updateDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type DeleteDiaryMutationVariables = {
  input: DeleteDiaryInput;
  condition?: ModelDiaryConditionInput | null;
};

export type DeleteDiaryMutation = {
  deleteDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type CreateTesttableMutationVariables = {
  input: CreateTesttableInput;
  condition?: ModelTesttableConditionInput | null;
};

export type CreateTesttableMutation = {
  createTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateTesttableMutationVariables = {
  input: UpdateTesttableInput;
  condition?: ModelTesttableConditionInput | null;
};

export type UpdateTesttableMutation = {
  updateTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteTesttableMutationVariables = {
  input: DeleteTesttableInput;
  condition?: ModelTesttableConditionInput | null;
};

export type DeleteTesttableMutation = {
  deleteTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreatePageMutationVariables = {
  input: CreatePageInput;
  condition?: ModelPageConditionInput | null;
};

export type CreatePageMutation = {
  createPage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};

export type UpdatePageMutationVariables = {
  input: UpdatePageInput;
  condition?: ModelPageConditionInput | null;
};

export type UpdatePageMutation = {
  updatePage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};

export type DeletePageMutationVariables = {
  input: DeletePageInput;
  condition?: ModelPageConditionInput | null;
};

export type DeletePageMutation = {
  deletePage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};

export type GetDiaryQueryVariables = {
  diaryId: string;
};

export type GetDiaryQuery = {
  getDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type ListDiariesQueryVariables = {
  diaryId?: string | null;
  filter?: ModelDiaryFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListDiariesQuery = {
  listDiaries?: {
    __typename: 'ModelDiaryConnection';
    items: Array<{
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetTesttableQueryVariables = {
  id: string;
};

export type GetTesttableQuery = {
  getTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListTesttablesQueryVariables = {
  filter?: ModelTesttableFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListTesttablesQuery = {
  listTesttables?: {
    __typename: 'ModelTesttableConnection';
    items: Array<{
      __typename: 'testtable';
      id: string;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetPageQueryVariables = {
  pageId: string;
};

export type GetPageQuery = {
  getPage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};

export type ListPagesQueryVariables = {
  pageId?: string | null;
  filter?: ModelPageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListPagesQuery = {
  listPages?: {
    __typename: 'ModelPageConnection';
    items: Array<{
      __typename: 'Page';
      pageId: string;
      diaryId: string;
      diary?: {
        __typename: 'Diary';
        diaryId: string;
        diaryOwnerId: string;
        diaryOwnerName: string;
        diaryName: string;
        diaryType: EnumDiaryType;
        diarySchoolName: string;
        diaryPassword?: string | null;
        createdOn: string;
        updatedOn: string;
      } | null;
      pageContent: {
        __typename: 'PageContent';
        mood: string;
        imageUrl: string;
        activityDetail: string;
      };
      pageType: EnumPageType;
      createdOn: string;
      updatedOn: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type PagesByDiaryIdAndCreatedOnQueryVariables = {
  diaryId: string;
  createdOn?: ModelStringKeyConditionInput | null;
  sortDirection?: ModelSortDirection | null;
  filter?: ModelPageFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type PagesByDiaryIdAndCreatedOnQuery = {
  pagesByDiaryIdAndCreatedOn?: {
    __typename: 'ModelPageConnection';
    items: Array<{
      __typename: 'Page';
      pageId: string;
      diaryId: string;
      diary?: {
        __typename: 'Diary';
        diaryId: string;
        diaryOwnerId: string;
        diaryOwnerName: string;
        diaryName: string;
        diaryType: EnumDiaryType;
        diarySchoolName: string;
        diaryPassword?: string | null;
        createdOn: string;
        updatedOn: string;
      } | null;
      pageContent: {
        __typename: 'PageContent';
        mood: string;
        imageUrl: string;
        activityDetail: string;
      };
      pageType: EnumPageType;
      createdOn: string;
      updatedOn: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateDiarySubscriptionVariables = {
  filter?: ModelSubscriptionDiaryFilterInput | null;
};

export type OnCreateDiarySubscription = {
  onCreateDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type OnUpdateDiarySubscriptionVariables = {
  filter?: ModelSubscriptionDiaryFilterInput | null;
};

export type OnUpdateDiarySubscription = {
  onUpdateDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type OnDeleteDiarySubscriptionVariables = {
  filter?: ModelSubscriptionDiaryFilterInput | null;
};

export type OnDeleteDiarySubscription = {
  onDeleteDiary?: {
    __typename: 'Diary';
    diaryId: string;
    diaryOwnerId: string;
    diaryOwnerName: string;
    diaryName: string;
    diaryType: EnumDiaryType;
    diarySchoolName: string;
    diaryPassword?: string | null;
    createdOn: string;
    updatedOn: string;
    pages?: {
      __typename: 'ModelPageConnection';
      items: Array<{
        __typename: 'Page';
        pageId: string;
        diaryId: string;
        pageType: EnumPageType;
        createdOn: string;
        updatedOn: string;
      } | null>;
      nextToken?: string | null;
    } | null;
  } | null;
};

export type OnCreateTesttableSubscriptionVariables = {
  filter?: ModelSubscriptionTesttableFilterInput | null;
};

export type OnCreateTesttableSubscription = {
  onCreateTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateTesttableSubscriptionVariables = {
  filter?: ModelSubscriptionTesttableFilterInput | null;
};

export type OnUpdateTesttableSubscription = {
  onUpdateTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteTesttableSubscriptionVariables = {
  filter?: ModelSubscriptionTesttableFilterInput | null;
};

export type OnDeleteTesttableSubscription = {
  onDeleteTesttable?: {
    __typename: 'testtable';
    id: string;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreatePageSubscriptionVariables = {
  filter?: ModelSubscriptionPageFilterInput | null;
};

export type OnCreatePageSubscription = {
  onCreatePage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};

export type OnUpdatePageSubscriptionVariables = {
  filter?: ModelSubscriptionPageFilterInput | null;
};

export type OnUpdatePageSubscription = {
  onUpdatePage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};

export type OnDeletePageSubscriptionVariables = {
  filter?: ModelSubscriptionPageFilterInput | null;
};

export type OnDeletePageSubscription = {
  onDeletePage?: {
    __typename: 'Page';
    pageId: string;
    diaryId: string;
    diary?: {
      __typename: 'Diary';
      diaryId: string;
      diaryOwnerId: string;
      diaryOwnerName: string;
      diaryName: string;
      diaryType: EnumDiaryType;
      diarySchoolName: string;
      diaryPassword?: string | null;
      createdOn: string;
      updatedOn: string;
      pages?: {
        __typename: 'ModelPageConnection';
        nextToken?: string | null;
      } | null;
    } | null;
    pageContent: {
      __typename: 'PageContent';
      mood: string;
      imageUrl: string;
      activityDetail: string;
    };
    pageType: EnumPageType;
    createdOn: string;
    updatedOn: string;
  } | null;
};
