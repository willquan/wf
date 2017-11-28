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
            this.switchToTab('ViewTab')
            this.viewItemId = userid
        },
        EditBtnClicked(userid) {
            this.switchToTab('EditTab')
            this.editItemId = userid
        },
        AddBtnClicked() {
            this.switchToTab('AddTab')
        },
        switchToTab(tabName) {
            this.currentTab = tabName
        },
        getListRef() {
            return this.$refs.list
        }
    },
    computed: {
        ...mapGetters([
            'access'
        ])
    }
}