<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs" :currentTab.sync="currentTab">
    <employee-list :slot="tabs[0].name" v-on:ViewBtnClicked="ViewBtnClicked" v-on:EditBtnClicked="EditBtnClicked"></employee-list>
    <employee-form :slot="tabs[1].name" :isEditable="true"></employee-form>
    <employee-form :slot="tabs[2].name" :isEditable="true" :userId="editUserId"></employee-form>
    <employee-form :slot="tabs[3].name" :isEditable="false" :userId="checkUserId"></employee-form>
    <Button type="primary" @click="switchToTab('AddTab')" size="small" slot="extra">添加员工</Button>
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
            ],
            editUserId: 0,
            checkUserId: 0,
            currentTab: 'ListTab'
        }
    },
    methods: {
        ViewBtnClicked(userid) {
            this.switchToTab('CheckTab')
            this.checkUserId = userid
        },
        EditBtnClicked(userid) {
            this.switchToTab('EditTab')
            this.editUserId = userid
        },
        switchToTab(tabName) {
            this.currentTab = tabName
        }
    }
}
</script>
<style>
</style>
