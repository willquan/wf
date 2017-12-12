<template>
    <Row type="flex" justify="center">
        <Col span="20" :lg="15">
            <Card>
                <p slot="title">菜单权限设置</p>
                <Tree :data="treeData" show-checkbox multiple></Tree>
                <Button @click="handleSubmit" :loading="isLoading" type="primary" long>提交</Button>
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
        itemId: 0
    },
    data() {
        return {
            treeData: [],
            isLoading: false
        }
    },
    mounted: function() {
      ApiMenu.queryList().then((data) => {
        this.treeData = this.filterRoutes(appRouter, data);
      }).catch(error => {});
    },
    methods: {
        handleSubmit(){
            
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
    }
}
</script>

<style>

</style>
