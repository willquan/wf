import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            editItemId: 0,
            viewItemId: 0,
            currentTab: 'ListTab'
        }
    },
    methods: {
        DataFormChanged() {
            this.getListRef().queryList()
        },
        ViewBtnClicked(userid) {
            this.tabs.push(this.view)
            this.switchToTab('ViewTab')
            this.viewItemId = userid
        },
        EditBtnClicked(userid) {
            this.tabs.push(this.edit)
            this.switchToTab('EditTab')
            this.editItemId = userid
        },
        AddBtnClicked() {
            this.tabs.push(this.add)
            this.switchToTab('AddTab')
        },
        switchToTab(tabName) {
            this.currentTab = tabName
        },
        getListRef() {
            return this.$refs.list
        },
        BeforeTabRemove(name) {
            var tabsCopy = [];
            this.tabs.forEach(tab => {
                if(tab.name != name) {
                    tabsCopy.push(tab)
                }
                else tab.show = false;
            });
            this.tabs = tabsCopy
        }
    }
}