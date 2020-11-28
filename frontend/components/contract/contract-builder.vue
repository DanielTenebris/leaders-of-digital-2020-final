<template>
  <div class="contract-builder">
    <div id="blocklyDiv" style="height: 830px; width: 100%"></div>

    <ui-button> Сохранить </ui-button>
  </div>
</template>

<script>
import Blockly from 'blockly';

export default {
  name: 'contract-builder',

  props: {
    workspace: {
      type: String,
      default: '',
    },
    toolbox: {
      type: String,
      default: '',
    },
  },

  mounted() {
    if (!this.toolbox) return;
    var options = {
      toolbox: Blockly.Xml.textToDom(this.toolbox),
      collapse: true,
      comments: false,
      disable: false,
      maxBlocks: Infinity,
      trashcan: false,
      horizontalLayout: false,
      toolboxPosition: 'start',
      css: true,
      media: 'https://blockly-demo.appspot.com/static/media/',
      rtl: false,
      scrollbars: true,
      sounds: false,
      oneBasedIndex: false,
    };

    var workspace = Blockly.inject(
      document.getElementById('blocklyDiv'),
      options,
    );

    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(this.workspace),
      workspace,
    );
  },
};
</script>

<style lang="scss">
.contract-builder {
  position: static;
  top: 10px;
}
</style>
