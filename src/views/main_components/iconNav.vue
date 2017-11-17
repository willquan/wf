<style lang="less" scoped>
.nav-icon-btn {
    display: inline-block;
    cursor: pointer;
    i {
        vertical-align: middle;
    }
}
</style>

<template>
<Tooltip :content="tipContent" :placement="placement" class="nav-icon-btn" :style="{'margin-left': ml, 'margin-right': mr}">
    <Icon :type="iconName" :size="iconSize"></Icon>
</Tooltip>
</template>

<script>
export default {
    props: {
        tipContent: {
            type: String,
            default: ""
        },
        iconName: {
            type: String,
            default: ""
        },
        iconSize: {
            type: Number,
            default: 23
        },
        placement: {
            type: String,
            default: "bottom"
        },
        ml: {
            type: String,
            default: "0px"
        },
        mr: {
            type: String,
            default: "16px"
        }
    },
    data() {
        return {
        }
    }
};
</script>