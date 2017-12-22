<template>
  <div style="padding-bottom: 150px">
      search
      <Tree :data="treeData" :load-data="loadData" :render="renderContent"></Tree>
      <Table highlight-row :columns="columns6" :data="data5"></Table>
  </div>
</template>

<script>
import { ApiKKS } from '@/api/apiUtil'
import { Icon } from 'iview';
export default {
    name: "FposTree",
    mounted: function() {
        ApiKKS.queryList({parentId: 0}).then(data => {
            data.forEach(el => {
                el.title = el.name + "      " + el.desc + "      " + el.sid,
                el.loading = false,
                el.children = []
            });
            this.treeData = data;
        });
    },
    data() {
        return {
            treeData: [],
            columns6: [
                    {
                        title: 'Date',
                        key: 'date',
                        width: 120,
                        render: (h, params)=>{
                            return (<div onClick={()=>{params.row.arrow = !params.row.arrow}}><Icon type={params.row.arrow ? "chevron-down" : "chevron-right"}></Icon>  {params.row.date}</div>)
                        }
                    },
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: 200
                    }
                ],
                data5: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03',
                        arrow: false
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01',
                        arrow: false
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02',
                        arrow: false
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04',
                        arrow: false
                    }
                ]
        }
    },
    methods: {
        loadData(item, callback) {
            ApiKKS.queryList({parentId: item.id}).then(data => {
                data.forEach(el => {
                    el.title = el.name + "      " + el.desc + "      " + el.sid,
                    el.loading = false,
                    el.children = []
                });
                callback(data);
            });
        },
        renderContent(h, { root, node, data }) {
            return (<span>{data.title}</span>);
        }
    }
}
</script>

<style>
</style>