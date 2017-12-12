<template>
<div>
    <Button type="primary" size="small" style="margin-right: 5px" @click="MenuBtnClicked" v-if="hasPermission('update')">菜单</Button>
    <Button type="primary" size="small" style="margin-right: 5px" @click="RightBtnClicked" v-if="hasPermission('update')">权限</Button>
</div>
</template>

<script>
export default {
    name: 'TableRightBtns',
    props: {
        permissions: {
            type: Object, 
            default: function() { 
                return {}
            } 
        }
    },
    methods: {
        MenuBtnClicked() {
            this.$emit('MenuBtnClicked');
        },
        RightBtnClicked() {
            this.$emit('RightBtnClicked');
        },
        hasPermission(permissionName) {
            return this.permissions && this.permissions[permissionName]
        }
    }
}
</script>

<style>

</style>
