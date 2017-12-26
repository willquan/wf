import { ApiOperateTicketStates } from '@/api/apiUtil'
import { mapGetters } from 'vuex'

export default {
    methods: {
        getApi() {
            return ApiOperateTicketStates
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