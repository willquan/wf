import { ApiDep } from '@/api/apiUtil'
import { mapGetters } from 'vuex'

export default {
    methods: {
        getApi() {
            return ApiDep
        },
        hasPermission(name) {
            return this.access[this.getApi().res] && this.access[this.getApi().res][name]
        }
    },
    computed: {
        ...mapGetters([
            'access',
            'singlePageHeight'
        ])
    }
}