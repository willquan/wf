import TableOpBtns from '../../components/TableOpBtns'

export function tableHeader(vm) {
    return [
        {
            type: 'selection',
            width: 60,
            align: 'center'
        },
        {
            title: '姓名',
            key: 'name',
            searchble: true
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
            searchble: true
        },
        {
            title: '角色',
            key: 'role',
            render:(h, params) => {
                return params.row.role.name
            }
        },
        {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render:(h, params) => {
                return h(TableOpBtns,{
                    on: {
                        ViewBtnClicked: () => {
                            vm.$emit('ViewBtnClicked', params.row.id);
                        },
                        EditBtnClicked: () => {
                            vm.$emit('EditBtnClicked', params.row.id);
                        },
                        DelBtnClicked: () => {
                            vm.deleteItemById([params.row.id]);
                        }
                    }
                })
            }
        }
    ]
}
