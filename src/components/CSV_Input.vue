<template>

    <!--
    <input type="file" v-on:change="uploadFile($event)">
    <button v-if="csvSelected" v-on:click="readCSV()">Parse Log Data</button>
    -->
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-file 
          outlined 
          v-model="file"
          accept=".csv"
          style="height: 40px"
        >
          <q-icon name="attach_file" size="2em" style="padding:20px" />
        </q-file>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent ({
  name: "csv-input",
  setup() {
    const file = ref(null);
    
    return {
      file,
    }

  }
  /*
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
  */

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 

</style>
