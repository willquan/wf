<style lang="less">
    @import './menu.less';
</style>

<template>
    <Menu ref="sideMenu" :active-name="$route.name" :open-names="$route.path.split('/')" :theme="menuTheme" width="auto" @on-select="changeMenu">
        <template v-for="item in menuList">
            <MenuItem v-if="item.children.length<=1" :name="item.children[0].name" :key="item.path">
                <Icon :type="item.icon" :size="iconSize" :key="item.path"></Icon>
                <span class="layout-text" :key="item.path">{{ itemTitle(item) }}</span>
            </MenuItem>

            <Submenu v-if="item.children.length>1" :name="item.name" :key="item.path">
                <template slot="title">
                    <Icon :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ itemTitle(item) }}</span>
                </template>
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
                        <span class="layout-text" :key="child.name">{{ child.meta.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
import util from '@/libs/util';
import Vue from 'vue';
export default {
    data () {
        return {
        };
    },
    mounted(){
    },
    name: 'sidebarMenu',
    props: {
        slotTopClass: String,
        menuList: Array,
        iconSize: Number,
        menuTheme: String
    },
    computed: {
      
    },
    methods: {
        changeMenu (active) {
            this.$router.push({
                name: active
            });
        },
        itemTitle (item) {
            return item.meta.title;
        }
    }
};
</script>
