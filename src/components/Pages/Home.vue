<!--

Remember to:
1. Change NewComponentName to the name of the component
2. Import this component via the file relative file path into parent component
3. Declare the component under 'components' in parent component

-->

<template>
    <h3>Welcome to OpenEJ</h3>
    <h5>Automated Subaru Tuning Utilities</h5>
    <div class="body">
        <QCard class="card">
            <div id="explanation">
                <h6>What This Is</h6>
                <p>
                    When it comes to tuning modified vehicles in racing and non-street applications, the standard options of doing this have always been: <br>
                    <ol>
                        <li>Pay a professional tuner to tune your vehicle $$$$</li>
                        <li>Buy generic off-the-shelf tunes to flash on your vehicle $$$</li>
                        <li>Tune your vehicles yourself $</li>
                    </ol>
                    Each of these options have drawbacks, however. Paying a professional tuner is usually extremely expensive. Buying a cheaper, generic tune is an option that many choose, but these often have reliability issues as they don't match a vehicle perfectly and frequently lead to issues later down the line. Tuning your vehicle yourself has been long thought to be out of the question. This is where the Tactrix OpenPort and RomRaider come in. These tools allow for data logging and ECU reflashing that simplify the tuning process greatly. The <a href="http://www.clicksoft.ro/A-Subie-Newbie-Tuning-Guide-1_0.pdf" target="_blank" rel="noopener">Complete Tuning Guide</a> goes over exactly how this works and how it should be done. The only gap remaining in the process is getting the logged data and turning it into numbers to modify in your ECU. That's where <b>OpenEJ</b> comes in. Our tools are designed to automate the invovled calculations for you so all you need to do is log data, upload it, and reflash.


                </p>
            </div>
        </QCard>
        <br>
        <QCard class="card">
            <div id="requirements">
            <h6>Requirements:</h6>
                <p>
                    <ul>
                        <li>
                            <a href="https://www.romraider.com/" target="_blank" rel="noopener">RomRaider</a> - A free and open source tool for logging data that works with Subaru vehicles
                        </li>
                        <li>
                            <a href="https://www.tactrix.com/index.php?option=com_content&view=category&layout=blog&id=36&Itemid=58" target="_blank" rel="noopener">Tactrix EcuFlash</a> - A ECU reflashing tool for Subaru vehicles that uses the OpenPort vehicles interface to reflash via OBDII
                        </li>
                        <li>
                            <a href="https://www.tactrix.com/index.php?option=com_virtuemart&page=shop.product_details&flypage=flypage.tpl&product_id=17&Itemid=53&redirected=1&Itemid=53" target="_blank" rel="noopener">Tactrix OpenPort 2.0</a> - The device used to communicate with the ECU over OBDII
                        </li>
                        <li>
                            An in-depth read of <a href="http://www.clicksoft.ro/A-Subie-Newbie-Tuning-Guide-1_0.pdf" target="_blank" rel="noopener">The Complete Tuning Guide</a>.
                        </li>
                        <li>
                           The understanding that by using this site, either directly or indirectly, you agree to assume 100% of all risk and openEJ's creators and contributors shall not be held responsible for any damages or injuries you may receive or cause.
                        </li>
                    </ul>
                    <q-btn @click="$emit(requirementsMet)">
                        I satisfy all of these requirements
                    </q-btn>
                </p>
            </div>
        </QCard>
        <br>
        <QCard class="card">
            <div id="process">
                <h6>The Process</h6>
                <p>
                    The 
                </p>
            </div>
        </QCard>
    </div>
</template>

<script lang="ts">
//Just regular TS here...

import { Vue } from 'vue-class-component';

export default class Home extends Vue {
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
    background-color: #e2e2e2;
    padding: 20px;
    text-align: left;
}
.body {
    text-align: center;
    padding-top: 30px;
    padding-left: 15%;
    padding-right: 15%;
}
h3 {
    text-align:center;
    padding-left: 30px;
    padding-right: 30px;
}
h5 {
    text-align:center;
    padding-left: 30px;
    padding-right: 30px;
}
</style>