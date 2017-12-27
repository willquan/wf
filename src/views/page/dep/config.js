import { ApiDep } from '@/api/apiUtil'
import { mapGetters } from 'vuex'

export default {
    methods: {
        getApi() {
            return ApiDep
        },
        hasPermission(name) {
            return this.rights[this.getApi().res] && this.rights[this.getApi().res][name]
        }
    },
    computed: {
        ...mapGetters([
            'rights',
            'singlePageHeight'
        ])
    }
}