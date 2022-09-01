<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="bi-gear-wide-connected" size="30px" />
          OpenEJ
        </q-toolbar-title>
      </q-toolbar>
        <NavBar @pageSelected="selectPage($event)" />   
      </q-header>

    <q-page-container>
      <Pages :pageSelected="pageSelected" />
    </q-page-container>

  </q-layout>

  <!--

  <div class="container">
    <div class="row">
      <div class="col-2">
        <NavBar @pageSelected="selectPage($event)" />
      </div>
      <div class="col-10">
        <Pages :pageSelected="pageSelected"/>
      </div>
    </div>
  </div>

  -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/NavBar.vue';
import Pages from './components/Pages.vue';

@Options({
  components: {
    Pages,
    NavBar
  },
})
export default class App extends Vue {
  pageSelected = 'Home';

  selectPage(page: string){
    if (typeof(page) == 'string'){
      this.pageSelected = page;
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
