<template>
<div class="autotable">
    <Row type="flex" justify="center" align="middle" style="margin-bottom: 8px">
        <Col span="12">
            <Input v-model="searchContent" style="width: 300px" placeholder="搜索内容" class="condition-input">
                <Select v-model="searchField" slot="prepend" class="condition-select">
                    <Option v-for="search in searchFields" :value="search.key" :key="search.key">{{ search.title }}</Option>
                </Select>
                <Button slot="append" icon="ios-search" class="condition-btn"></Button>
            </Input>
        </Col>
        <Col span="12">
            <div style="float: right;">
                <Button><Icon type="ios-download-outline"></Icon>导出数据</Button>
            </div>
        </Col>
    </Row>
   
    <Table border :data="data" :columns="columns" stripe :loading="loading" @on-selection-change="selectChanged"></Table>
    <Row type="flex" justify="center" align="middle" style="margin-top: 8px">
        <Col span="12">
            <Poptip confirm title="您确定要删除这条数据吗?" transfer placement="right" @on-ok="()=>{$emit('DelBtnClicked', selectedArray)}">
                <Button>删除选中</Button>
            </Poptip>
        </Col>
        <Col span="12">
            <div style="float: right;">
                <Page :total="total" :current="1" :page-size="pageSize" @on-change="changePage" show-total show-elevator></Page>
            </div>
        </Col>
    </Row>
</div>
</template>

<script>
    export default {
        name: 'AutoTable',
        props: {
            loading: {type: Boolean, default: false},
            total: { type: Number, default: 0},
            pageSize: { type: Number, default: 20},
            searchFields: { type: Array, default: function(){ return [] } },
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
        created: function() {
            this.searchField = this.searchFields[0].key;
        },
        data() {
            return {
                selectedArray: [],
                searchField: '',
                searchContent: ''
            }
        },
        methods: {
            changePage(pageNum) {
                this.$emit('changePage', pageNum)
            },
            selectChanged(selection) {
                this.selectedArray = [];
                selection.forEach(el => {
                    this.selectedArray.push(el.id)
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    .condition-input {
    }
    .condition-select {
        width: 70px;
    }
    .condition-btn {
    }
</style>