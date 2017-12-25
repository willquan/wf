<script>
import { ApiUser } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'
import apiMixin from './config'
import wfUtil from '@/libs/wfUtil.js'

export default {
    mixins: [listmixin, apiMixin],
    data() {
        return {
            cols: [
                {
                    type: 'index',
                    width: '50',
                },
                {
                    title: '缺陷单编号',
                    width: '100',
                    key: 'fnumber',
                },
                {
                    title: '状态',
                    key: 'fstate',
                    width: '100',
                    able2search: true,
                    render:(h, params) => {
                        return wfUtil.mapFstate(params.row.fstate)
                    }
                },
                {
                    title: '发现人',
                    key: 'userId',
                    width: '100',
                    render:(h, params) => {
                        return params.row.userName || params.row.user.name
                    }
                },
                {
                    title: '缺陷级别',
                    key: 'flevelId',
                    width: '100',
                    render:(h, params) => {
                        return params.row.flevelName || params.row.flevel.name
                    }
                },
                {
                    title: '缺陷描述',
                    key: 'desc',
                    width: '150',
                    ellipsis: true
                },
                {
                    title: '消缺班组',
                    key: 'groupId',
                    width: '100',
                    render:(h, params) => {
                        return params.row.groupName || params.row.group.name
                    }
                },
                {
                    title: '功能位置',
                    key: 'kksId',
                    width: '150',
                    render:(h, params) => {
                        return params.row.kksName || params.row.kks.name
                    }
                },
                {
                    title: '审核提交时间',
                    key: 'tjDate',
                    width: '150',
                    render:(h, params) => {
                        return params.row.tjDate
                    }
                },
                {
                    title: '提交验收时间',
                    key: 'tjDate',
                    width: '150',
                    render:(h, params) => {
                        return params.row.tjDate
                    }
                },
                {
                    title: '要求结束时间',
                    key: 'yqjsDate',
                    width: '150',
                    render:(h, params) => {
                        return params.row.yqjsDate || params.row.user.name
                    }
                },
                {
                    title: '处理情况',
                    key: 'comments',
                    ellipsis: true
                }
            ]
        }
    }
}
</script>
