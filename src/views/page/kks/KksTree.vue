<template>
    <div style="padding-bottom: 150px;">
        <Row type="flex" justify="center" style="margin-top: 8px; margin-bottom: 4px;">
            <Col span="12" style="padding-bottom: 8px">
               <Input type="text" v-model="desc" @on-enter="startSearch" @on-click="()=>{desc='';startSearch()}" placeholder="请输入KKS描述" :icon="desc!='' ? 'close-circled' : '' "/>
            </Col>
            <Col span="12" style="padding-left: 16px">
                <Button type="default" @click="startSearch">搜索</Button>
            </Col>
        </Row>
        <Row type="flex" justify="center" align="middle" class="tree-table-row"
            style="background-color: #f8f8f9;border-top: 1px solid #e9eaec;">
            <Col span="10">
                KKS编码
            </Col>
            <Col span="9">
                KKS描述
            </Col>
            <Col span="5">
                操作
            </Col>
        </Row>
        <Tree class="table-tree" :data="treeData" :load-data="loadData" :render="renderContent"></Tree>
        <Modal
            v-model="isShow"
            title="添加KKS"
            @on-ok="ok"
            :loading = "isShow"
            >
            <Form ref="wfForm" :model="form" :rules="rules" label-position="left" :label-width="100">
                <FormItem prop="name" label="KKS名称">
                    <Input v-model="form.name" :maxlength="50" placeholder="请输入KKS名称" class="check-input"/>
                </FormItem>
                <FormItem prop="desc" label="KKS描述">
                    <Input v-model="form.desc" :maxlength="200" placeholder="请输入KKS描述" class="check-input"/>
                </FormItem>
                <FormItem prop="sid" label="结构标识">
                    <Input v-model="form.sid" :maxlength="20" placeholder="请输入结构标识" class="check-input"/>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import { Icon, Row, Col, Poptip, Button } from 'iview'
import apiMixin from './config'

export default {
    name: "KksTree",
    mixins:[apiMixin],
    mounted: function() {
        this.beginQuery();
    },
    data() {
        return {
            isShow: false,
            treeData: [],
            submitType: 0, // 1 添加，2编辑
            selectedItem: {},
            desc: '', //用于搜索
            form: {
                id: 0,
                parentId: 0,
                name: '',
                desc: '',
                sid: 'HNJT'
            },
            rules: {
                name: [
                    { required: true, message: 'KKS名称不能为空', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '描述不能为空', trigger: 'blur' }
                ],
                sid: [
                    { required: true, message: '标识不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        startSearch() {
            this.beginQuery();
        },
        ok() {
            this.$refs.wfForm.validate((valid) => {
                if (valid && this.isShow) {
                    if(this.submitType == 1) { //创建
                        this.getApi().create(this.form).then(()=>{
                            this.reloadParentNode(this.form);
                            this.isShow = false;
                        });
                    } else if(this.submitType == 2) {//更新
                        this.getApi().update(this.form).then(()=>{
                            this.reloadParentNode(this.form);
                            this.isShow = false;
                        });
                    }
                }
            });
        },
        beginQuery() {
            let params = {parentId: 0};
            if(this.desc && this.desc != '') {
                params = {desc: this.desc}
            }
            this.getApi().queryList(params).then(data => {
                data.forEach(el => {
                    el.loading = false;
                    el.expand = false;
                    el.nodeLevel = 0;
                    if(el.hasChildren) el.children = []
                });
                this.treeData = data;
            });
        },
        loadData(item, callback) {
            this.getApi().queryList({parentId: item.id}).then(data => {
                data.forEach(el => {
                    el.loading = false;
                    el.expand = false;
                    el.nodeLevel = item.nodeLevel + 1;
                    if(el.hasChildren) el.children = []
                });
                callback(data);
            });
        },
        reloadParentNode(node) { // 增删改之后重新加载节点信息
            let parent = this.findNodeById(node.parentId, this.treeData);
            if(parent) {
                this.loadData(parent,(children)=>{
                    if(children.length > 0) {
                        parent.hasChildren = true; // 防止添加第一个子节点或没有查到子节点时,父节点状态错误
                        parent.children = children;
                        parent.expand = true;
                    } else {
                        parent.hasChildren = false;
                        parent.children = undefined;
                        parent.expand = false; 
                    }
                });
            } else {
                this.beginQuery();
            }
        },
        renderContent(h, { root, node, data }) {
            return (
                <div onDblclick={(event)=>{event.stopPropagation(); this.requestExpand(data)}}>
                    <Row type="flex" justify="center" align="middle" class={[{'row-high-light': this.selectedItem.id==data.id}, 'tree-table-row']} nativeOnClick={()=>{this.selectedItem = data}}>
                        <Col span="10" style={{paddingLeft : data.nodeLevel*16 + 'px'}}>
                            <span onClick={(event)=>{event.stopPropagation(); this.requestExpand(data)}}>
                                <Icon color={data.hasChildren ? '' : 'white'} type={data.expand ? "arrow-down-b" : "arrow-right-b"} style="margin-right:4px; width: 11px"></Icon>
                            </span>
                            {data.name}
                        </Col>
                        <Col span="9">
                            {data.desc}
                        </Col>
                        <Col span="5">
                            <Button type="primary" size="small" style="margin-right: 4px" onClick={()=>{this.addNode(data)}} v-show={this.hasPermission('create')}>添加</Button>
                            <Button type="primary" size="small" style="margin-right: 4px" onClick={()=>{this.editNode(data)}} v-show={this.hasPermission('update')}>编辑</Button>
                            <Poptip confirm title="您确定要删除这条数据吗?" transfer placement="left" onOn-ok={()=>{this.deleteNode(data)}} v-show={this.hasPermission('del')}>
                                <Button type="default" size="small" style="margin-right: 4px">删除</Button>
                            </Poptip>
                        </Col>
                    </Row>
                </div>
            );
        },
        requestExpand(data) {
            if(data.hasChildren) {
                this.loadData(data,(children)=>{
                    data.children=children;
                    if(children.length > 0) parent.hasChildren = true;
                    else parent.hasChildren = false;
                    data.expand = !data.expand; 
                })
            }
        },
        addNode(node) {
            this.form.name = '';
            this.form.desc = '';
            this.form.parentId = node.id;
            this.isShow = true;
            this.submitType = 1;
        },
        editNode(node) {
            this.form = Object.assign({}, node);
            this.isShow = true;
            this.submitType = 2;
        },
        deleteNode(node) {
           this.getApi().delete(node.id).then(()=>{
                this.reloadParentNode(node);
           });
        },
        addRootNode() {
            this.form.name = '';
            this.form.desc = '部门';
            this.form.parentId = 0;
            this.isShow = true;
            this.submitType = 1;
        },
        findNodeById(id, data) {
            let result = undefined;
            data.forEach(el => {
                if(el.id == id) {
                    result = el;
                } else if(el.children && el.children.length > 0) {
                    result = this.findNodeById(id, el.children)
                }
            });
            return result;
        }
    }
}
</script>

<style>
.tree-table-row {
    border-bottom: 1px solid #e9eaec; 
    border-left: 1px solid #e9eaec;
    border-right: 1px solid #e9eaec;
    padding-left: 16px;
    height: 38px;
}
</style>
