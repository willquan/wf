import AutoTable from '@/views/components/AutoTable'
import { mapGetters } from 'vuex'
import TableOpBtns from '@/views/components/TableOpBtns'

export default {
    render(h) {
        return h(AutoTable, {
            props: {
                columns: this.cols,
                data: this.tableData,
                total: this.total,
                searchFields: this.searchFields,
                loading: this.loading,
                permissions: this.access[this.getApi().res]
            },
            on: {
                changePage: this.pageChanged,
                DelBtnClicked: this.deleteItemById,
                RefreshTable: this.refreshTable,
                SearchClicked: this.startSearch
            }
        });
    },
    data() {
        return {
            total: 0,
            loading: false,
            tableData: [],
            args: {
                _page: 1,
                _limit: 20
            },
            showLoadFinish: false,
            optCol: {
                title: '操作',
                key: 'action',
                width: 180,
                align: 'center',
                render:(h, params) => {
                    return h(TableOpBtns,{
                        props: {
                            permissions: this.access[this.getApi().res]
                        },
                        on: {
                            ViewBtnClicked: () => {
                                this.$emit('ViewBtnClicked', params.row.id);
                            },
                            EditBtnClicked: () => {
                                this.$emit('EditBtnClicked', params.row.id);
                            },
                            DelBtnClicked: () => {
                                this.deleteItemById([params.row.id]);
                            }
                        }
                    })
                    }
            },
        }
    },
    created: function(){
        this.queryList();
        this.addOptCol();
    },
    methods: {
        queryList(params) {
            if(!params) params = this.args;
            this.getApi().queryListTotal(params).then(d => {
                this.getApi().queryList(params).then(data => {
                    this.total = d.total;
                    this.tableData = data;
                    this.loading = false;
                    if(this.showLoadFinish) {
                        this.$Message.success("加载完成")
                    }
                    this.showLoadFinish = false
                }).catch(e => {
                    this.loading = false;
                });
            }).catch(e => {
                this.loading = false;
            });
        },
        pageChanged(pageNum) {
            this.args._page = pageNum;
            this.queryList();
        },
        deleteItemById(uIds) {
            if(uIds && uIds.length > 0) {
                if(uIds.length == 1) {
                    this.getApi().delete(uIds[0]).then(d => {
                        this.$Message.success("删除成功")
                        this.queryList();
                    });
                } else {
                    this.$Message.warning("暂时不开放多项删除")
                }
            } else {
                this.$Message.warning("请选择要删除的数据")
            }
        },
        refreshTable() {
            this.showLoadFinish = true;
            this.queryList();
        },
        startSearch(searchCondition) {
            if(searchCondition) {
                let params = { ...this.args, ...searchCondition}
                this.queryList(params);
            } else {
                this.queryList();
            }
        },
        addOptCol() {
            const permissions = this.access[this.getApi().res]
            if(permissions && (permissions.detail || permissions.update || permissions.del)) {
                this.cols.push(this.optCol)
            }
        }
    },
    computed: {
        ...mapGetters([
            'access'
        ]),
        searchFields() {
            return this.cols.filter(c => {
                return c.able2search
            });
        }
    }
}