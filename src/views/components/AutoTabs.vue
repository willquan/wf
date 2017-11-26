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
        this.currentTab = this.tabs[0].name;
        let trace = this.currentTab;
        this.tabTrace.push(trace);
        
        this.tabs.forEach(_tab=>{
            this.onlyForWatch.push(_tab.show)
        });
    },
    methods: {
        tabChanged(name) {
           this.currentTab = name;
        },
        handleTabRemove(name) {
            this.tabs.forEach(_tab => {
               if(_tab.name == name) {
                   _tab.show = false;
               }
            });
            if(name == this.currentTab) {
                let traceIndex = this.tabTrace.indexOf(name);
                let leftOne = this.tabTrace[traceIndex - 1];
                let rightOne = this.tabTrace[traceIndex + 1];
                if(leftOne) this.currentTab = leftOne;
                else if(rightOne) this.currentTab = rightOne;
                else this.currentTab = '';
            }
            this.tabTrace = this.tabTrace.filter(trace => {return trace != name});
        }
    },
    watch: {
        tabs: {
            handler(newVal, oldVal) {
               this.onlyForWatch.forEach((isShow, index) => {
                   const openedTab = newVal[index]
                   // 只关心打开的情况
                   if(!isShow && openedTab.show) {
                        this.currentTab = openedTab.name
                        if(!this.tabTrace.some(trace=>{ return trace == this.currentTab})) this.tabTrace.push(openedTab)
                   }
                   //更新状态
                   if(isShow != openedTab.show) {
                       this.onlyForWatch[index] = openedTab.show;
                   }
               })
            },
            deep: true
        }
    }
}
</script>

<style>
</style>
