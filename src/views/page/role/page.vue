<template>
<auto-tabs ref="autotabs" :tabs.sync="tabs" :currentTab.sync="currentTab">
    <table-list v-fix-height ref="list" :slot="tabs[0].name" 
        @MenuBtnClicked="MenuBtnClicked" 
        @RightBtnClicked="RightBtnClicked" 
        @ViewBtnClicked="ViewBtnClicked" 
        @EditBtnClicked="EditBtnClicked">
    </table-list>
    <item-form v-fix-height :slot="add.name" :isEditable="true" @FormDataChanged="DataFormChanged"></item-form>
    <item-form v-fix-height :slot="edit.name" :isEditable="true" :itemId="editItemId" @FormDataChanged="DataFormChanged"></item-form>
    <item-form v-fix-height :slot="view.name" :isEditable="false" :itemId="viewItemId"></item-form>
    <menuTab v-fix-height :slot="menu.name" :itemId="viewItemId"></menuTab>
    <RightsTab v-fix-height :slot="rights.name" :itemId="viewItemId"></RightsTab>
    <Button type="primary" @click="AddBtnClicked" size="small" slot="extra" style="margin-right: 10px" v-if="hasPermission('create')">{{add.label}}</Button>
</auto-tabs>
</template>

<script>
import AutoTabs from '@/views/components/AutoTabs'
import ItemForm from './ItemForm'
import TableList from './TableList'
import pageMixin from '@/views/page/mixins/page'
import apiMixin from './config'
import RightsTab from './rights'
import MenuTab from './menu'

export default {
    mixins:[pageMixin, apiMixin],
    components: {
        AutoTabs,
        ItemForm,
        TableList,
        RightsTab,
        MenuTab
    },
    data() {
        return {
            add: {name:'AddTab', label: '添加角色', closable: true, show: false},
            edit: {name:'EditTab', label: '编辑角色', closable: true, show: false},
            view: {name:'ViewTab', label: '查看信息', closable: true, show: false},
            menu: {name:'MenuTab', label: '菜单设置', closable: true, show: false},
            rights: {name:'RightTab', label: '权限设置', closable: true, show: false},
            tabs: [
                {name:'ListTab', label: '角色列表', closable: false, show: true}
            ]
        }
    },
    methods: {
        MenuBtnClicked(id) {
            if(this.tabs.indexOf(this.menu) == -1) {
                this.tabs.push(this.menu)
            }
            this.switchToTab('MenuTab')
            this.editItemId = id
        },
        RightBtnClicked(id) {
            if(this.tabs.indexOf(this.rights) == -1) {
                this.tabs.push(this.rights)
            }
            this.switchToTab('RightTab')
            this.editItemId = id
        }
    }
}
</script>