<template>
<Modal
    v-model="isShow"
    title="选择功能位置"
    width="768">
    <div slot="footer">
            <Button type="text" @click="isShow=!isShow">取消</Button>
            <Button type="primary" @click="onOk">确定</Button>
    </div>
    <div style="padding-bottom: 150px">
        <Row type="flex" justify="center" align="middle"
            style="
                background-color: #f8f8f9;
                border-top: 1px solid #e9eaec;
                border-bottom: 1px solid #e9eaec; 
                height:30px;
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
        <Tree :data="treeData" :load-data="loadData" :render="renderContent"></Tree>
    </div>
</Modal>
</template>

<script>
import { ApiKKS } from '@/api/apiUtil'
import { Icon, Row, Col } from 'iview'
export default {
    name: "FposModal",
    mounted: function() {
        ApiKKS.queryList({parentId: 0}).then(data => {
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
    data() {
        return {
            treeData: [],
            selectedItem: {},
            isShow: false
        }
    },
    methods: {
        show() {
            this.isShow = true;
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
                <Row type="flex" justify="center" align="middle" class={{'row-high-light': this.selectedItem.id==data.id}} nativeOnClick={()=>{this.selectedItem = data}}
                    style="border-bottom: 1px solid #e9eaec; padding-left: 16px;height:30px;">
                    <Col span="9" style={{paddingLeft : data.nodeLevel*16 + 'px'}}>
                        <span onClick={(event)=>{event.stopPropagation();data.expand = !data.expand; this.loadData(data,(children)=>{
                            data.children=children;
                            if(children.length == 0) data.hasChildren = false
                        })}}>
                        <Icon v-show={data.hasChildren} type={data.expand ? "arrow-down-b" : "arrow-right-b"} style="padding-right:4px"></Icon>
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
            );
        },
        onOk() {
            if(this.selectedItem.id) {
                this.isShow = !this.isShow;
                this.$emit('PosSelected', this.selectedItem);
            } else 
                this.$Message.warning('请选择一个节点');
        }
    }
}
</script>

<style>
span.ivu-tree-arrow {
    display: none;
}
div.ivu-modal-body {
    padding: 0px;
}
ul.ivu-tree-children {
    padding: 0px !important;
}
.row-high-light {
    background-color: #ebf7ff;
}
.ivu-tree ul li {
    margin: 0px !important;
}
</style>