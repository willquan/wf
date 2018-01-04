<template>
  <div>
      <Button type="primary" @click="click">sss</Button>
      <div id="example-container" class="wrapper">
      <HotTable ref="hottable" :root="root" :settings="hotSettings"></HotTable>
    </div>
  </div>

</template>
<script>
  import HotTable from 'vue-handsontable-official';
  export default {
    data: function () {
      return {
        root: 'test-hot',
        hotSettings: {
          data: [        //数据，可以是数据，对象
            ['20080101', 10, 11, 12, 13,true],
            ['20090101', 20, 11, 14, 13,true],
            ['20010101', 30, 15, 12, 13,true],
            ['20010101', 32, 213, 21, 312,true],
            ['20010201', 32, 213, 21, 312,true],
            ['20010301', 32, 213, 21, 312,true],
            ['20010401', 32, 213, 21, 312,true],
            ['20010501', 32, 213, 21, 312,true],
            ['20010601', 32, 213, 21, 312,true]
          ],
          startRows: 11,//行列范围
          startCols: 6,
          minRows: 5,  //最小行列
          minCols: 5,
          maxRows: 20,  //最大行列
          maxCols: 20,
          rowHeaders: true,//行表头
          colHeaders:   ['时间', 'Kia', 'Nissan', 'Toyota', 'Honda','123'],//自定义列表头or 布尔值
          minSpareCols: 2, //列留白
          minSpareRows: 2,//行留白
          currentRowClassName: 'currentRow', //为选中行添加类名，可以更改样式
          currentColClassName: 'currentCol',//为选中列添加类名
          autoWrapRow: true, //自动换行
          contextMenu: {   //自定义右键菜单，可汉化，默认布尔值
            items: {
              "row_above": {
                name:'上方插入一行'
              },
              "row_below": {
                name:'下方插入一行'
              },
              "col_left": {
                name:'左方插入列'
              },
              "col_right": {
                name:'右方插入列'
              },
              "hsep1": "---------", //提供分隔线
              "remove_row": {
                name: '删除行',
              },
              "remove_col": {
                name: '删除列',
              },
              "make_read_only": {
                name: '只读',
              },                     
              "borders": {
                name: '表格线',
              },
              "commentsAddEdit": {
                name: '添加备注',
              },
              "commentsRemove": {
                name: '取消备注',
              },
              "freeze_column": {
                name: '固定列',
              },
              "unfreeze_column": {
                name: '取消列固定',
              },
              "hsep2": "---------",
                       }
          },//右键效果
          fillHandle: true, //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
          fixedColumnsLeft: 0,//固定左边列数
          fixedRowsTop: 0,//固定上边列数
          // mergeCells: [   //合并
          //    {row: 1, col: 1, rowspan: 3, colspan: 3},  //指定合并，从（1,1）开始行3列3合并成一格
          //    {row: 3, col: 4, rowspan: 2, colspan: 2}
          // ],
          columns: [     //添加每一列的数据类型和一些配置
            {
              type: 'numeric',   //时间格式
              // dateFormat: 'YYYYMMDD',
              // correctFormat: true,
              // defaultDate: '19000101'
            },
            {
              type: 'dropdown', //下拉选择
              source: ['BMW', 'Chrysler', 'Nissan', 'Suzuki', 'Toyota', 'Volvo'],
              strict: false   //是否严格匹配
            },
            {type: 'numeric'},  //数值
            {type: 'numeric',
              readOnly: true  //设置只读
            },
            { type: 'numeric',
              format: '$ 0,0.00'},  //指定的数据格式
            {type: 'checkbox'},  //多选框
          ],
          manualColumnFreeze: true, //手动固定列
          manualColumnMove: true, //手动移动列
          manualRowMove: true,   //手动移动行
          manualColumnResize: true,//手工更改列距
          manualRowResize: true,//手动更改行距
          comments: true, //添加注释
          // cell: [
          //   {row: 1, col: 1, comment: {value: 'this is test'}},
          // ],
          customBorders:[],//添加边框
          columnSorting: true,//排序
          stretchH: 'all',//根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        }
      };
    },
    name: 'SampleApp',
    components: {
      HotTable
    },
    mounted: function() {
     console.log(this.$refs.hottable.table)
    },
    methods: {
      click() {
         console.log(this.$refs.hottable.table.getValue())
         this.$refs.hottable.table.selectCell(0, 0, 1, 5)
      }
    }
  }
</script>

<style>
  button{
    margin: 20px 20px;
  }
  .handsontable .currentRow {
    background-color: #E7E8EF;
  }

  .handsontable .currentCol {
    background-color: #F9F9FB;
  }
  #test-hot {
    width: 800px;
    height: 800px;
    overflow: hidden;
  }
</style>