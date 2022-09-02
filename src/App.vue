<template>
  <q-layout view="hHh LpR lFf">

    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-icon name="bi-gear-wide-connected" size="30px" />
          OpenEJ
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Navigation Drawer -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <NavBar @pageSelected="selectPage($event)" />
    </q-drawer>
    
    <!-- Page Body -->
    <q-page-container>
      <Pages :pageSelected="pageSelected" />
    </q-page-container>

    <!-- Page Footer -->
    <q-footer overlay elevated class="bg-dark text-white">
      <q-toolbar>
        <q-toolbar-title>
          Interested in this Project? Check out the code on github!
        </q-toolbar-title>
      </q-toolbar>
      <q-btn push size="15px" icon="bi-github" href="https://github.com/OpenEJ"/>
    </q-footer>

  </q-layout>

</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavBar from './components/NavBar.vue';
import Pages from './components/Pages.vue';
import { ref } from 'vue';
@Options({
  components: {
    Pages,
    NavBar
  },
})

export default class App extends Vue {
  pageSelected = 'Home';
  
  setup() {
      const leftDrawerOpen = ref(false);
      return {
        leftDrawerOpen,
        toggleLeftDrawer () {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        }
      }
  }

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
