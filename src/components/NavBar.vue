<template>
    <q-tabs align="left" v-for="pageLink of pages" v-bind:key="pageLink" >
        <q-tab v-bind:name="pageLink" v-bind:label="pageLink" @click="$emit('pageSelected', pageLink)"/>
    </q-tabs>    
    <!-- 

    <ul class="nav flex-column">
        <li class="nav-item" v-for="pageLink of pages" v-bind:key="pageLink">
            <a class="nav-link" href="#" @click="$emit('pageSelected', pageLink)">{{pageLink}}</a>
        </li>
    </ul>

    -->

</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class NavBar extends Vue {
  pages = ['Home', 'Closed Loop MAF Scaling', 'Open Loop MAF Scaling', 'Tip in Enrichment', 'About'];
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>