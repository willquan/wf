<template>
    <Row type="flex" justify="center">
        <Col span="20" :lg="15">
            <Card>
                <p slot="title">菜单设置</p>
                <Tree :data="treeData" show-checkbox multiple></Tree>
                <Button @click="handleSubmit" :loading="isLoading" style="margin-top: 32px" type="primary" long>提交</Button>
            </Card>
        </Col>
    </Row>
</template>

<script>
import apiMixin from './config';
import {appRouter} from '@/router/router';
import {ApiMenu} from '@/api/apiUtil';

export default {
    mixins:[apiMixin],
    name: 'MenuTab',
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
        this.queryMenu();
    },
    methods: {
        handleSubmit(){
            this.$emit('FormDataChanged')
        },
        queryMenu() {
            ApiMenu.queryList(/*{roleId: this.itemId}*/).then((data) => {
                this.treeData = this.filterRoutes(appRouter, data);
            }).catch(error => {});
        },
        filterRoutes(routers, menus) {
            let tree = [];
            routers.forEach(router => {
                let node = {
                    name: router.name,
                    title: router.meta.title,
                    expand: true,
                    children: []
                }
                tree.push(node);
                router.children.forEach(rChild=>{
                    node.children.push({
                        title: rChild.meta.title,
                        checked: false,
                        name: rChild.name
                    });
                    menus.forEach(menu => {
                        if(router.name == menu.name) {
                            menu.children.forEach(mChild=>{
                                if(rChild.name == mChild.name) {
                                    node.checked = true;
                                }
                            });
                        }
                    });
                });
            });
            return tree;
        },
    },
    watch: {
        itemId: function(newId) {
            this.queryMenu();
        }
    },
}
</script>

<style>

</style>
