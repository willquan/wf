<script>
import HotTable from "vue-handsontable-official";
import SheetClip from "handsontable/lib/SheetClip/SheetClip";
import {Row, Col, Poptip, Button } from 'iview'
var clipboardCache = '';
export default {
  render(h) {
    return (
          <HotTable ref="hottable" root={this.rootName} height={this.height} cell={this.cell} settings={this.hotSettings} data={this.tableData} colHeaders={this.colHeaders} columns={this.columns}></HotTable>
      )
  },
  data() {
    return {
      name: "EditTable",
      height: 400,
      hotSettings: {
        fillHandle: 'vertical', //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        rowHeaders: true, //行表头
        manualRowMove: true, //手动移动行
        stretchH: "all", //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
        copyPaste: true,
        autoWrapRow: true, //自动换行
        manualRowResize: true,
        manualColumnResize: true,
        comments: {displayDelay:100},
        afterRender: function() {
          //conner单元格显示“序号”
          setTimeout(function() {
                let a = document.querySelectorAll(".colHeader.cornerHeader");
                for(var i = 0; i < a.length; i++) {
                  a[i].innerText = '序号';
                }
          }, 20);
        },
        afterCopy: function(changes) {
          clipboardCache = SheetClip.stringify(changes);
        },
        afterCut: function(changes) {
          clipboardCache = SheetClip.stringify(changes);
        },
        afterPaste: function(changes) {
          // we want to be sure that our cache is up to date, even if someone pastes data from another source than our tables.
          clipboardCache = SheetClip.stringify(changes);
        },
        
      }
    };
  },
  components: {
    HotTable
  },
  mounted: function() {
    let contextMenu = {
      //自定义右键菜单，可汉化，默认布尔值
      items: {
        row_above: {
          name: "上方插入一行",
        }, 
        row_below: {
          name: "下方插入一行"
        },
        "hsep1": "---------", //提供分隔线
        remove_row: {
          name: "删除行"
        },
        "hsep2": "---------",
        copy: {
          name: "拷贝",
          disabled: function () {
            //没选中任何单元格时，禁用
            return !this.getSelected();
          }
        },
        cut: {
          name: "剪切",
          disabled: function () {
            //没选中任何单元格时，禁用
            return !this.getSelected();
          }
        },
        paste : {
          key: 'paste',
          name: '粘贴',
          disabled: function() {
            return !this.getSelected();
          },
          callback: function() {
            var plugin = this.getPlugin('copyPaste');
            this.listen();
            plugin.paste(clipboardCache);
          }
        }
      }
    } //右键效果
    this.onCreateContextMenu(contextMenu);
    this.updateSettings({contextMenu: contextMenu});
  },
  methods: {
    addHook(key, callback) {
      this.$refs.hottable.table.addHook(key, callback);
    },
    updateSettings(settings) {
      this.getHottableInstant().updateSettings(settings);
    },
    getHottableInstant() {
      return this.$refs.hottable.table;
    },
    onCreateContextMenu() {

    }
  }
};
</script>