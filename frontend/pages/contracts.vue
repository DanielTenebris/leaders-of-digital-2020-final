<template>
  <div class="contracts">
    <a-row type="flex" justify="space-between">
      <a-col :span="8">
        <ui-cloud header="Мои смарт-контракты">
          <div
            v-for="contract in contracts"
            :key="contract.id"
            :class="['contracts__preview', { active: contract.id === active }]"
            @click="choose(contract)"
          >
            <svg-icon class="doc" name="doc" />

            <span>{{ contract.label }}</span>

            <svg-icon
              class="trash"
              name="trash"
              @click.prevent.stop="remove(contract)"
            />
          </div>
          <ui-button type="primary" @click="create"> Добавить новый </ui-button>
        </ui-cloud>
      </a-col>
      <a-col :span="16">
        <ui-cloud>
          <contract-builder
            :key="active"
            :toolbox="builder.toolbox"
            :workspace="builder.workspace"
            @save="save"
          />
        </ui-cloud>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'contracts',
  async asyncData({ $axios }) {
    const { data: contracts } = await $axios.get('/contract');

    return {
      active: null,
      contracts,

      builder: {},

      defaultToolbox:
        '<xml id="toolbox" style="display: none"><category name="Variables" colour="#a55b80" custom="VARIABLE"></category><category name="Functions" colour="#995ba5" custom="PROCEDURE"></category><category name="Logic" colour="#5b80a5"><block type="controls_if"></block><block type="logic_compare"><field name="OP">EQ</field></block><block type="logic_operation"><field name="OP">AND</field></block><block type="logic_negate"></block><block type="logic_boolean"><field name="BOOL">TRUE</field></block><block type="logic_null"></block><block type="logic_ternary"></block></category><category name="Loops" colour="#5ba55b"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="controls_whileUntil"><field name="MODE">WHILE</field></block><block type="controls_for"><field name="VAR" id="}/_xMHO@JPwYClCh#qA`">i</field><value name="FROM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="BY"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="controls_forEach"><field name="VAR" id="|L0%dv_;nlya6uQ|6=M|">j</field></block><block type="controls_flow_statements"><field name="FLOW">BREAK</field></block></category><category name="Text" colour="#5ba58c"><block type="text"><field name="TEXT"></field></block><block type="text_join"><mutation items="2"></mutation></block><block type="text_append"><field name="VAR" id="QZq`Fq{xr6wy_`7y%voQ">item</field><value name="TEXT"><shadow type="text"><field name="TEXT"></field></shadow></value></block><block type="text_length"><value name="VALUE"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_isEmpty"><value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value></block><block type="text_indexOf"><field name="END">FIRST</field><value name="VALUE"><block type="variables_get"><field name="VAR" id="bo8PyBY#V0v^/K3GG`~2">text</field></block></value><value name="FIND"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_charAt"><mutation at="true"></mutation><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get"><field name="VAR" id="bo8PyBY#V0v^/K3GG`~2">text</field></block></value></block><block type="text_getSubstring"><mutation at1="true" at2="true"></mutation><field name="WHERE1">FROM_START</field><field name="WHERE2">FROM_START</field><value name="STRING"><block type="variables_get"><field name="VAR" id="bo8PyBY#V0v^/K3GG`~2">text</field></block></value></block><block type="text_changeCase"><field name="CASE">UPPERCASE</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_trim"><field name="MODE">BOTH</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_print"><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block><block type="text_prompt_ext"><mutation type="TEXT"></mutation><field name="TYPE">TEXT</field><value name="TEXT"><shadow type="text"><field name="TEXT">abc</field></shadow></value></block></category><category name="Lists" colour="#745ba5"><block type="lists_create_with"><mutation items="0"></mutation></block><block type="lists_create_with"><mutation items="3"></mutation></block><block type="lists_repeat"><value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><field name="END">FIRST</field><value name="VALUE"><block type="variables_get"><field name="VAR" id="YU%0=u_d!FF9=EbmeyFs">list</field></block></value></block><block type="lists_getIndex"><mutation statement="false" at="true"></mutation><field name="MODE">GET</field><field name="WHERE">FROM_START</field><value name="VALUE"><block type="variables_get"><field name="VAR" id="YU%0=u_d!FF9=EbmeyFs">list</field></block></value></block><block type="lists_setIndex"><mutation at="true"></mutation><field name="MODE">SET</field><field name="WHERE">FROM_START</field><value name="LIST"><block type="variables_get"><field name="VAR" id="YU%0=u_d!FF9=EbmeyFs">list</field></block></value></block><block type="lists_getSublist"><mutation at1="true" at2="true"></mutation><field name="WHERE1">FROM_START</field><field name="WHERE2">FROM_START</field><value name="LIST"><block type="variables_get"><field name="VAR" id="YU%0=u_d!FF9=EbmeyFs">list</field></block></value></block><block type="lists_split"><mutation mode="SPLIT"></mutation><field name="MODE">SPLIT</field><value name="DELIM"><shadow type="text"><field name="TEXT">,</field></shadow></value></block><block type="lists_sort"><field name="TYPE">NUMERIC</field><field name="DIRECTION">1</field></block></category></xml>',
      defaultWorkspace:
        '<xml id="workspaceBlocks" style="display: none"><variables><variable id="t3`7r*;T9_#ZqFA+0@$$">emitEvents</variable><variable id="7ua%o3X2]qa%FKNG|Xa5">variable</variable></variables><block type="procedures_defnoreturn" id="[P64)QePD#tN]+.M_.Un" x="38" y="113"><field name="NAME">start</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="variables_set" id="r:db=hABtrX?8Zj!;B7x"><field name="VAR" id="t3`7r*;T9_#ZqFA+0@$$">emitEvents</field><value name="VALUE"><block type="lists_create_with" id="j!~5N`iT~sb7HlzkqALm"><mutation items="0"></mutation></block></value><next><block type="variables_set" id="JvaJ,WB.i:~E?/9!Zy~o"><field name="VAR" id="7ua%o3X2]qa%FKNG|Xa5">variable</field><value name="VALUE"><block type="text" id="bT+|lpw2W7V+RIi`8:|i"><field name="TEXT">${variable}</field></block></value><next><block type="variables_set" id="tFDu3)!M:3j6MX05v%;C"><field name="VAR" id="7ua%o3X2]qa%FKNG|Xa5">variable</field><value name="VALUE"><block type="text" id="(CAbe`PgLpHTT9yeA]?j"><field name="TEXT">${variable}</field></block></value></block></next></block></next></block></statement></block><block type="procedures_defreturn" id="0tfEoB$p(Vx@d+Q?t3Z4" x="38" y="238"><field name="NAME">contract</field><comment pinned="false" h="80" w="160">Describe this function...</comment><statement name="STACK"><block type="procedures_callnoreturn" id="MWoeh#5|]=g/]+vg,=`j"><mutation name="start"></mutation></block></statement><value name="RETURN"><block type="variables_get" id="e*2C6k6*AP*vcC@Gm@G."><field name="VAR" id="t3`7r*;T9_#ZqFA+0@$$">emitEvents</field></block></value></block></xml>',
    };
  },

  methods: {
    choose(active) {
      this.builder = this.contracts.find(c => c.id === active.id);
      this.active = active.id;
    },

    async create() {
      await this.$axios.post('/contract', {
        toolbox: this.defaultToolbox,
        workspace: this.defaultWorkspace,
        label: 'Смарт-контракт',
        script: '',
      });

      const { data: contracts } = await this.$axios.get('/contract');
      this.contracts = contracts;
    },

    async save(blockly) {
      await this.$axios.put(`/contract/${this.active}`, {
        ...blockly,
      });

      const { data: contracts } = await this.$axios.get('/contract');
      this.contracts = contracts;
    },

    async remove({ id }) {
      await this.$axios.delete(`/contract/${id}`);

      const { data: contracts } = await this.$axios.get('/contract');
      this.contracts = contracts;
    },
  },
};
</script>

<style lang="scss">
.contracts {
  &__preview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 34px;
    margin-bottom: 30px;
    border: solid 1px #ededed;
    border-radius: 8px;
    cursor: pointer;
    span {
      font-family: Circe;
      font-size: 24px;
      font-style: normal;
      font-weight: 700;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: left;
      display: block;
      width: 100%;
      margin-left: 20px;
      padding-left: 10px;
    }
    > svg {
      &.doc {
        width: 26px;
        height: 34px;
        flex-shrink: 0;
      }
      &.trash {
        opacity: 0.5;
        width: 30px;
        height: 30px;
      }
    }
    img {
      height: 30px;
      width: 57px;
      flex-shrink: 0;
    }
    &.active {
      background-color: rgba(76, 94, 248, 0.05);
    }
  }
}
</style>
