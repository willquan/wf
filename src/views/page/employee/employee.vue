<template>
<auto-tabs ref="autotabs" :tabs="tabs" :tabRemovedCallback="(name)=>{this.$refs.autotabs.handleTabRemove(name, tabs)}">
    <employee-list :slot="tabs[0].name"></employee-list>
    <employee-form :slot="tabs[1].name" :isEditable="true"></employee-form>
    <employee-form :slot="tabs[2].name" :isEditable="true" :userId="1"></employee-form>
    <employee-form :slot="tabs[3].name" :isEditable="false" :userId="1"></employee-form>
    <Button type="primary" @click="()=>{this.$refs.autotabs.openTab('AddTab', tabs)}" size="small" slot="extra">添加员工</Button>
    <Button type="primary" @click="()=>{this.$refs.autotabs.openTab('EditTab', tabs)}" size="small" slot="extra">编辑员工</Button>
    <Button type="primary" @click="()=>{this.$refs.autotabs.openTab('CheckTab', tabs)}" size="small" slot="extra">查看信息</Button>
</auto-tabs>
</Tabs>
</template>

<script>

import AutoTabs from '@/views/components/AutoTabs'
import employeeForm from './employeeForm'
import employeeList from './employeeList'

export default {
    components: {
        AutoTabs,
        employeeForm,
        employeeList
    },
    data() {
        return {
            tabs: [
                {name:'ListTab', label: '员工列表', closable: false, show: true}, 
                {name:'AddTab', label: '添加员工', closable: true, show: false},
                {name:'EditTab', label: '编辑员工', closable: true, show: false},
                {name:'CheckTab', label: '查看信息', closable: true, show: false}
            ]
        }
    }
}
</script>
<style>
</style>
