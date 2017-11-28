<script>
import { ApiUser } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'

export default {
    mixins: [listmixin],
    methods: {
        getApi() {
            return ApiUser
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
                    title: '姓名',
                    key: 'name',
                    able2search: true
                },
                {
                    title: '用户名',
                    key: 'username'
                },
                {
                    title: '性别',
                    key: 'sex',
                    render:(h, params) => {
                        return params.row.sex == 'man' ? '男' : '女'
                    }
                },
                {
                    title: '部门',
                    key: 'department',
                    render:(h, params) => {
                        return params.row.department.name
                    }
                },
                {
                    title: '职位',
                    key: 'position',
                    render:(h, params) => {
                        return params.row.position.name
                    }
                },
                {
                    title: '工号',
                    key: 'worknum',
                    able2search: true
                },
                {
                    title: '角色',
                    key: 'role',
                    render:(h, params) => {
                        return params.row.role.name
                    }
                }
            ]
        }
    }
}
</script>
