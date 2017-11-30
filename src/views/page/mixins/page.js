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
            if(this.tabs.indexOf(this.view) == -1) {
                this.tabs.push(this.view)
            }
            this.switchToTab('ViewTab')
            this.viewItemId = userid
        },
        EditBtnClicked(userid) {
            if(this.tabs.indexOf(this.edit) == -1) {
                this.tabs.push(this.edit)
            }
            this.switchToTab('EditTab')
            this.editItemId = userid
        },
        AddBtnClicked() {
            if(this.tabs.indexOf(this.add) == -1) {
                this.tabs.push(this.add)
            }
            this.switchToTab('AddTab')
        },
        switchToTab(tabName) {
            this.currentTab = tabName
        },
        getListRef() {
            return this.$refs.list
        }
    }
}