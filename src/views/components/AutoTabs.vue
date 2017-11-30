<template>
<Tabs :value="currentTab" type="card" closable @on-tab-remove="handleTabRemove" @on-click="tabChanged">
    <TabPane v-for="tab in tabs" :label="tab.label" :name="tab.name" :closable="tab.closable" v-if="tab.show" :key="tab.name">
        <slot :name="tab.name"></slot>
    </TabPane>
    <template slot="extra">
        <slot name="extra"></slot>
    </template>
</Tabs>
</template>

<script>
export default {
    name: "AutoTabs",
    props: {
        tabs: Array,
        currentTab: ''
    },
    data() {
        return {
            tabTrace: []
        }
    },
    methods: {
        tabChanged(name) {
            this.$emit('update:currentTab', name)
        },
        handleTabRemove(name) {
            var tabsCopy = [];
            var leftOne = {}
            this.tabs.forEach((tab, index) => {
                if(tab.name != name) {
                    tabsCopy.push(tab)
                } else {
                    tab.show = false;
                    leftOne = this.tabs[index-1]
                }
            });

            if(this.currentTab == name) {
                this.$emit('update:currentTab', leftOne.name)
            }
            
            this.$emit('update:tabs', tabsCopy)
        }
    },
    watch: {
        currentTab: function(newVal, oldVal) {
            this.tabs.forEach(_tab => {
                if(_tab.name == newVal && !_tab.show) _tab.show = true;
            });
        }
    }
}
</script>

<style>
</style>
