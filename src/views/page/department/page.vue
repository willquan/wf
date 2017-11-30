<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs" :currentTab.sync="currentTab">
    <table-list v-fix-height ref="list" :slot="tabs[0].name" @ViewBtnClicked="ViewBtnClicked" @EditBtnClicked="EditBtnClicked"></table-list>
    <item-form v-fix-height :slot="tabs[1].name" :isEditable="true" @FormDataChanged="DataFormChanged"></item-form>
    <item-form v-fix-height :slot="tabs[2].name" :isEditable="true" :itemId="editItemId" @FormDataChanged="DataFormChanged"></item-form>
    <item-form v-fix-height :slot="tabs[3].name" :isEditable="false" :itemId="viewItemId"></item-form>
    <Button type="primary" @click="AddBtnClicked" size="small" slot="extra" style="margin-right: 10px" v-if="hasCreatePermission">{{tabs[1].label}}</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import ItemForm from './ItemForm'
import TableList from './TableList'
import pageMixin from '@/views/page/mixins/page'
import apiMixin from './config'

export default {
    mixins:[pageMixin],
    components: {
        AutoTabs,
        ItemForm,
        TableList
    },
    data() {
        return {
            tabs: [
                {name:'ListTab', label: '部门列表', closable: false, show: true}, 
                {name:'AddTab', label: '添加部门', closable: true, show: false},
                {name:'EditTab', label: '编辑部门', closable: true, show: false},
                {name:'ViewTab', label: '查看信息', closable: true, show: false}
            ]
        }
    },
    methods: {
        hasCreatePermission() {
            return this.access.departments && this.access.departments.create
        }
    }
}
</script>