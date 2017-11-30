import { ApiPos } from '@/api/apiUtil'
import { mapGetters } from 'vuex'

export default {
    methods: {
        getApi() {
            return ApiPos
        },
        hasPermission(name) {
            return this.access[this.getApi().accessName] && this.access[this.getApi().accessName][name]
        }
    },
    computed: {
        ...mapGetters([
            'access',
            'singlePageHeight'
        ])
    }
}