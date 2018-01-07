<template>
<Modal
    class="body-no-padding"
    v-model="isShow"
    title="调用典型票"
    width="992">
    <div slot="footer">
            <Button type="text" @click="isShow=!isShow">取消</Button>
            <Button type="primary" @click="onOk">确定</Button>
    </div>
    <div style="padding-bottom: 150px; padding: 16px">
        <Row type="flex" justify="center" :gutter="16">
            <Col span="8">
               <Tree ref="tree" :data="treeData" :load-data="loadData" @on-select-change="getTypeTickets"></Tree>
            </Col>
            <Col span="16">
                <Row style="margin-bottom: 8px">
                    <Col span="24">
                        <Input type="text" v-model="taskName" @on-enter="startSearch" @on-click="()=>{taskName='';startSearch()}" placeholder="请输入操作任务，并回车" :icon="taskName!='' ? 'close-circled' : '' "/>
                    </Col>
                </Row>
                <Row>
                    <Col span="24">
                        <Table @on-current-change="onRowSelected" @on-row-dblclick="(currentRow)=>{this.selectedItem = currentRow; this.onOk()}" highlight-row ref="typicalTicketTable" :columns="columns" :data="tdata"></Table>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</Modal>
</template>

<script>
import { ApiEquipments } from '@/api/apiUtil'
import { ApiTypicalTickets } from '@/api/apiUtil'
import { Icon, Row, Col } from 'iview'
export default {
    name: "TypicalTicketModal",
    mounted: function() {
        this.beginQuery();
    },
    data() {
        return {
            treeData: [],
            selectedItem: {},
            isShow: false,
            taskName: '', //用于搜索
            selectedTree: {},
            columns:[
                {
                    type: 'index',
                    width: 50,
                },
                {
                    title: '典型票编号',
                    key: 'num',
                    width: 150
                },
                {
                    title: '操作任务',
                    key: 'taskName'
                }
            ],
            tdata: []
        }
    },
    methods: {
        show() {
            this.isShow = true;
        },
        startSearch() {
             this.getTypeTickets(this.$refs.tree.getSelectedNodes())
        },
        beginQuery() {
            let params = {parentId: 0};
            ApiEquipments.queryList(params).then(data => {
                this.convertData(data);
                this.treeData = data;
            });
        },
        loadData(item, callback) {
            ApiEquipments.queryList({parentId: item.id}).then(data => {
                this.convertData(data);
                callback(data);
            });
        },
       getTypeTickets(selectedNode) {
           if(selectedNode.length > 0) {
                this.selectedTree = selectedNode[0];
                let params = {equipmentId: selectedNode[0].id}
                if(this.taskName && this.taskName != '') {
                    params.taskName = this.taskName;
                }
                ApiTypicalTickets.queryList(params).then(data => {
                    this.tdata = data;
                });
           }
       },
        onOk() {
            if(this.selectedItem.id) {
                this.isShow = !this.isShow;
                this.$emit('TypicalTicketSelected', this.selectedItem);
            } else 
                this.$Message.warning('请选择典型票');
        },
        onRowSelected(currentRow) {
            this.selectedItem = currentRow;
        },
        convertData(data) {
            data.forEach(el => {
                el.title = el.name;
                el.loading = false;
                el.expand = false;
                if(el.hasChildren) el.children = []
            });
        }
    }
}
</script>