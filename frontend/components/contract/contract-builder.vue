<template>
  <div class="contract-builder">
    <div id="blocklyDiv" style="height: 800px; width: 1000px"></div>
  </div>
</template>

<script>
import Blockly from 'blockly';

export default {
  name: 'contract-builder',

  data() {
    return {
      toolbox: {
        kind: 'flyoutToolbox',
        contents: [
          {
            kind: 'block',
            type: 'controls_if',
          },
          {
            kind: 'block',
            type: 'controls_whileUntil',
          },
        ],
      },
    };
  },

  mounted() {
    Blockly.inject('blocklyDiv', {
      toolbox: this.toolbox,
    });
  },
};
</script>

<style></style>
