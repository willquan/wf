<script>
import { ApiDep } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'

export default {
    mixins: [listmixin],
    methods: {
        getApi() {
            return ApiDep
        }
    },
    data() {
        return {
            cols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '部门',
                    key: 'name',
                    able2search: true
                }
            ]
        }
    }
}
</script>
