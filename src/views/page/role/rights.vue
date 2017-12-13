<template>
    <Row type="flex" justify="center">
        <Col span="20" :lg="15">
            <Card>
                <p slot="title">权限设置</p>
                <Tree :data="treeData" show-checkbox multiple></Tree>
                <Button @click="handleSubmit" :loading="isLoading" style="margin-top: 32px" type="primary" long>提交</Button>
            </Card>
        </Col>
    </Row>
</template>

<script>
import apiMixin from './config';
import {ApiRights, resMap, rightsMap} from '@/api/apiUtil';

export default {
    mixins:[apiMixin],
    name: 'RightsTab',
    props: {
       itemId: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            treeData: [],
            isLoading: false
        }
    },
    mounted: function() {
        this.queryRight();
    },
    methods: {
        handleSubmit(){
            this.$emit('FormDataChanged')
        },
        queryRight() {
            ApiRights.queryList({roleId: this.itemId}).then((data) => {
                this.treeData = this.createTreeData(data);
            }).catch(error => {});
        },
        createTreeData(data) {
            let tree = [];
            data.forEach(right => {
                let node = {
                    res: right.res,
                    title: resMap[right.res],
                    expand: false,
                    children: []
                }
                for (const key in right) {
                    if (right.hasOwnProperty(key) && rightsMap[key]) {
                        const val = right[key];
                        let cNode = {
                            title: rightsMap[key],
                            expand: true,
                            checked: val
                        }
                        node.children.push(cNode);
                    }
                }
                tree.push(node);
            });
            return tree;
        },
    },
    watch: {
        itemId: function(newId) {
            this.queryRight();
        }
    },
}
</script>

<style>

</style>
