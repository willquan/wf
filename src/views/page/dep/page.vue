<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs">
    <dep-tree v-fix-height slot="TreeTab"></dep-tree>
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
                {name:'TreeTab', label: '组织架构', closable: false, show: true}, 
            ]
        }
    },
    methods: {
        hasCreatePermission() {
            return this.rights.departments && this.rights.departments.create
        }
    }
}
</script>