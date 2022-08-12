<template>
  <div class="hello">
    <p>
      Hello World
    </p>
    <input type="file" v-on:change="uploadFile($event)">
    <button v-if="csvSelected" v-on:click="normalize()">Normalize</button>
  </div>
</template>

<script lang="ts">
import LowMafLog from '../lowMafLog';
import { Vue } from 'vue-class-component';

export default class InputBox extends Vue{
  public csvSelected: boolean = false;
  private file!: File;
  public logs: LowMafLog[] = [];
  uploadFile(event: any) {
    console.log(event.target);
    console.log("File selected");
    this.file = event.target.files[0];
    if(this.file.type != 'text/csv'){
      this.csvSelected = false;
      console.log("Not a CSV");
    }else{
      this.csvSelected = true;
      console.log("ayye good shit");
      console.log("You uploaded: " + this.file.name);
      console.log(this.file);
    }
  }
  normalize() {
    console.log("Checking Data for Errors...");
    this.readFile();
  }
  
  async readFile() {
    console.log(this.file);
    let fileReader = new FileReader(); 
    //let data!: LowMafLog[];
    fileReader.readAsText(this.file); 
    //this.logs = this.genLowMafLogs(fileReader.result);
    fileReader.onload = async function() {
      let fileString = fileReader.result;
      if(typeof(fileString) == 'string'){
        let lines = fileString.split(/\r?\n/);
        let categories = lines[0].split(',');
        console.log(categories);
        let logs = [];
        for(let i = 1; i < lines.length; i++){
          if (lines[i] && lines[i] != ""){
            let lineData = lines[i].split(',');
            let log = new LowMafLog(categories, lineData);
            logs.push(log);
          }
        }
        console.log(JSON.stringify(logs));
        const apiUrl = "http://localhost:8000/api/analyze/0/";
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            body: JSON.stringify(logs)
          }
        })
        const data = await res.json();
        console.log(data);

      }
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
