<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs">
    <dep-tree ref="depTree" v-fix-height slot="TreeTab"></dep-tree>
    <Button type="primary" @click="addDepartment" size="small" slot="extra" style="margin-right: 10px" v-if="hasPermission('create')">添加部门</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import DepTree from './DepTree'
import apiMixin from './config'

export default {
    mixins:[apiMixin],
    components: {
        AutoTabs,
        DepTree
    },
    data() {
        return {
            tabs: [
                {name:'TreeTab', label: '部门架构', closable: false, show: true}, 
            ]
        }
    },
    methods: {
        addDepartment() {
            this.$refs.depTree.addRootNode();
        }
    }
}
</script>