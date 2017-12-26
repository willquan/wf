<template>
<div>
    <Row type="flex" justify="center" align="middle" style="margin-bottom: 8px">
        <Col span="12">
            <Input v-if="searchFields.length > 0" v-model="searchContent" style="width: 300px" placeholder="搜索内容" class="condition-input" @on-enter="search">
                <Select v-model="searchField" slot="prepend" style="width: 70px;">
                    <Option v-for="search in searchFields" :value="search.key" :key="search.key">{{ search.title }}</Option>
                </Select>
                <Button slot="append" icon="ios-search" class="condition-btn" @click="search"></Button>
            </Input>
        </Col>
        <Col span="12">
            <div style="float: right;">
                <Button @click="refreshTable"><Icon type="refresh"></Icon>刷新列表</Button>
                <Button v-if="permissions.export"><Icon type="ios-download-outline"></Icon>导出数据</Button>
            </div>
        </Col>
    </Row>
   
    <Table border :data="data" :columns="columns" :loading="loading" @on-row-dblclick="this.onRowDbClick" @on-expand="onExpand" @on-selection-change="selectChanged"></Table>
    <Row type="flex" justify="center" align="middle" style="margin-top: 8px;">
        <Col span="12">
            <Poptip v-if="permissions && permissions.del && permissions.dels" confirm title="您确定要删除这条数据吗?" transfer placement="top" @on-ok="()=>{$emit('DelBtnClicked', selectedArray)}">
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
            permissions: {type: Object, default: function(){ return {}} },
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
            if(this.searchFields && this.searchFields.length > 0)
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
            },
            refreshTable() {
                this.$emit('RefreshTable')
            },
            search() {
                let searchCondition = {}
                searchCondition[this.searchField] = this.searchContent;
                if(this.searchField && this.searchContent) {
                    this.$emit('SearchClicked', searchCondition)
                } else {
                    this.$emit('SearchClicked', undefined)
                }
            },
            onExpand(row, status) {
                this.$emit('onExpand', row)
            },
            onRowDbClick(row, index) {
                this.$emit('onRowDbClick', row)
            }
        }
    }
</script>