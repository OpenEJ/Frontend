<template>
    <div>
        <q-tabs vertical>
            <q-tab v-for="pageLink of pageList" v-bind:key="pageLink" @click="$emit('pageSelected', pageLink)">{{pageLink}}</q-tab>
        </q-tabs>
        <br>
    </div>

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
    //all pages
    pageList = ['Home', 'Closed Loop MAF Scaling', 'Open Loop MAF Scaling', 'Tip in Enrichment', 'Data Visualization', 'About'];

}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#acceptReqsNotif {
    padding: 10px;
}

</style>