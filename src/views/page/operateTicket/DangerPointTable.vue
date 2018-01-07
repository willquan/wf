<script>
import EditTableMixin from '@/views/components/EditTable'

export default {
    name: "DangerPointTable",
    mixins:[EditTableMixin],
    data() {
        return {
            rootName: 'DangerPointTable',
            tableData: [
                //数据，可以是数据，对象
                {title: '发布和接受命令出错', content: '操作人和监护人应了解操作目的和操作顺序，对指令有疑问应向值长询问清楚。值长在签发操作票之前必须认真审核操作票，确认无误后方可签名发令', isChecked:false},
                {title: '操作票填写错误',  content: '操作票由操作人填写，监护人审核，值长审核。正确填写和检查操作票填写内容正确；正确核对现场设备名称及标牌或系统图', isChecked:false},
                {title: '人员环境因素',  content: '进行操作的相关人员精神饱满，情绪稳定，身体良好。操作人员技能和岗位满足本次操作要求。周围无影响工作的其它因素', isChecked:false},
                {title: '跳步操作，操作漏相',  content: '电气操作时必须戴绝缘手套，面罩，穿好绝缘和防电弧服，正确使用验电器', isChecked:false},
            ],
            colHeaders: ["危险因素", "控制措施", "逐条确认"],
            columns: [
                //添加每一列的数据类型和一些配置
                {
                    data: 'title',
                    type: "text",
                },
                {
                    data: 'content',
                    type: "text",
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
        onCreateContextMenu(contextMenu) {
            let vueThis = this;
            contextMenu.items.import = {
                key: "import",
                name: "导入预控卡",
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
                    highlightSelector += '#DangerPointTable .ht_master tr:nth-child(' + (i+1) + ') > td,'
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

</style>
