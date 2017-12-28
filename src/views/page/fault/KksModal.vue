<template>
<Modal
    class="body-no-padding"
    v-model="isShow"
    title="选择功能位置"
    width="768">
    <div slot="footer">
            <Button type="text" @click="isShow=!isShow">取消</Button>
            <Button type="primary" @click="onOk">确定</Button>
    </div>
    <div style="padding-bottom: 150px;">
        <Row type="flex" justify="center" style="margin-top: 8px; margin-bottom: 4px;">
            <Col span="12" style="padding-left: 8px">
               <Input type="text" v-model="desc" @on-enter="startSearch()" @on-click="desc=''" placeholder="请输入KKS描述" :icon="desc!='' ? 'close-circled' : '' "/>
            </Col>
            <Col span="12" style="padding-left: 16px">
                <Button type="default" @click="startSearch()">搜索</Button>
            </Col>
        </Row>
        <Row type="flex" justify="center" align="middle"
            style="
                background-color: #f8f8f9;
                border-top: 1px solid #e9eaec;
                border-bottom: 1px solid #e9eaec; 
                height: 38px;
                padding-left: 16px
            ">
            <Col span="9">
                KKS编码
            </Col>
            <Col span="11">
                KKS描述
            </Col>
            <Col span="4">
                结构标识
            </Col>
        </Row>
        <Tree class="table-tree" :data="treeData" :load-data="loadData" :render="renderContent"></Tree>
    </div>
</Modal>
</template>

<script>
import { ApiKKS } from '@/api/apiUtil'
import { Icon, Row, Col } from 'iview'
export default {
    name: "KksModal",
    mounted: function() {
        this.beginQuery();
    },
    data() {
        return {
            treeData: [],
            selectedItem: {},
            isShow: false,
            desc: '' //用于搜索
        }
    },
    methods: {
        show() {
            this.isShow = true;
        },
        startSearch() {
            this.beginQuery();
        },
        beginQuery() {
            let params = {parentId: 0};
            if(this.desc && this.desc != '') {
                params = {desc: this.desc}
            }
            ApiKKS.queryList(params).then(data => {
                data.forEach(el => {
                    el.title = el.name + el.desc + el.sid,
                    el.loading = false,
                    el.expand = false,
                    el.hasChildren = true,
                    el.nodeLevel = 0,
                    el.children = []
                });
                this.treeData = data;
            });
        },
        loadData(item, callback) {
            ApiKKS.queryList({parentId: item.id}).then(data => {
                data.forEach(el => {
                    el.title = el.name + el.desc + el.sid,
                    el.loading = false,
                    el.expand = false,
                    el.hasChildren = true,
                    el.nodeLevel = item.nodeLevel + 1,
                    el.children = []
                });
                callback(data);
            });
        },
        renderContent(h, { root, node, data }) {
            return (
                <div onDblclick={(event)=>{event.stopPropagation(); this.requestExpand(data)}}>
                    <Row type="flex" justify="center" align="middle" class={{'row-high-light': this.selectedItem.id==data.id}} nativeOnClick={()=>{this.selectedItem = data}}
                        style="border-bottom: 1px solid #e9eaec; padding-left: 16px; height: 38px;">
                        <Col span="9" style={{paddingLeft : data.nodeLevel*16 + 'px'}}>
                            <span onClick={(event)=>{event.stopPropagation(); this.requestExpand(data)}}>
                            <Icon color={data.hasChildren ? '' : 'white'} type={data.expand ? "arrow-down-b" : "arrow-right-b"} style="margin-right:4px; width: 11px"></Icon>
                            <Icon size="16" type={data.expand||!data.hasChildren ? "android-folder-open" : "android-folder"} style="padding-right:4px"></Icon>
                            </span>
                            {data.name}
                        </Col>
                        <Col span="11">
                            {data.desc}
                        </Col>
                        <Col span="4">
                            {data.sid}
                        </Col>
                    </Row>
                </div>
            );
        },
        onOk() {
            if(this.selectedItem.id) {
                this.isShow = !this.isShow;
                this.$emit('KksSelected', this.selectedItem);
            } else 
                this.$Message.warning('请选择一个节点');
        },
        requestExpand(data) {
            data.expand = !data.expand; 
            this.loadData(data,(children)=>{
                data.children=children;
                if(children.length == 0) data.hasChildren = false
            })
        }
    },
    watch: {
        desc: function(value) {
            if(!value || value == '') {
                this.beginQuery();
            }
        }
    }
}
</script>

<style>
.table-tree span.ivu-tree-arrow {
    display: none;
}
.body-no-padding div.ivu-modal-body {
    padding: 0px;
}
.table-tree ul.ivu-tree-children {
    padding: 0px !important;
}
.table-tree .row-high-light {
    background-color: #ebf7ff;
}
.table-tree.ivu-tree ul li {
    margin: 0px !important;
}
</style>