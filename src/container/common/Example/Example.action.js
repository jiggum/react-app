import { makeActionCreator } from 'general/util/redux';

export const ExampleActionTypes = {
  UPSERT_POSTS__EXAMPLE: 'UPSERT_POSTS__EXAMPLE',
};

export const upsertPosts = makeActionCreator(
  ExampleActionTypes.UPSERT_POSTS__EXAMPLE,
  'posts',
);
