import { makeMapDispatchToProps } from 'general/util/redux';
import { get } from 'api/example';
import { upsertPosts } from './Example.action';


export const getPosts = ({ page }) => async (dispatch) => {
  const randomText = await get();
  const posts = [{
    id: page,
    title: `title${page}`,
    content: randomText.text_out,
  }];
  dispatch(upsertPosts(posts));
};


export default makeMapDispatchToProps({
  getPosts,
});
