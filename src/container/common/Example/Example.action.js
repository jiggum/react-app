import { makeActionCreator } from 'general/util/redux';

export const exampleActionTypes = {
  UPSERT_POSTS__EXAMPLE: 'UPSERT_POSTS__EXAMPLE',
};

export const upsertPosts = makeActionCreator(
  exampleActionTypes.UPSERT_POSTS__EXAMPLE,
  'posts',
);
