<template>
  <Cascader :render-format="format" @on-change="onChange" :data="departments" :load-data="loadTeams" v-model="depData" change-on-select></Cascader>
</template>
<script>
/**
 * 异步加载反显有问题
 */
import {ApiDep} from '@/api/apiUtil'
export default {
    name: 'DepCascader',
    props: {
        values: {
            type: Array,
            default: function() {
                return []
            }
        },
    },
    data() {
        return {
            isDataReady: false,
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
    },
    watch: {
        departments: function(deps) {
            this.isDataReady = true;
        }
    },
    computed: {
        depData: {
            get: function() {
                return this.values
            },
            set: function() {

            }
        }
    },
    methods: {
        format (labels, selectedData) {
            // 解决反显的bug
            if(this.isDataReady && this.depData.length > 0) {
                let newLabels = [];
                this.findNodeWithValue(this.departments, 0, newLabels);
                labels = newLabels;
            }
            return labels.join(' / ')
        },
        findNodeWithValue(nodes, depDataIndex, rs) {
            let val = this.depData[depDataIndex]
            nodes.forEach(el => {
                if(el.value == val) {
                    rs.push(el.label);
                    if(el.children && el.children.length > 0) {
                        this.findNodeWithValue(el.children, depDataIndex + 1, rs);
                    }
                }
            });
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
            // if(this.isDataReady)
                // this.$emit('departmentsDidSelect', value);
        }
    }
}
</script>

<style>

</style>
