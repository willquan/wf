<template>
    <div style="padding-bottom: 150px;">
        <Row type="flex" justify="center" align="middle"
            style="
                background-color: #f8f8f9;
                border-top: 1px solid #e9eaec;
                border-bottom: 1px solid #e9eaec; 
                height: 38px;
                padding-left: 16px
            ">
            <Col span="9">
                组织名称
            </Col>
            <Col span="11">
                组织类型
            </Col>
            <Col span="4">
                操作
            </Col>
        </Row>
        <Tree class="table-tree" :data="treeData" :load-data="loadData" :render="renderContent"></Tree>
    </div>
</template>

<script>
import { ApiDep } from '@/api/apiUtil'
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
        }
    },
    methods: {
        beginQuery() {
            let params = {parentId: 0};
            if(this.desc && this.desc != '') {
                params = {desc: this.desc}
            }
            ApiDep.queryList(params).then(data => {
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
            ApiDep.queryList({parentId: item.id}).then(data => {
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
                    <Row type="flex" justify="center" align="middle"
                        style="border-bottom: 1px solid #e9eaec; padding-left: 16px; height: 38px;">
                        <Col span="9" style={{paddingLeft : data.nodeLevel*16 + 'px'}}>
                            <span onClick={(event)=>{event.stopPropagation(); this.requestExpand(data)}}>
                            <Icon v-show={data.hasChildren} type={data.expand ? "chevron-down" : "chevron-right"} style="margin-right:8px; width: 11px"></Icon>
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
        requestExpand(data) {
            data.expand = !data.expand; 
            this.loadData(data,(children)=>{
                data.children=children;
                if(children.length == 0) data.hasChildren = false
            })
        }
    }
}
</script>