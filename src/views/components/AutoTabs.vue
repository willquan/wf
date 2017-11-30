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
            tabTrace: [],
            onlyForWatch: []
        }
    },
    mounted: function() {
        let trace = this.currentTab;
        this.tabTrace.push(trace);
        
        this.tabs.forEach(_tab=>{
            this.onlyForWatch.push(_tab.show)
        });
    },
    methods: {
        tabChanged(name) {
            this.$emit('update:currentTab', name)
        },
        handleTabRemove(name) {
            this.$emit('BeforeTabRemove', name)
            // if(name == this.currentTab) {
            //     let traceIndex = this.tabTrace.indexOf(name);
            //     let leftOne = this.tabTrace[traceIndex - 1];
            //     let rightOne = this.tabTrace[traceIndex + 1];
            //     if(leftOne) this.$emit('update:currentTab', leftOne)
            //     else if(rightOne) this.$emit('update:currentTab', rightOne)
            //     else this.$emit('update:currentTab', tabs[0].name);
            // }
            // this.tabTrace = this.tabTrace.filter(trace => {return trace != name});
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
