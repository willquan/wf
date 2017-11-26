<template>
<div>
    <Table border :data="data" :columns="columns" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :current="1" @on-change="changePage" show-total show-elevator></Page>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: 'AutoTable',
        props: {
            total: Number,
            columns: {
                type: Array,
                default: function() {
                    return []
                }
            },
            data:{
                type: Array,
                default: function() {
                    return []
                }
            }
        },
        methods: {
            changePage(pageNum) {
                this.$emit('changePage')
            }
        }
    }
</script>