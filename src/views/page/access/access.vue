<template>
    <Tabs type="card">
        <TabPane v-for="tab in tabs" :key="tab" :label="'标签' + tab">
            <employee-form ></employee-form>
        </TabPane>
        <Button type="ghost" @click="handleTabsAdd" size="small" slot="extra">增加</Button>
    </Tabs>
</template>
<script>
import employeeForm from '../employee/employeeForm'
    export default {
        components: {
        employeeForm
    },
        data () {
            return {
                tabs: 2
            }
        },
        methods: {
            handleTabsAdd () {
                this.tabs ++;
            }
        }
    }
</script>
