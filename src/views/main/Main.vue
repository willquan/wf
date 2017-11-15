<style lang="less">
@import "./main.less";
</style>

<template>
<div>
    <Row type="flex">
        <Col :span="spanLeft" :style="{width: hideMenuText?'60px':'200px', overflow: hideMenuText ? 'visible' : 'auto', background: $store.state.menuTheme === 'dark'?'#495060':'white'}">
            <div class="logo-con">
                <img v-show="!hideMenuText" src='/src/assets/images/logo.jpg' key="max-logo" />
                <img v-show="hideMenuText" src="/src/assets/images/logo-min.jpg" key="min-logo" />
            </div>
            <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14" />
            <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menuList" />
        </Col>
        <Col :span="spanRight">
        </Col>
    </Row>
</div>
</template>

<script>
import sidebarMenu from "../main_components/sidebarMenu.vue";
import tagsPageOpened from "../main_components/tagsPageOpened.vue";
import breadcrumbNav from "../main_components/breadcrumbNav.vue";
import sidebarMenuShrink from "../main_components/sidebarMenuShrink.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";

export default {
  components: {
    sidebarMenu,
    tagsPageOpened,
    breadcrumbNav,
    sidebarMenuShrink
  },
  data() {
    return {
      spanLeft: 4,
      spanRight: 20,
      currentPageName: "",
      hideMenuText: false,
      userName: "",
      showFullScreenBtn: window.navigator.userAgent.indexOf("MSIE") < 0,
      messageCount: 0,
      lockScreenSize: 0
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    }
  }
};
</script>
