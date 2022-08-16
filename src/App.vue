<template>
  <img alt="Sedona Red Pearl Bugeye Impreza WRX" height="300" width="500" src="./assets/lowmaf_icon_0.jpg">
  <InputBox/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import InputBox from './components/InputBox.vue';

@Options({
  components: {
    InputBox,
  },
})
export default class App extends Vue {}
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
