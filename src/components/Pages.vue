<template>
    <Home v-if="pageSelected == 'Home'" />
    <ClosedLoopMaf v-else-if="pageSelected == 'Closed Loop MAF Scaling'" />
    <About v-else-if="pageSelected == 'About'" />
    <TipInEnrichment v-else-if="pageSelected == 'Tip in Enrichment'" />
    <OpenLoopMaf v-else-if="pageSelected == 'Open Loop MAF Scaling'" />
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import ClosedLoopMaf from './Pages/ClosedLoopMaf.vue';
import Home from './Pages/Home.vue';
import About from './Pages/About.vue';
import TipInEnrichment from './Pages/TipInEnrichment.vue'
import OpenLoopMaf from './Pages/OpenLoopMaf.vue'

@Options({
  components: {
    OpenLoopMaf,
    ClosedLoopMaf,
    TipInEnrichment,
    Home,
    About
  },
})

export default class Pages extends Vue {
    @Prop({default: 'Home', required: true}) pageSelected!: string;
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>