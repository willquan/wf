<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs">
    <equipments-tree ref="equipmentsTree" v-fix-height slot="TreeTab"></equipments-tree>
    <Button type="primary" @click="addDepartment" size="small" slot="extra" style="margin-right: 10px" v-if="hasPermission('create')">添加专业</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import EquipmentsTree from './EquipmentsTree'
import apiMixin from './config'

export default {
    mixins:[apiMixin],
    components: {
        AutoTabs,
        EquipmentsTree
    },
    data() {
        return {
            tabs: [
                {name:'TreeTab', label: '单元管理', closable: false, show: true}, 
            ]
        }
    },
    methods: {
        addDepartment() {
            this.$refs.equipmentsTree.addRootNode();
        }
    }
}
</script>