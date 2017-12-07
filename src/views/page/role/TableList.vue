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
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'name',
                    able2search: true
                },
                // {
                //     title: '权限列表',
                //     key: 'right'
                // },
                // {
                //     title: '编辑权限',
                //     key: 'right'
                // }
            ]
        }
    },
    mounted: function() {
        console.log(this.access)
        // this.access.forEach(element => {
        //     console.log(element)
        // });
    },
    methods: {
       
    }
}
</script>
