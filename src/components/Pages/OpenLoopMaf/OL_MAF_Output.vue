<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <table class="table">
      <thead>
        <tr>
          <th>Voltage</th>
          <th>Scale Value</th>
          <th>Data Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="scale of scales" v-bind:key="scale">
          <td><b>{{scale.MafVoltage}}</b></td>
          <td>{{scale.Correction}}</td>
          <td>{{scale.Frequency}}</td>
        </tr>
      </tbody>
    </table>
</template>

<script lang="ts">
//Just regular TS here...

import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import TopMafOutput from './topMafOutput';



export default class OL_MAF_Output extends Vue {
        @Prop({default: [], required: true}) scales!: TopMafOutput[];


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>