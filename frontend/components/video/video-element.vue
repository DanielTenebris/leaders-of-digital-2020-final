<template>
  <video autoplay width="100%" />
</template>

<script>
export default {
  name: 'video-element',

  props: {
    streamManager: {
      type: Object,
      default: () => ({}),
    },
  },

  mounted() {
    this.streamManager.addVideoElement(this.$el);
  },
};
</script>
