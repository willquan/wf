<template>
<div>
    <Button type="primary" size="small" style="margin-right: 5px" @click="()=>{$emit('ViewBtnClicked')}">查看</Button>
    <Button type="primary" size="small" style="margin-right: 5px" @click="()=>{$emit('EditBtnClicked')}">编辑</Button>
    <Poptip confirm title="您确定要删除这条数据吗?" transfer placement="left" @on-ok="()=>{$emit('DelBtnClicked')}">
        <Button type="default" size="small" style="margin-right: 5px">删除</Button>
    </Poptip>
</div>
</template>

<script>
export default {
    name: 'TableOpBtns'
}
</script>

<style>

</style>
