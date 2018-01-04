<template>
  <div>
      <HotTable ref="hottable" :root="root" :settings="hotSettings"></HotTable>
  </div>

</template>
<script>
import HotTable from "vue-handsontable-official";

export default {
  data: function() {
    return {
      name: "EditTable",
      root: "HotTableRoot",
      hotSettings: {
        fillHandle: true, //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        rowHeaders: true, //行表头
        manualRowMove: true, //手动移动行
        stretchH: "all", //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        contextMenu: {
          //自定义右键菜单，可汉化，默认布尔值
          items: {
            row_above: {
              name: "上方插入一行"
            }, 
            row_below: {
              name: "下方插入一行"
            },
            remove_row: {
              name: "删除行"
            }
          }
        }, //右键效果
        data: [
          //数据，可以是数据，对象
          ['穿好防护服，代号防护面罩和手套', true],
          ['检查#6燃机保安进线三412A09框架开关在“分闸”位', true],
          ['检查#6燃机保安进线三412A09框架开关在“工作”位', true],
          ['拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', true],
          ['拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', true],
          ['检查#6燃机保安进线三412A09框架开关在“试验”位', true],
        ],
        colHeaders: ["操作内容", "逐条确认"], //自定义列表头or 布尔值
        columns: [
          //添加每一列的数据类型和一些配置
          {
            type: "text",
          },
          { 
            type: "checkbox",
            // 添加label以后，点击单元格，复选框状态也可改变
            label: {
              position: 'before',
              value: '确认无误？'
            }
          }
        ]
      }
    };
  },
  components: {
    HotTable
  },
  mounted: function() {
    
  },
  methods: {}
};
</script>

<style>
.selected-highlight {
  background-color:rgba(181,209,255,0.34) !important;
}
</style>