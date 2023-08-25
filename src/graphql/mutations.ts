/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDiary = /* GraphQL */ `
  mutation CreateDiary(
    $input: CreateDiaryInput!
    $condition: ModelDiaryConditionInput
  ) {
    createDiary(input: $input, condition: $condition) {
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
export const updateDiary = /* GraphQL */ `
  mutation UpdateDiary(
    $input: UpdateDiaryInput!
    $condition: ModelDiaryConditionInput
  ) {
    updateDiary(input: $input, condition: $condition) {
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
export const deleteDiary = /* GraphQL */ `
  mutation DeleteDiary(
    $input: DeleteDiaryInput!
    $condition: ModelDiaryConditionInput
  ) {
    deleteDiary(input: $input, condition: $condition) {
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
export const createTesttable = /* GraphQL */ `
  mutation CreateTesttable(
    $input: CreateTesttableInput!
    $condition: ModelTesttableConditionInput
  ) {
    createTesttable(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTesttable = /* GraphQL */ `
  mutation UpdateTesttable(
    $input: UpdateTesttableInput!
    $condition: ModelTesttableConditionInput
  ) {
    updateTesttable(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTesttable = /* GraphQL */ `
  mutation DeleteTesttable(
    $input: DeleteTesttableInput!
    $condition: ModelTesttableConditionInput
  ) {
    deleteTesttable(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createPage = /* GraphQL */ `
  mutation CreatePage(
    $input: CreatePageInput!
    $condition: ModelPageConditionInput
  ) {
    createPage(input: $input, condition: $condition) {
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
export const updatePage = /* GraphQL */ `
  mutation UpdatePage(
    $input: UpdatePageInput!
    $condition: ModelPageConditionInput
  ) {
    updatePage(input: $input, condition: $condition) {
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
export const deletePage = /* GraphQL */ `
  mutation DeletePage(
    $input: DeletePageInput!
    $condition: ModelPageConditionInput
  ) {
    deletePage(input: $input, condition: $condition) {
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
