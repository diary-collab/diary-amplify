/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDiary = /* GraphQL */ `
  query GetDiary($diaryId: ID!) {
    getDiary(diaryId: $diaryId) {
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
export const listDiaries = /* GraphQL */ `
  query ListDiaries(
    $diaryId: ID
    $filter: ModelDiaryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listDiaries(
      diaryId: $diaryId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getTesttable = /* GraphQL */ `
  query GetTesttable($id: ID!) {
    getTesttable(id: $id) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTesttables = /* GraphQL */ `
  query ListTesttables(
    $filter: ModelTesttableFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTesttables(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPage = /* GraphQL */ `
  query GetPage($pageId: ID!) {
    getPage(pageId: $pageId) {
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
export const listPages = /* GraphQL */ `
  query ListPages(
    $pageId: ID
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPages(
      pageId: $pageId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const pagesByDiaryIdAndCreatedOn = /* GraphQL */ `
  query PagesByDiaryIdAndCreatedOn(
    $diaryId: ID!
    $createdOn: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    pagesByDiaryIdAndCreatedOn(
      diaryId: $diaryId
      createdOn: $createdOn
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
