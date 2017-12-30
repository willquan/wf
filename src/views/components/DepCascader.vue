<template>
  <Cascader @on-change="onChange" :data="departments" v-model="depData" change-on-select></Cascader>
</template>
<script>
import {ApiDep} from '@/api/apiUtil'
import wfUtil from '@/libs/wfUtil'
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
            departments: [],
        }
    },
    mounted: function () {
        ApiDep.queryList().then(data => {
            data.forEach(el => {
                el.value = el.id;
                el.label = el.name;
            });
           this.departments =  wfUtil.toTree(data, 0);
        })
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
        onChange(value, selectedData) {
            this.$emit('departmentsDidSelect', value);
        }
    }
}
</script>

<style>

</style>
