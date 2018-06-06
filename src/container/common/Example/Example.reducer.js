/* external */
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

/* internal */
import { handleActions } from 'general/util/redux';

/* feature */
import { ExampleActionTypes } from './Example.action';

export const ExamplePropTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export const initialState = Map({
  posts: List(),
});

function upsertPosts(state, action) {
  const { posts } = action;
  const oldsPosts = state.get('posts');
  const updatedPosts = oldsPosts.map((oldPost) => {
    const updatedPost = posts.find(newPost => newPost.get('id') === oldPost.get('id'));
    return updatedPost || oldPost;
  }).concat(posts.filter(newPost => oldsPosts.findIndex(oldPost => newPost.get('id') === oldPost.get('id')) < 0));
  return state.set('posts', updatedPosts);
}

export const ExampleReducer = handleActions({
  [ExampleActionTypes.UPSERT_POSTS__EXAMPLE]: upsertPosts,
}, initialState);
