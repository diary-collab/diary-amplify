/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDiary = /* GraphQL */ `
  subscription OnCreateDiary($filter: ModelSubscriptionDiaryFilterInput) {
    onCreateDiary(filter: $filter) {
      diaryId
      diaryOwnerId
      diaryOwnerName
      diaryName
      diaryType
      diarySchoolName
      diaryPassword
      createdOn
      updatedOn
      pages {
        items {
          pageId
          diaryId
          pageType
          createdOn
          updatedOn
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onUpdateDiary = /* GraphQL */ `
  subscription OnUpdateDiary($filter: ModelSubscriptionDiaryFilterInput) {
    onUpdateDiary(filter: $filter) {
      diaryId
      diaryOwnerId
      diaryOwnerName
      diaryName
      diaryType
      diarySchoolName
      diaryPassword
      createdOn
      updatedOn
      pages {
        items {
          pageId
          diaryId
          pageType
          createdOn
          updatedOn
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onDeleteDiary = /* GraphQL */ `
  subscription OnDeleteDiary($filter: ModelSubscriptionDiaryFilterInput) {
    onDeleteDiary(filter: $filter) {
      diaryId
      diaryOwnerId
      diaryOwnerName
      diaryName
      diaryType
      diarySchoolName
      diaryPassword
      createdOn
      updatedOn
      pages {
        items {
          pageId
          diaryId
          pageType
          createdOn
          updatedOn
          __typename
        }
        nextToken
        __typename
      }
      __typename
    }
  }
`;
export const onCreateTesttable = /* GraphQL */ `
  subscription OnCreateTesttable(
    $filter: ModelSubscriptionTesttableFilterInput
  ) {
    onCreateTesttable(filter: $filter) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTesttable = /* GraphQL */ `
  subscription OnUpdateTesttable(
    $filter: ModelSubscriptionTesttableFilterInput
  ) {
    onUpdateTesttable(filter: $filter) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTesttable = /* GraphQL */ `
  subscription OnDeleteTesttable(
    $filter: ModelSubscriptionTesttableFilterInput
  ) {
    onDeleteTesttable(filter: $filter) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePage = /* GraphQL */ `
  subscription OnCreatePage($filter: ModelSubscriptionPageFilterInput) {
    onCreatePage(filter: $filter) {
      pageId
      diaryId
      diary {
        diaryId
        diaryOwnerId
        diaryOwnerName
        diaryName
        diaryType
        diarySchoolName
        diaryPassword
        createdOn
        updatedOn
        pages {
          nextToken
          __typename
        }
        __typename
      }
      pageContent {
        mood
        imageUrl
        activityDetail
        __typename
      }
      pageType
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onUpdatePage = /* GraphQL */ `
  subscription OnUpdatePage($filter: ModelSubscriptionPageFilterInput) {
    onUpdatePage(filter: $filter) {
      pageId
      diaryId
      diary {
        diaryId
        diaryOwnerId
        diaryOwnerName
        diaryName
        diaryType
        diarySchoolName
        diaryPassword
        createdOn
        updatedOn
        pages {
          nextToken
          __typename
        }
        __typename
      }
      pageContent {
        mood
        imageUrl
        activityDetail
        __typename
      }
      pageType
      createdOn
      updatedOn
      __typename
    }
  }
`;
export const onDeletePage = /* GraphQL */ `
  subscription OnDeletePage($filter: ModelSubscriptionPageFilterInput) {
    onDeletePage(filter: $filter) {
      pageId
      diaryId
      diary {
        diaryId
        diaryOwnerId
        diaryOwnerName
        diaryName
        diaryType
        diarySchoolName
        diaryPassword
        createdOn
        updatedOn
        pages {
          nextToken
          __typename
        }
        __typename
      }
      pageContent {
        mood
        imageUrl
        activityDetail
        __typename
      }
      pageType
      createdOn
      updatedOn
      __typename
    }
  }
`;
