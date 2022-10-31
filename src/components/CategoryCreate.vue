
<template>
    <div class="col s12 m6">
        <div>
            <div class="page-subtitle">
                <h4>{{'Create'|localize}}</h4>
            </div>

            <form @submit.prevent="submitHandler">
                <div class="input-field">
                    <input id="name" type="text" v-model="title"
                        :class="{invalid: $v.title.$dirty && !$v.title.required}">
                    <label for="name">{{'Title'|localize}}</label>
                    <span class="helper-text invalid" v-if="$v.title.$error">{{'Message_CategoryTitle'|localize}}</span>
                </div>

                <div class="input-field">
                    <input id="limit" type="number" v-model.number="limit"
                        :class="{invalid: $v.limit.$dirty && !$v.limit.minValue || $v.limit.$dirty && !$v.limit.required}">
                    <label for="limit">{{'Limit'|localize}}</label>
                    <span class="helper-text invalid" v-if="$v.limit.$error">{{'Message_MinLength'|localize}}
                        {{$v.limit.$params.minValue.min}}</span>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    {{'Create'|localize}}
                    <i class="material-icons right">send</i>
                </button>
            </form>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css/dist/js/materialize'
export default {
    data() {
        return {
            title: '',
            limit: 100
        }
    },
    validations: {
        title: { required },
        limit: { required, minValue: minValue(100) }
    },
    mounted() {
        M.updateTextFields()
    },
    methods: {
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }
            try {
                const category = await this.$store.dispatch('createCategory', {
                    title: this.title,
                    limit: this.limit
                })
                this.title = ''
                this.limit = 100
                this.$v.$reset()
                this.$message('Категория была создана')
                this.$emit('created', category)
            } catch (e) {}
        }
    },
}
</script>

<style lang="sass" scoped>

</style>