<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs">
    <kks-tree ref="kksTree" v-fix-height slot="TreeTab"></kks-tree>
    <Button type="primary" @click="addDepartment" size="small" slot="extra" style="margin-right: 10px" v-if="hasPermission('create')">添加KKS</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import KksTree from './KksTree'
import apiMixin from './config'

export default {
    mixins:[apiMixin],
    components: {
        AutoTabs,
        KksTree
    },
    data() {
        return {
            tabs: [
                {name:'TreeTab', label: 'KKS管理', closable: false, show: true}, 
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