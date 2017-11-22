<template>
<Breadcrumb :style="{'display': displayType, 'vertical-align': verticalAlign}">
    <BreadcrumbItem v-for="item in levelList" :href="item.path" :key="item.name">{{item.title}}</BreadcrumbItem>
</Breadcrumb>
</template>

<script>
export default {
    name: "breadcrumbNav",
    created() {
        this.getBreadcrumb();
    },
    data() {
        return {
            levelList: []
        };
    },
    props: {
        isBlock: {
            type: Boolean,
            default: false
        },
        verticalAlign: {
            type: String,
            default: "middle",
            validator: function(align) {
                return align == "middle" || align == "top" || align == "bottom";
            }
        }
    },
    methods: {
        getBreadcrumb() {
            let matched = this.$route.matched.filter(item => item.name);
            this.levelList = [];
            if(matched.length == 2) { //防止访问一级目录报错
                matched.forEach((element, index) => {
                const path = (index == 0 ? "" : element.path);
                this.levelList.push({
                    name: element.name,
                    path: path,
                    title: element.meta.title
                });
            });
            //一级菜单只显示一个
            if (this.levelList[0].title == this.levelList[1].title) {
                const i = this.levelList[1];
                this.levelList=[];
                this.levelList.push(i);
            }
            }
        }
    },
    computed: {
        displayType() {
            return this.isBlock ? "block" : "inline-block";
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }
};
</script>

