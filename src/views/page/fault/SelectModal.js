import { Modal, Table, Checkbox, Button } from 'iview'
export default {
    render(h) {
        return (
            <Modal
                value={this.isShow}
                title={this.title}
                width="768"
                onOn-visible-change={(val)=>{this.isShow = val}} //不支持v-model
                onOn-cancel={this.cancel}>
                <div slot="footer">
                     <Button type="text" onClick={this.cancel}>取消</Button>
                     <Button type="primary" onClick={this.ok}>确定</Button>
                </div>
                <Table onOn-row-dblclick={(row)=>{this.currentRow=row; this.ok()}} onOn-current-change={this.onSelected} height="500" highlight-row columns={this.icolumns} data={this.data}></Table>
            </Modal>
        );
    },
    props: {
        title: String
    },
    data () {
        return {
            isShow: false,
            data: [],
            currentRow: {},
            cbCol: {
                title: ' ',
                width: 30,
                render(h, params) {
                    return (
                        <Checkbox value={params.row._highlight}></Checkbox>
                    )
                }
            }
        }
    },
    computed: {
        icolumns: function () {
            this.columns.splice(0, 0, this.cbCol);
            return this.columns;
        }
    },
    methods: {
        show() {
            this.isShow = true;
        },
        ok () {
            if(this.currentRow.id) {
                this.$emit('ItemDidSelect', this.currentRow);
                this.isShow = false;
            } else {
                this.$Message.info('请点击选择一行数据');
            }
        },
        cancel () {
            this.isShow = false;
        },
        onSelected(currentRow) {
            this.data.forEach((e, i) => {
                if(e.id == currentRow.id) {
                    this.data[i]._highlight = true;
                }
                if(this.currentRow.id && e.id == this.currentRow.id) {
                    this.data[i]._highlight = false;
                }
            });
            this.currentRow = currentRow;
        },
        dataDidLoad(data) {
            data.forEach((e, i) => {
                e._highlight= false
            });
        }
    }
}