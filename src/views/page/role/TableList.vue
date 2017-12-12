<script>
import { ApiUser } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'
import apiMixin from './config'
import TableRightBtns from './TableRightBtns'

export default {
    mixins: [listmixin, apiMixin],
    data() {
        return {
            cols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '角色名称',
                    key: 'name',
                    able2search: true
                },
                {
                    title: '菜单权限',
                    key: 'menus'
                },
                {
                    title: '权限',
                    key: 'rights'
                },
                {
                    title: '菜单&权限',
                    width: 150,
                    align: 'center',
                    render:(h, params) => {
                        return h(TableRightBtns, {
                            props: {
                                permissions: this.access[this.getApi().res]
                            },
                            on: {
                                MenuBtnClicked: () => {
                                    this.$emit('MenuBtnClicked', params.row.id);
                                },
                                RightBtnClicked: () => {
                                    this.$emit('RightBtnClicked', params.row.id);
                                }
                            }
                        })
                    }
                }
            ]
        }
    },
    mounted: function() {
    },
    methods: {
       
    }
}
</script>
