<template>
    <section style="padding: 100px 0">
        <div class="container">
            <div class="row">
                <sidebar />
                <site-content />
            </div>
        </div>
    </section>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import SiteContent from './components/SiteContent.vue';

import { AIRLINES } from './store/types';

export default {
    name: 'App',
    components: {
        Sidebar,
        SiteContent
    },
    mounted() {
        this.$store.dispatch(AIRLINES.SET);
    },
}
</script>

<style></style>