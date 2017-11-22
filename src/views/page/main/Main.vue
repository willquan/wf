<style lang="less">
@import "./main.less";
</style>

<template>
<div class="main">
  <div class="sidebar-menu-con" :style="{'width': sidebarWidth}">
    <div class="logo-con">
      <transition name="sidebar-annimation" mode="out-in">
        <img v-if="!hideMenuText" src='/src/assets/images/logo.jpg' key="max-logo" />
        <img v-else src="/src/assets/images/logo-min.jpg" key="min-logo" />
      </transition>
    </div>
    <transition name="sidebar-annimation">
      <sidebar-menu v-if="!hideMenuText" :menuList="this.menuList" :iconSize="14" key="large-menu" :menuTheme="menuTheme" />
      <sidebar-menu-shrink v-else :menuList="this.menuList" key="small-menu" :menuTheme="menuTheme" />
    </transition>
  </div>
  <Row type="flex" align="middle" class="main-navbar" :style="{paddingLeft: sidebarWidth}">
    <Col :span="12">
    <Button class="hamburger" v-bind:class="{'is-active':hideMenuText}" type="text" @click="toggleClick">
      <Icon type="navicon" size="32"></Icon>
    </Button>
    <breadcrumb-nav></breadcrumb-nav>
    </Col>
    <Col :span="12">
    <div class="nav-tools-bar">
      <span v-if="showFullScreenBtn" @click="handleFullScreen">
        <icon-nav :icon-name="fullScreenIconName" :tip-content="fullScreenTip"></icon-nav>
      </span>
      <span @click="lockScreen">
        <icon-nav icon-name="locked" tip-content="锁屏" :icon-size="17" style="padding-bottom:2px;"></icon-nav>
      </span>
      <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
        <a href="javascript:void(0)">
          <span class="main-user-name">{{ userName }}</span>
          <Icon type="arrow-down-b"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="ownSpace">个人中心</DropdownItem>
          <DropdownItem name="loginout" divided>退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    </Col>
  </Row>
  <div class="single-page-con" :style="{'left': sidebarWidth}">
    <div class="single-page">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</div>
</template>

<script>
import sidebarMenu from "@/views/components/sidebarMenu.vue";
import breadcrumbNav from "@/views/components/breadcrumbNav.vue";
import sidebarMenuShrink from "@/views/components/sidebarMenuShrink.vue";
import iconNav from "@/views/components/iconNav.vue";
import util from "@/libs/util.js";
import { mapState } from "vuex";

export default {
  components: {
    'sidebarMenu': sidebarMenu,
    breadcrumbNav,
    sidebarMenuShrink,
    iconNav
  },
  data() {
    return {
      currentPageName: "",
      hideMenuText: false,
      userName: "张三李四王五赵六",
      isFullScreen: false,
      lockScreenSize: 0
    };
  },
  mounted() {
    this.initLockScreen();
  },
  computed: {
    ...mapState({
      menuList: state => state.menu.menuList,
      menuTheme: state => state.menu.menuTheme
    }),
    sidebarWidth() {
      return this.hideMenuText ? "60px" : "200px";
    },
    fullScreenIconName() {
      return this.isFullScreen ? "arrow-shrink" : "arrow-expand";
    },
    fullScreenTip() {
      return this.isFullScreen ? "退出全屏" : "全屏";
    },
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf("MSIE") < 0;
    }
  },
  methods: {
    toggleClick() {
      this.hideMenuText = !this.hideMenuText;
    },
    handleFullScreen() {
      let main = document.body;
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
      this.isFullScreen = !this.isFullScreen;
    },
    initLockScreen() {
      let lockScreenBack = document.getElementById("lock_screen_back");
      let x = document.body.clientWidth;
      let y = document.body.clientHeight;
      let r = Math.sqrt(x * x + y * y);
      let size = parseInt(r);
      this.lockScreenSize = size;
      window.addEventListener("resize", () => {
        let x = document.body.clientWidth;
        let y = document.body.clientHeight;
        let r = Math.sqrt(x * x + y * y);
        let size = parseInt(r);
        this.lockScreenSize = size;
        lockScreenBack.style.transition = "all 0s";
        lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
      });
      lockScreenBack.style.width = lockScreenBack.style.height = size + "px";
    },
    lockScreen() {
      let lockScreenBack = document.getElementById("lock_screen_back");
      lockScreenBack.style.transition = "all 3s";
      lockScreenBack.style.zIndex = 10000;
      lockScreenBack.style.boxShadow =
        "0 0 0 " + this.lockScreenSize + "px #667aa6 inset";
      this.$store.commit('lock', this.$route.name)
      setTimeout(() => {
        lockScreenBack.style.transition = "all 0s";
        this.$router.push({
          name: "locking"
        });
      }, 800);
    },
    handleClickUserDropdown(name) {
      if (name === "ownSpace") {
        this.$router.push({
          name: "ownspace_index"
        });
      } else if (name === "loginout") {
        this.$store.dispatch("LogOut").then(resp => {
          this.$router.push({
            name: "login"
          });
        });
      }
    }
  }
};
</script>
