<template>
    <div>
        <div class="page-title">
            <h3>История записей</h3>
        </div>

        <div class="history-chart">
            <canvas></canvas>
        </div>

        <LoaderItem v-if="loading" />

        <p class="center" v-else-if="!records.length">
            Записей пока нет.
            <router-link to="/record">Добавить первую запись</router-link>
        </p>

        <section v-else>
            <HistoryTable :records="items" />
            <vuejsPaginate v-model="page" :page-count="pageCount" :click-handler="pageChangeHandler" :prev-text="'Назад'" :next-text="'Вперед'"
                :container-class="'pagination'" :page-class="'waves-effect'" />
        </section>

    </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable'
import paginateMixin from '@/mixins/paginate.mixin'

export default {
    mixins: [paginateMixin],
    data: () => ({
        loading: true,
        records: []
    }),
    async mounted() {
        this.records = await this.$store.dispatch('fetchRecords')
        const categoires = await this.$store.dispatch('fetchCategories')

        this.setPaginat(this.records.map(record => {
            return {
                ...record,
                categoryName: categoires.find(c => c.id === record.categoryId).title,
                typeClass: record.type === 'income' ? 'green' : 'red',
                typeText: record.type === 'income' ? 'Доход' : 'Расход',
            }
        }))
        this.loading = false
    },
    components: {
        HistoryTable,
    }
}
</script>