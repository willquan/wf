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
                    title: '手机号',
                    key: 'mobile'
                },
                {
                    title: '部门',
                    key: 'departmentIds',
                    render:(h, params) => {
                        return params.row.departmentName || params.row.departmentIds
                    }
                },
                {
                    title: '工号',
                    key: 'worknum',
                    able2search: true
                },
                {
                    title: '业务角色',
                    key: 'role',
                    render:(h, params) => {
                        let content = params.row.broleIds;
                        if(params.row.broles && params.row.broles.length > 0) {
                            content = '';
                            params.row.broles.forEach(role => {
                                content = content + role.name + ' | ';
                            });
                            content = content.substring(0, content.length - 2)
                        }
                        return content
                    }
                },
                {
                    title: '系统角色',
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
