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
                        return params.row.sex == '1' ? '男' : '女'
                    }
                },
                {
                    title: '部门',
                    key: 'department',
                    render:(h, params) => {
                        return params.row.departmentName || params.row.department.name
                    }
                },
                {
                    title: '职位',
                    key: 'position',
                    render:(h, params) => {
                        return params.row.positionName || params.row.position.name
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
                        let content = params.row.roleIds;
                        if(params.row.roles && params.row.roles.length > 0) {
                            content = '';
                            params.row.roles.forEach(role => {
                                content = content + role.name + ' | ';
                            });
                            content = content.substring(0, content.length - 2)
                        }
                        return content
                    }
                }
            ]
        }
    }
}
</script>
