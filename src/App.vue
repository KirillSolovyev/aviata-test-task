<template>
    <section style="padding: 100px 0">
        <div class="container">
            <div class="row">
                <sidebar :sidebarIsOpen="sidebarIsOpen" @sidebar:toggle="sidebarIsOpen = false"/>
                <site-content />
            </div>
        </div>
        <fixed-bottom-menu :btnText="'Фильтры'" @btn:clicked="sidebarIsOpen = true"/>
    </section>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import SiteContent from './components/SiteContent.vue';

import { AIRLINES } from './store/types';
import FixedBottomMenu from './components/FixedBottomMenu';

export default {
    name: 'App',
    components: {
        Sidebar,
        SiteContent,
        FixedBottomMenu
    },
    data() {
        return {
            sidebarIsOpen: false
        };
    },
    mounted() {
        this.$store.dispatch(AIRLINES.SET);
    },
}
</script>

<style></style>