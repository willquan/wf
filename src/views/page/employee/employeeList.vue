<template>
<div>
    <auto-table :columns="cols" :data="tableData"></auto-table>
</div>
</template>
<script>
import AutoTable from '../../components/AutoTable'
import {getEmployeeList} from '@/api/employee'

export default {
    components: {AutoTable},
    created: function(){
        this.getData(30, 1);
    },
    methods: {
        getData(pageSize, pageNum) {
            getEmployeeList(pageSize, pageNum).then(data => {
                this.tableData = data;
            });
        }
    },
    data() {
        return {
            tableData: [],
            cols: 
            [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name'
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
                    key: 'worknum'
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
                    width: 150,
                    align: 'center',
                    render:(h, params) => {
                        return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit('ViewBtnClicked', params.row.id)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$emit('EditBtnClicked', params.row.id)
                                        }
                                    }
                                }, '编辑')
                            ]);
                    }
                }
            ]
        }
    }
}
</script>
