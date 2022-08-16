<template>
  <div >
    <input type="file" v-on:change="uploadFile($event)">
    <button v-if="csvSelected" v-on:click="readCSV()">Generate Scales</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class CSV_Input extends Vue{
  csvSelected: boolean = false;
  file!: File;

  uploadFile(event: any) {
    this.csvSelected = false;
    this.file = event.target.files[0];
    if(this.file.type != 'text/csv'){
      this.csvSelected = false;
      console.log("Not a CSV");
    }else{
      this.csvSelected = true;
      console.log("You uploaded: " + this.file.name);
      console.log(this.file);
    }
  }

  readCSV() {
    let fileReader = new FileReader(); 
    fileReader.readAsText(this.file); 
    fileReader.onloadend = (() => {
      if(typeof(fileReader.result) == 'string'){
        let lines =fileReader.result.split(/\r?\n/);
        let categories = lines[0].split(',');
        this.$emit('csvProcessed', {categories: categories, lines: lines.slice(1)})
      }
    }); 

    fileReader.onerror = function() {
      alert(fileReader.error);
    };
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
