import styled from 'vue-styled-components';

export default {
  name: 'TheMain',
  render(h) {
    return h(
      'main',
      {
        attrs: {
          class: 'sm-mt3 md-mt4 sm-mb4 narrow-container white'
        }
      },
      this.$slots.default
    );
  }
};
