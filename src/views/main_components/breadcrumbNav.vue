<template>
<Breadcrumb :style="{'display': displayType, 'vertical-align': verticalAlign}">
    <BreadcrumbItem v-for="item in currentPath" :href="item.path" :key="item.name">{{item.title}}</BreadcrumbItem>
</Breadcrumb>
</template>

<script>
export default {
    name: 'breadcrumbNav',
    props: {
        currentPath: Array,
        isBlock: {type: Boolean, default: false},
        verticalAlign: {
            type: String, 
            default: "middle", 
            validator:function(align){
                return align=="middle" || align == "top" || align == "bottom"
            }
        }
    },
    methods: {
       
    },
    computed: {
        displayType() {
            return this.isBlock ? "block" : "inline-block";
        }
    }
};
</script>

