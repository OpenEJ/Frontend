<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into ../App.vue
3. Declare the components under 'components' in App.vue

-->

<template>
    <h1>Low Maf</h1>
    <img alt="Sedona Red Pearl Bugeye Impreza WRX" height="300" width="500" src="../../assets/carpic_0.jpg">
</template>

<script lang="ts">
//Just regular TS here...

import { Vue } from 'vue-class-component';

export default class ClosedLoopMaf extends Vue {
    title: string = 'Closed Loop Mass Air Flow Scaling';


}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>