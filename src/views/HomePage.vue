<template>
    <div>
        <div class="page-title">
            <h3>Счет</h3>

            <button class="btn waves-effect waves-light btn-small" @click="refresh" v-tooltip="'Обновить'" data-position="left">
                <i class="material-icons">refresh</i>
            </button>
        </div>

        <LoaderItem v-if="loading" />

        <div class="row" v-else>

            <p>В этом компоненте должны отображаться состояние счета и курсы валют, но лимит API currency превышен. Подождем следующего месяца.</p>

            <HomeBill :rates="currency.rates" />

            <HomeCurrency :rates="currency.rates" :date="currency.date" />

        </div>
    </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import LoaderItem from '@/components/LoaderItem.vue';
export default {
    data: () => ({
        loading: true,
        currency: null
    }),
    async mounted() {
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
    },
    methods: {
        async refresh() {
            this.loading = true
            this.currency = await this.$store.dispatch('fetchCurrency')
            this.loading = false
        }
    },
    components: { HomeBill, HomeCurrency, LoaderItem }
}
</script>