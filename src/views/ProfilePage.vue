<template>
    <div>
        <div class="page-title">
            <h3>{{ 'ProfileTitle' | localize }}</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input id="description" type="text" v-model="name"
                    :class="{ invalid: $v.name.$dirty && !$v.name.required }">
                <label for="description">{{ 'Name' | localize }}</label>
                <small class="helper-text invalid" v-if="$v.name.$dirty && !$v.name.required">{{ 'Message_EnterName' |
                        localize
                }}</small>
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isRus">
                    <span class="lever"></span>
                    Русский
                </label>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                {{ 'Update' | localize }}
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
/* eslint-disable */
import { mapGetters, mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators'
import M from 'materialize-css/dist/js/materialize'
import localizeFilter from '@/filters/localize.filter';
export default {
    metaInfo() {
        return {
            title: this.$title('ProfileTitle')
        }
    },
    data: () => ({
        name: '',
        isRus: true
    }),
    validations: {
        name: { required }
    },
    mounted() {
        this.name = this.info.name
        this.isRus = this.info.lang === 'ru-RU'
        setTimeout(() => {
            M.updateTextFields()
        });
    },
    computed: {
        ...mapGetters(['info'])
    },
    methods: {
        ...mapActions(['updateInfo']),
        async submitHandler() {
            if (this.$v.$invalid) {
                this.$v.$touch()
                return
            }

            try {
                await this.updateInfo({
                    name: this.name,
                    lang: this.isRus ? 'ru-RU' : 'en-US'
                })
            } catch (e) { }
        }
    },
}
</script>

<style lang="sass" scoped>
.switch
    margin-bottom: 2rem
</style>