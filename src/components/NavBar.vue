<template>
    <div v-if="toolsLocked">
        <q-tabs vertical>
            <q-tab v-for="pageLink of lockedPageList" v-bind:key="pageLink" @click="$emit('pageSelected', pageLink)">{{pageLink}}</q-tab>
        </q-tabs>
        <br>
        <p id="acceptReqsNotif">
            To access the openEJ tools, please first confirm you have met the requirements on the <a href="" @click="$emit('pageSelected', 'Home')">Home Page</a>.
        </p>
    </div>

    <div v-if="!toolsLocked">
         <q-tabs vertical>
            <q-tab v-for="pageLink of unlockedPageList" v-bind:key="pageLink" @click="$emit('pageSelected', pageLink)">{{pageLink}}</q-tab>
        </q-tabs>
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
import { Prop } from 'vue-property-decorator';

export default class NavBar extends Vue {
    @Prop({default: true, required: true}) toolsLocked!: boolean;
    //pages available before they accept requirement/disclaimer
    lockedPageList= ['Home', 'About']
    //all pages
    unlockedPageList = ['Home', 'Closed Loop MAF Scaling', 'Open Loop MAF Scaling', 'Tip in Enrichment', 'About'];

}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#acceptReqsNotif {
    padding: 10px;
}

</style>