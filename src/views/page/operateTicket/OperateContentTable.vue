<script>
import EditTableMixin from '@/views/components/EditTable'
import Handsontable from 'handsontable';//不能放到mixin里面
export default {
    name: "OperateContentTable",
    mixins:[EditTableMixin],
    data() {
        return {
            rootName: 'OperateTicketTable',
            height: (this.$store.getters.singlePageHeight-35),
            tableData: [
                //数据，可以是数据，对象
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
                {name:'穿好防护服，代号防护面罩和手套', nums:'1001,1002', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', nums:'1003', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', nums:'1004', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', nums:'', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', nums:'', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', nums:'', isChecked:true},
            ],
            colHeaders: ["操作内容", "关联预控卡号", "逐条确认"],
            columns: [
                //添加每一列的数据类型和一些配置
                {
                    data: 'name',
                    type: "text",
                    width: 300
                },
                {
                    data: 'nums',
                    readOnly: true,
                    renderer: function (instance, td, row, col, prop, value, cellProperties) {
                        Handsontable.dom.empty(td);
                        let a = document.createElement('a');
                        a.href="javascript:void(0);"
                        a.innerText=value;
                        td.appendChild(a);
                    }
                },
                { 
                    data: 'isChecked',
                    type: "checkbox",
                    // 添加label以后，点击单元格，复选框状态也可改变
                    label: {
                        position: 'after',
                        value: ' 确认无误？'
                    }
                }
            ],
            cell: [
                {row: 0, col: 1, comment: {value: '发布和接受命令出错-操作人和监护人应了解操作目的和操作顺序，对指令有疑问应向值长询问清楚。值长在签发操作票之前必须认真审核操作票，确认无误后方令可签名发'}},
                {row: 1, col: 1, comment: {value: '发布和接受命令出错-操作人和监护人应了解操作目的和操作顺序，对指令有疑问应向值长询问清楚。值长在签发操作票之前必须认真审核操作票，确认无误后方令可签名发'}}
            ]
        }
    },
    mounted: function() {
        //单元格修改前回调
        this.addHook("beforeChange", (change, source)=>{
            //防止改变勾选列
            for(var i = 0; i < change.length; i++) {
                let c = change[i][1];
                if(c === 1 && typeof change[i][3] != 'boolean') {
                    return false
                }
            }
        });
        this.highlightSelectedRow();
        this.addHook("afterRender", (isForced)=>{
            this.highlightSelectedRow();
        });
        this.addHook("afterOnCellMouseOver", (event, coords, TD)=>{
            let cellData = this.getHottableInstant().getDataAtCell(coords.row, coords.col);
            var commentsPlugin = this.getHottableInstant().getPlugin('comments');
            if(commentsPlugin.targetIsCellWithComment(event)) {
                setTimeout(function() {
                    let comments = document.querySelectorAll(".htCommentsContainer .htComments");
                    comments.forEach(el => {
                        //重新调整下备注弹框的位置
                        if(el.style.display == 'block') {
                            let rect = TD.getBoundingClientRect();
                            let commentWidth = 400;
                            el.style.left = (rect.left - commentWidth) + 'px';
                            el.style.top = rect.top + 'px';
                            let ta = el.querySelector('.htCommentTextArea');
                            ta.style.backgroundColor = '#eee'
                            ta.style.width= commentWidth + 'px';
                            ta.style.height = '200px';
                        }
                    })
                }, 200);
            }
        });
    },
    methods: {
        onCreateContextMenu(contextMenu) {
            let vueThis = this;
            contextMenu.items.import = {
                key: "import",
                name: "导入预控卡",
                disabled: function () {
                    //没选中任何单元格时，禁用
                    return !this.getSelected() || !this.getSelected()[0];
                },
                callback: function() {
                    vueThis.$Message.info('开始导入预控卡')
                }
            }
        },
        highlightSelectedRow() {
            let highlightSelector = "";
            for(var i = 0; i < this.tableData.length; i++) {
                let row = this.tableData[i]
                if(row.isChecked) {
                    highlightSelector += '#OperateTicketTable .ht_master tr:nth-child(' + (i+1) + ') > td,'
                }
            }
            if(highlightSelector.length > 0) {
                highlightSelector = highlightSelector.substring(0, highlightSelector.length - 1);
                let allTDs = document.querySelectorAll(highlightSelector);
                for(let i=0; i<allTDs.length; i++) {
                    allTDs[i].classList.add('selected-highlight');
                }
            }
        }
    }
}
</script>

<style>
.selected-highlight {
    background-color: rgba(181,209,255,0.34) !important;
}
</style>
