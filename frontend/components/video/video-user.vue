<template>
  <div v-if="streamManager" class="video-user">
    <video-element :stream-manager="streamManager" />
  </div>
</template>

<script>
export default {
  name: 'video-user',

  props: {
    streamManager: {
      type: Object,
      default: null,
    },
  },

  computed: {
    clientData() {
      const { clientData } = this.getConnectionData();
      return clientData;
    },
  },

  methods: {
    getConnectionData() {
      const { connection } = this.streamManager.stream;
      return JSON.parse(connection.data);
    },
  },
};
</script>
