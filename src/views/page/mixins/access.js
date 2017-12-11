import { mapGetters } from 'vuex'

export default {
    methods: {
        hasPermission(name) {
            return this.access[this.getApi().res] && this.access[this.getApi().res][name]
        }
    },
    computed: {
        ...mapGetters([
            'access'
        ])
    }
}