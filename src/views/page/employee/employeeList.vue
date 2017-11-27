<template>
<div>
    <auto-table 
        :columns="cols" 
        :data="tableData" 
        :total="total" 
        :pageSize="filterParams._limit" 
        @changePage="pageChanged"
        @DelBtnClicked="deleteEmployee"
        :searchFields="searchFields"
        :loading="loading">
    </auto-table>
</div>
</template>
<script>
import AutoTable from '../../components/AutoTable'
import TableOpBtns from '../../components/TableOpBtns'
import {getList, getListTotal, deleteById} from '@/api/employee'

export default {
    components: {AutoTable, TableOpBtns},
    created: function(){
        this.getData();
    },
    methods: {
        getData() {
            getListTotal(this.filterParams).then(d => {
                getList(this.filterParams).then(data => {
                    this.total = d.total;
                    this.tableData = data;
                    this.loading = false;
                }).catch(e => {
                    this.loading = false;
                });
            }).catch(e => {
                this.loading = false;
            });
        },
        pageChanged(pageNum) {
            this.filterParams._page = pageNum;
            this.getData();
        },
        deleteEmployee(uIds) {
            if(uIds && uIds.length > 0) {
                if(uIds.length == 1) {
                    deleteById(uIds[0]).then(d => {
                        this.$Message.success("删除成功")
                        this.getData();
                    });
                } else {
                    this.$Message.warning("暂时不开放多项删除")
                }
            } else {
                this.$Message.warning("请选择要删除的数据")
            }
        }
    },
    computed: {
        searchFields() {
            return this.cols.filter(c => {
                return c.key == "name" || c.key == "worknum"
            });
        }
    },
    data() {
        return {
            total: 0,
            loading: false,
            filterParams:{
                _page: 1,
                _limit: 20
            },
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
                    width: 180,
                    align: 'center',
                    render:(h, params) => {
                        return h(TableOpBtns,{
                            on: {
                                ViewBtnClicked: () => {
                                    this.$emit('ViewBtnClicked', params.row.id);
                                },
                                EditBtnClicked: () => {
                                    this.$emit('EditBtnClicked', params.row.id);
                                },
                                DelBtnClicked: () => {
                                    this.deleteEmployee([params.row.id]);
                                }
                            }
                        })
                    }
                }
            ]
        }
    }
}
</script>
