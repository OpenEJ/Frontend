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
          <th>Throttle Angle Change</th>
          <th>Correction</th>
          <th>Data Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="correction of corrections" v-bind:key="correction">
          <td><b>{{correction.throttle_angle_change}}</b></td>
          <td>{{correction.correction}}</td>
          <td>{{correction.frequency}}</td>
        </tr>
      </tbody>
    </table>
</template>

<script lang="ts">
//Just regular TS here...

import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import TieCorrections from '././tieCorrections';



export default class TIE_Output extends Vue {
        @Prop({default: [], required: true}) corrections!: TieCorrections[];


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>