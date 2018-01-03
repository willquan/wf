<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs" :currentTab.sync="currentTab">
    <table-list v-fix-height ref="list" :slot="tabs[0].name" @ViewBtnClicked="ViewBtnClicked" @EditBtnClicked="EditBtnClicked"></table-list>
    <item-form v-fix-height :slot="add.name" :isEditable="true" @FormDataChanged="DataFormChanged"></item-form>
    <item-form v-fix-height :slot="edit.name" :isEditable="true" :itemId="editItemId" @FormDataChanged="DataFormChanged"></item-form>
    <item-form v-fix-height :slot="view.name" :isEditable="false" :itemId="viewItemId"></item-form>
    <Button type="primary" @click="AddBtnClicked" size="small" slot="extra" style="margin-right: 10px" v-if="hasPermission('create')">{{add.label}}</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import ItemForm from './ItemForm'
import TableList from './TableList'
import pageMixin from '@/views/page/mixins/page'
import apiMixin from './config'


export default {
    mixins:[pageMixin, apiMixin],
    components: {
        AutoTabs,
        ItemForm,
        TableList
    },
    data() {
        return {
            add: {name:'AddTab', label: '创建操作票', closable: true, show: false},
            edit: {name:'EditTab', label: '编辑操作票', closable: true, show: false},
            view: {name:'ViewTab', label: '查看信息', closable: true, show: false},
            tabs: [
                {name:'ListTab', label: '操作票列表', closable: false, show: true}, 
            ]
        }
    }
}
</script>
