<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs" :currentTab.sync="currentTab">
    <table-list ref="list" :slot="tabs[0].name" @ViewBtnClicked="ViewBtnClicked" @EditBtnClicked="EditBtnClicked"></table-list>
    <item-form :slot="tabs[1].name" :isEditable="true" @FormDataChanged="DataFormChanged"></item-form>
    <item-form :slot="tabs[2].name" :isEditable="true" :itemId="editItemId" @FormDataChanged="DataFormChanged"></item-form>
    <item-form :slot="tabs[3].name" :isEditable="false" :itemId="viewItemId"></item-form>
    <Button type="primary" @click="AddBtnClicked" size="small" slot="extra" v-if="this.access.users.create">添加员工</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import ItemForm from './ItemForm'
import TableList from './TableList'
import pageMixin from '@/views/page/mixins/page'

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
                {name:'ListTab', label: '员工列表', closable: false, show: true}, 
                {name:'AddTab', label: '添加员工', closable: true, show: false},
                {name:'EditTab', label: '编辑员工', closable: true, show: false},
                {name:'ViewTab', label: '查看信息', closable: true, show: false}
            ]
        }
    }
}
</script>