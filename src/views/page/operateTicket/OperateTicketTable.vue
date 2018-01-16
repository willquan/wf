<script>
import EditTableMixin from '@/views/components/EditTable'

export default {
    name: "OperateTicketTable",
    mixins:[EditTableMixin],
    data() {
        return {
            rootName: 'OperateTicketTable',
            tableData: [
                //数据，可以是数据，对象
                {name:'穿好防护服，代号防护面罩和手套', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“分闸”位', isChecked:false},
                {name:'检查#6燃机保安进线三412A09框架开关在“工作”位', isChecked:false},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', isChecked:true},
                {name:'拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', isChecked:true},
                {name:'检查#6燃机保安进线三412A09框架开关在“试验”位', isChecked:true},
            ],
            colHeaders: ["操作内容", "逐条确认"],
            columns: [
                //添加每一列的数据类型和一些配置
                {
                    data: 'name',
                    type: "text",
                    width: 300
                },
                { 
                    data: 'isChecked',
                    type: "checkbox",
                    // 添加label以后，点击单元格，复选框状态也可改变
                    label: {
                        position: 'before',
                        value: '确认无误？'
                    }
                }
            ],
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
            if(isForced) {
                this.highlightSelectedRow();
            }
        });
    },
    methods: {
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
