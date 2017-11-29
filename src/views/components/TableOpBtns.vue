<template>
<div>
    <Button type="primary" size="small" style="margin-right: 5px" @click="ViewBtnClicked" v-if="hasPermission('detail')">查看</Button>
    <Button type="primary" size="small" style="margin-right: 5px" @click="EditBtnClicked" v-if="hasPermission('update')">编辑</Button>
    <Poptip confirm title="您确定要删除这条数据吗?" transfer placement="left" @on-ok="DelBtnClicked" v-if="hasPermission('del')">
        <Button type="default" size="small" style="margin-right: 5px">删除</Button>
    </Poptip>
</div>
</template>

<script>
export default {
    name: 'TableOpBtns',
    props: {
        permissions: {
            type: Object, 
            default: function() { 
                return {}
            } 
        }
    },
    methods: {
        ViewBtnClicked() {
            this.$emit('ViewBtnClicked');
        },
        EditBtnClicked() {
            this.$emit('EditBtnClicked');
        },
        DelBtnClicked() {
            this.$emit('DelBtnClicked');
        },
        hasPermission(permissionName) {
            return this.permissions && this.permissions[permissionName]
        }
    }
}
</script>

<style>

</style>
