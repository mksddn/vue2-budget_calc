<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>Редактировать</h4>
            </div>
            <div class="input-field">
                <select ref="select" v-model="current">
                    <option v-for="c of categories" :key="c.id" :value="c.id">{{c.title}}</option>
                </select>
                <label>Выберите категорию</label>
            </div>

            <div class="input-field">
                <input id="name" type="text" v-model="title" :class="{invalid: $v.title.$dirty && !$v.title.required}">
                <label for="name">Название</label>
                <span class="helper-text invalid" v-if="$v.title.$error">Введите название категории</span>
            </div>

            <div class="input-field">
                <input id="limit" type="number" v-model.number="limit"
                    :class="{invalid: $v.limit.$dirty && !$v.limit.minValue || $v.limit.$dirty && !$v.limit.required}">
                <label for="limit">Лимит</label>
                <span class="helper-text invalid" v-if="$v.limit.$error">Минимальная величина:
                    {{$v.limit.$params.minValue.min}}</span>
            </div>

            <button class="btn waves-effect waves-light" @click="update" style="margin-right: 10px;">
                Обновить
                <i class="material-icons right">send</i>
            </button>
            <button class="btn waves-effect red" @click="remove">
                Удалить
                <i class="material-icons right">delete</i>
            </button>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import M from 'materialize-css/dist/js/materialize'
import { required, minValue } from 'vuelidate/lib/validators'

export default {
    props: {
        categories: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        select: null,
        title: '',
        limit: 100,
        current: null
    }),
    validations: {
        title: { required },
        limit: { minValue: minValue(100) }
    },
    watch: {
        current(catId) {
            const { title, limit } = this.categories.find(c => c.id === catId)
            this.title = title
            this.limit = limit
        }
    },
    methods: {
        async update() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            // console.log(this)
            try {
                const categoryData = {
                    id: this.current,
                    title: this.title,
                    limit: this.limit
                }
                await this.$store.dispatch('updateCategory', categoryData)
                this.$message('Категория успешно обновлена')
                this.$emit('updated', categoryData)
                // this.$nextTick(() => {
                //     this.select.destroy()
                //     this.select = M.FormSelect.init(this.$refs.select)
                // })
            } catch (e) { }
        },
        async remove() {
            if (confirm('Вы уверены, что хотите удалить категорию навсегда?')) {
                // if (this.$v.$invalid) {
                //     this.$v.$touch()
                //     return
                // }
                // console.log(this)
                try {
                    const categoryData = {
                        id: this.current
                    }
                    await this.$store.dispatch('removeCategory', categoryData)
                    this.$message('Категория удалена')
                    this.$emit('updated', categoryData)
                } catch (e) { }
            }
        }
    },
    created() {
        const { id, title, limit } = this.categories[0]
        this.current = id
        this.title = title
        this.limit = limit
    },
    mounted() {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
    },
    destroyed() {
        if (this.select && this.select.destroy) {
            this.select.destroy()
        }
    }
}
</script>

<style lang="sass" scoped>

</style>