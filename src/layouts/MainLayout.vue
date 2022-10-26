<template>
    <LoaderItem v-if="loading" />
    <div class="app-main-layout" v-else>
        
        <NavbarComp @click="isOpen = !isOpen" />

        <SidebarComp v-model="isOpen" />

        <main class="app-content" :class="{full: !isOpen}">
            <div class="app-page">

                <router-view />

            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Содать новую запись'" data-position="left">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import NavbarComp from '@/components/NavbarComp.vue';
import SidebarComp from '@/components/SidebarComp.vue';
import LoaderItem from '@/components/LoaderItem.vue';
export default {
    // name: 'main-layout',
    data: () => ({
        isOpen: true,
        loading: true
    }),
    async mounted() {
        if (!Object.keys(this.$store.getters.info).length) {
            await this.$store.dispatch('fetchInfo')
        }
        this.loading = false
    },
    components: { NavbarComp, SidebarComp, LoaderItem }
}
</script>

<style lang="scss" scoped>

</style>