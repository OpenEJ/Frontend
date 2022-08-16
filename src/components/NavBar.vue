<template>
    <ul class="nav flex-column">
        <li class="nav-item" v-for="pageLink of pages" v-bind:key="pageLink">
            <a class="nav-link" href="#" @click="$emit('pageSelected', pageLink)">{{pageLink}}</a>
        </li>
    </ul>

</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class NavBar extends Vue {
  pages = ['Home', 'Closed Loop MAF Scaling', 'About'];
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>