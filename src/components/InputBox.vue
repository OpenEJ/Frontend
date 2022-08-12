<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Hello World
    </p>
    <input type="file"  ref="upload" v-on:change="uploadFile()">
    <button v-if="csvSelected" v-on:click="normalize()">Normalize</button>
  </div>
</template>

<script>
import LowMafLog from '../lowMafLog.ts';

export default {
  name: 'InputBox',
  data() {
    return {
      csvSelected: false,
      file: File,
      fileString: String,
    }
  },
  methods: {
    uploadFile() {
      console.log("File selected");
      this.file = this.$refs.upload.files[0];
      if(this.file.type != 'text/csv'){
        this.csvSelected = false;
        console.log("Not a CSV");
      }else{
        this.csvSelected = true;
        console.log("ayye good shit");
        console.log("You uploaded: " + this.file.name);
        console.log(this.file);
      }
    },
    normalize() {
      console.log("Checking Data for Errors...");
      this.readFile(this.file);
    },
    readFile(file) {
      let fileReader = new FileReader(); 
      fileReader.readAsText(file); 
      fileReader.onload = function() {
        this.fileString = fileReader.result;
        let lines = this.fileString.split(/\r?\n/);
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
      }; 
      fileReader.onerror = function() {
        alert(fileReader.error);
      }; 
    },
    async sendData(logs){
      let apiUrl = "/api/analyze/0";
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-type': 'applications/json',
          body: JSON.stringify(logs)
        }
      })

      const data = await res.json();
      console.log(data);
    }
      
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
