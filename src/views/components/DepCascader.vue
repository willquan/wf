<template>
  <Cascader @on-change="onChange" :data="departments" :load-data="loadTeams" v-model="values" change-on-select></Cascader>
</template>

<script>
import {ApiDep} from '@/api/apiUtil'
export default {
    name: 'DepCascader',
    props: {
        values: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            departments: [],
        }
    },
    mounted: function () {
        ApiDep.queryList({parentId: 0}).then(data => {
            data.forEach(el => {
                if(el.hasChildren) el.children = [];
                el.loading = false;
                el.value = el.id;
                el.label = el.name;
            });
            this.departments = data;
        })

        //如果有默认值，则初始化默认值层级
        this.values.forEach((v, index) => {
            this.departments.forEach(el => {
                if(v == el.id) {
                    this.initChildNode(el, index + 1);
                }
            });
        });
    },
    methods: {
        initChildNode(node, curValueIndex) {
            if(node.hasChildren) {
                ApiDep.queryList({parentId: node.id}).then(data => {
                    this.convertNode(node, data);
                    if(node.hasChildren) {
                        node.children.forEach(data2 => {
                            if(data2.id == curValueIndex) {
                                this.initChildNode(data2, curValueIndex + 1);
                            }
                        });
                    }
                });
            }
        },
        loadTeams(node, callback) {
            node.loading = true;
            ApiDep.queryList({parentId: node.id}).then(data => {
                this.convertNode(node, data);
                callback();
            })
        },
        convertNode(node, children) {
            children.forEach(el => {
                if(el.hasChildren) {
                    el.children = [];
                    el.loading = false;
                }
                el.value = el.id;
                el.label = el.name;
            });
            node.loading = false;
            node.children = children;
        },
        onChange(value, selectedData) {
            this.$emit('departmentsDidSelect', value)
        }
    }
}
</script>

<style>

</style>
