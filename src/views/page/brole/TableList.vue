<script>
import { ApiUser } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'
import apiMixin from './config'

export default {
    mixins: [listmixin, apiMixin],
    data() {
        return {
            cols: [
                {
                    type: 'index',
                    width: '60',
                },
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'name',
                    able2search: true
                },
                {
                    title: '缺陷状态',
                    key: 'fstateIds',
                },
                {
                    title: '工作票',
                    key: 'workTicketStatesIds',
                },
                {
                    title: '操作票',
                    key: 'operateTicketStatesIds',
                }
            ]
        }
    },
    mounted: function() {
    },
    methods: {
       
    }
}
</script>
