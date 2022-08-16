<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into ../App.vue
3. Declare the components under 'components' in App.vue

-->

<template>
    <ClosedLoopMaf v-if="pageSelected == 'Closed Loop MAF Scaling'" />
</template>

<script lang="ts">
//Just regular TS here...

import { Options, Vue } from 'vue-class-component';
import ClosedLoopMaf from './Pages/ClosedLoopMaf';

@Options({
  components: {
    ClosedLoopMaf
  },
})

export default class Pages extends Vue {
    props: {
        pageSelected: string = 'Home ';
    }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>