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
        <QCard>
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
                    </ul>
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
#requirements {
        background-color: #e2e2e2;

    padding: 20px;
    text-align: left;
}
.body {
    text-align: center;
    padding-top: 30px;
    padding-left: 25%;
    padding-right: 25%;
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