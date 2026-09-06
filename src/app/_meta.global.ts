export default {
  '*': {
    type: 'page',
  },
  index: 'Home',
  private: {
    type: 'page',
    display: 'hidden',
  },
  posts: {
    type: 'page',
    items: {
      // draft: {
      //     display: 'hidden'
      // }
    },
  },
};
