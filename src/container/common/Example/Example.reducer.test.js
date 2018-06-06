import { fromJS } from 'immutable';
import { ExampleReducer, initialState } from './Example.reducer';
import { upsertPosts } from './Example.action';

const samplePosts = {
  s1: {
    id: 1,
    title: 'sample title1',
    content: 'sample content1',
    order: 0,
    created_at: '2015-04-03T10:41:44.000+09:00',
    updated_at: '2015-04-03T10:41:44.000+09:00',
  },
  s2: {
    id: 2,
    title: 'sample title2',
    content: 'sample content2',
    order: 0,
    created_at: '2015-04-03T10:41:44.000+09:00',
    updated_at: '2015-04-03T10:41:44.000+09:00',
  },
  s3: {
    id: 3,
    title: 'sample title3',
    content: 'sample content3',
    order: 0,
    created_at: '2015-04-03T10:41:44.000+09:00',
    updated_at: '2015-04-03T10:41:44.000+09:00',
  },
  s3a: {
    id: 3,
    title: 'sample title3a',
    content: 'sample content3a',
    order: 0,
    created_at: '2015-04-03T10:41:44.000+09:00',
    updated_at: '2015-04-03T10:41:44.000+09:00',
  },
};

describe('Example reducer', () => {
  it('initialState', () => {
    expect(ExampleReducer(undefined, {})).toEqual(initialState);
  });
  describe('upsertPosts', () => {
    it('upsertPosts', () => {
      const sample = ExampleReducer(initialState, upsertPosts([samplePosts.s1, samplePosts.s2]));
      const answer = initialState.set('posts', fromJS([samplePosts.s1, samplePosts.s2]));
      expect(sample).toEqual(answer);
    });

    it('upsertPosts many', () => {
      const sampleStep1 = ExampleReducer(ExampleReducer.initialState, upsertPosts([samplePosts.s1, samplePosts.s2]));
      const sampleStep2 = ExampleReducer(sampleStep1, upsertPosts([samplePosts.s3]));
      const answer = initialState.set('posts', fromJS([samplePosts.s1, samplePosts.s2, samplePosts.s3]));
      expect(sampleStep2).toEqual(answer);
    });

    it('upsertPosts duplicated post', () => {
      const sampleStep1 = ExampleReducer(ExampleReducer.initialState, upsertPosts([samplePosts.s1, samplePosts.s3, samplePosts.s2]));
      const sampleStep2 = ExampleReducer(sampleStep1, upsertPosts([samplePosts.s3a]));
      const answer = initialState.set('posts', fromJS([samplePosts.s1, samplePosts.s3a, samplePosts.s2]));
      expect(sampleStep2).toEqual(answer);
    });
  });
});

