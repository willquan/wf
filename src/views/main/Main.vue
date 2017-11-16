<style lang="less">
@import "./main.less";
.header-avator-con {
  float: right;
}
</style>

<template>
<div class="main">
  <div class="sidebar-menu-con" :style="{width: sidebarWidth}">
    <div class="logo-con">
      <img v-show="!hideMenuText" src='/src/assets/images/logo.jpg' key="max-logo" />
      <img v-show="hideMenuText" src="/src/assets/images/logo-min.jpg" key="min-logo" />
    </div>
    <sidebar-menu v-if="!hideMenuText" :menuList="menuList" :iconSize="14" />
    <sidebar-menu-shrink :icon-color="menuIconColor" v-else :menuList="menuList" />
  </div>
  <Row type="flex" align="middle" class="main-header-con" :style="{paddingLeft: sidebarWidth}">
    <Col :span="12">
      <Button :style="{transform: navIconRotate}" type="text" @click="toggleClick">
        <Icon type="navicon" size="32"></Icon>
      </Button>
      <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
    </Col>
    <Col :span="12">
      <div class="header-avator-con">
        <icon-nav :icon-name="fullScreenIconName" :tip-content="fullScreenTip"></icon-nav>
        <icon-nav icon-name="locked" tip-content="锁屏" :icon-size="19"></icon-nav>
      </div>
    </Col>
  </Row>
</div>
</template>

<script>
import sidebarMenu from "../main_components/sidebarMenu.vue";
import tagsPageOpened from "../main_components/tagsPageOpened.vue";
import breadcrumbNav from "../main_components/breadcrumbNav.vue";
import sidebarMenuShrink from "../main_components/sidebarMenuShrink.vue";
import iconNav from "../main_components/iconNav.vue";
import Cookies from "js-cookie";
import util from "@/libs/util.js";

export default {
  components: {
    sidebarMenu,
    tagsPageOpened,
    breadcrumbNav,
    sidebarMenuShrink,
    iconNav
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
      lockScreenSize: 0,
      isFullScreen: false,
      currentPath: [{
          name: "首页",
          path: "",
          title: "首页"
        },
        {
          name: "组件",
          path: "",
          title: "组件"
        }
      ]
    };
  },
  computed: {
    menuList() {
      return this.$store.state.menuList;
    },
    sidebarWidth() {
      return this.hideMenuText ? "60px" : "200px";
    },
    navIconRotate() {
      return "rotateZ(" + this.hideMenuText ? "-90deg" : "0deg" + ")";
    },
    fullScreenIconName() {
      return this.isFullScreen ? 'arrow-shrink' : 'arrow-expand';
    },
    fullScreenTip() {
      return this.isFullScreen ? '退出全屏' : '全屏';
    }
  },
  methods: {
    toggleClick() {},
    handleFullScreen() {

    },
    lockScreen() {

    }
  }
};
</script>
