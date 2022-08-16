<template>
  <div class="container">
    <div class="row">
      <div class="col-2">
        <NavBar @pageSelected="selectPage($event)" />
      </div>
      <div class="col-10">
        <Pages/>
      </div>
    </div>
  </div>
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
  selectPage(page: string){
    console.log(page);
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
