<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into ../App.vue
3. Declare the components under 'components' in App.vue

-->

<template>
    <p>This new component works!</p>
</template>

<script lang="ts">
//Just regular TS here...

import Vue from 'vue-class-component';

export default class NewComponentName extends Vue {
    //declare variables and write functions here

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>