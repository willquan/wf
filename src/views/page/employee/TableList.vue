<script>
import { ApiUser } from '@/api/apiUtil'
import {tableHeader, queryParams, searchConfig} from './config'
import listmixin from '@/views/page/mixins/list'

export default {
    mixins: [listmixin],
    data() {
        return {
            cols: tableHeader(this),
            
        }
    },
    methods: {
        getApi() {
            return ApiUser
        }
    }
}
</script>
