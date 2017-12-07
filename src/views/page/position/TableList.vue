<script>
import { ApiPos } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'
import apiMixin from './config'

export default {
    mixins: [listmixin, apiMixin],
    data() {
        return {
            cols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '岗位',
                    key: 'name',
                    able2search: true
                }
            ]
        }
    }
}
</script>
