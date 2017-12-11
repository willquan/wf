import { ApiRole } from '@/api/apiUtil'
import { mapGetters } from 'vuex'

export default {
    methods: {
        getApi() {
            return ApiRole
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