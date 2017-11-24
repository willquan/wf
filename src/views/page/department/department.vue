<template>
    <auto-tabs ref="autotabs" :tabs="tabs" :tabRemovedCallback="(name)=>{this.$refs.autotabs.handleTabRemove(name, tabs)}">
        <Button type="primary" @click="()=>{this.$refs.autotabs.openTab('AddTab', tabs)}" size="small" slot="extra">添加员工</Button>
        <Button type="primary" @click="()=>{this.$refs.autotabs.openTab('EditTab', tabs)}" size="small" slot="extra">编辑员工</Button>
    </auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
export default {
    data() {
        return {
            tabs: [
                    {name:'ListTab', label: '员工列表', closable: false, show: true}, 
                    {name:'AddTab', label: '添加员工', closable: true, show: false},
                    {name:'EditTab', label: '编辑员工', closable: true, show: false}
            ]
        }
    },
    components: { AutoTabs },
    methods: {
        
    }
}
</script>

<style>
</style>
