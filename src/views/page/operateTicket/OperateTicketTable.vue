<script>
import EditTableMixin from '@/views/components/EditTable'

export default {
    name: "OperateTicketTable",
    mixins:[EditTableMixin],
    data() {
        return {
            tableData: [
                //数据，可以是数据，对象
                ['穿好防护服，代号防护面罩和手套', true],
                ['检查#6燃机保安进线三412A09框架开关在“分闸”位', true],
                ['检查#6燃机保安进线三412A09框架开关在“工作”位', true],
                ['拉开#6燃机保安进线三412A09框架开关储能电源QF2开关', true],
                ['拉开#6燃机保安进线三412A09框架开关储能电源QF1开关', true],
                ['检查#6燃机保安进线三412A09框架开关在“试验”位', true],
            ],
            colHeaders: ["操作内容", "逐条确认"],
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
        })
    }
}
</script>

<style>

</style>
