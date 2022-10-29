<template>
    <LoaderItem v-if="loading" />
    <div class="app-main-layout" v-else>

        <NavbarComp @click="isOpen = !isOpen" />

        <SidebarComp v-model="isOpen" :key="lang" />

        <main class="app-content" :class="{ full: !isOpen }">
            <div class="app-page">

                <router-view />

            </div>
        </main>

        <div class="fixed-action-btn">
            <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Содать новую запись'"
                data-position="left">
                <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import NavbarComp from '@/components/NavbarComp.vue';
import SidebarComp from '@/components/SidebarComp.vue';
import LoaderItem from '@/components/LoaderItem.vue';
import messages from '@/plugins/messages';
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
    computed: {
        error() {
            return this.$store.getters.error
        },
        lang() {
            return this.$store.getters.info.lang
        }
    },
    watch: {
        // locale() {
        //   console.log('Locale changed')
        // },
        error(fbError) {
            this.$error(messages[fbError.code] || 'Что-то пошло не так')
        }
    },
    components: { NavbarComp, SidebarComp, LoaderItem }
}
</script>
