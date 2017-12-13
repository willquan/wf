import { mapGetters } from 'vuex'

export default {
    methods: {
        hasPermission(name) {
            return this.rights[this.getApi().res] && this.rights[this.getApi().res][name]
        }
    },
    computed: {
        ...mapGetters([
            'rights'
        ])
    }
}