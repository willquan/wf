<template>
<Tabs :value="currentTab" type="card" closable @on-tab-remove="tabRemovedCallback" @on-click="tabChanged">
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
        tabRemovedCallback: {
            type: Function,
            default: function() {
                return (name)=>{}
            }
        }
    },
    data() {
        return {
            currentTab: '',
            tabTrace:[]
        }
    },
    mounted: function() {
        this.currentTab = this.tabs[0].name;
        let trace = this.currentTab;
        this.tabTrace.push(trace);
    },
    methods: {
        tabChanged(name) {
           this.currentTab = name;
        },
        handleTabRemove(name, _tabs) {
            _tabs.forEach(_tab => {
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
        },
        openTab(name, _tabs) {
            _tabs.forEach(tab => {
               if(tab.name == name) {
                   tab.show = true;
                   this.currentTab = name;
                   if(!this.tabTrace.some(trace=>{ return trace == name})) this.tabTrace.push(name);
               }
            });
        }
    }
}
</script>

<style>
</style>
