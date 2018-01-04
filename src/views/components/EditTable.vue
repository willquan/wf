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
          [1, '穿好防护服，代号防护面罩和手套', true],
          [2, '检查#6燃机保安进线三412A09框架开关在“分闸”位', true],
          [3, '检查#6燃机保安进线三412A09框架开关在“工作”位', true],
          [4, '拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', true],
          [5, '拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', true],
          [6, '检查#6燃机保安进线三412A09框架开关在“试验”位', true],
        ],
        colHeaders: ["序号", "操作内容", "逐条确认"], //自定义列表头or 布尔值
        columns: [
          //添加每一列的数据类型和一些配置
          {
            readOnly: true
          },
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
        ],
        afterSelectionEnd: function(r, c, r2, c2) {
          let startRow = r2 > r ? r : r2;
          let endRow = r2 > r ? r2 : r;
          // 不处理点击单个单元格的情况，用默认处理方式
          if(c === 2 && c2 === 2 && startRow != endRow) {
            let a = [];
            for(var i = startRow; i <= endRow; i++) {
              a.push([i, c, true]);
            }
            this.setDataAtCell(a);
          }
        },
        afterChange: function(change, source) {
          // console.log(change)
          if (source === "loadData") {
            return; //don't save this change
          }
          let highlightSelector = "";
          for(var i = 0; i < change.length; i++) {
            highlightSelector += '.ht_master tr:nth-child(' + (change[i][0]+1) + ')'
          }
          let allTDs = document.querySelectorAll(highlightSelector);
          for(let i=0; i<allTDs.length; i++) {
            allTDs[i].classList.add('selected-highlight');
          }
          console.log(highlightSelector)
        }
      }
    };
  },
  components: {
    HotTable
  },
  mounted: function() {
    console.log(this.$refs.hottable.table);
  },
  methods: {}
};
</script>

<style>
.selected-highlight {
  background-color:rgba(181,209,255,0.34) !important;
}
</style>