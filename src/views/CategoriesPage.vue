<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories'|localize}}</h3>
    </div>
    <section>
      <div class="row">

        <CategoryCreate @created="addNewCat" />

        <CategoryEdit v-if="categories.length" :categories="categories" :key="categories.length + updateCount"
          @updated="updateCategories" />
        <p v-else class="center">{{'NoCategories'|localize}}</p>

      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
export default {
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components: { CategoryCreate, CategoryEdit },
  methods: {
    addNewCat(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }
}
</script>

<style lang="scss" scoped>

</style>