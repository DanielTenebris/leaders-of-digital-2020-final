<template>
  <div class="microphone" @click="start">начать стрим</div>
</template>

<script>
import WSAudioApi from 'ws-audio-api';

export default {
  name: 'microphone',

  data() {
    return {
      streamer: null,
    };
  },

  methods: {
    start() {
      this.streamer = WSAudioApi.Streamer({});
    },
  },
};
</script>

<style></style>
