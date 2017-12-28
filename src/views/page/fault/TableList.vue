<script>
import { ApiUser } from '@/api/apiUtil'
import listmixin from '@/views/page/mixins/list'
import apiMixin from './config'
import wfUtil from '@/libs/wfUtil.js'
import { Row, Col, Checkbox, Button } from 'iview'
export default {
    mixins: [listmixin, apiMixin],
    data() {
        return {
            cols: [
                {
                    type: 'expand',
                    width: 50,
                    render: (h, params) => {
                        return (
                            <div>
                                <Row type="flex">
                                    <Col span="8">
                                        <span style="color: #9ea7b4">审核提交时间：</span> <span>{params.row.tjDate}</span>
                                    </Col>
                                    <Col span="8">
                                        <span style="color: #9ea7b4">提交验收时间： </span> <span>{params.row.tjDate}</span>
                                    </Col>
                                    <Col span="8">
                                        <span style="color: #9ea7b4">要求结束时间： </span> <span>{params.row.yqjsDate}</span>
                                    </Col>
                                </Row>
                                <Row type="flex" style="margin-top: 4px; margin-bottom: 4px">
                                    <Col span="24">
                                        <span style="color: #9ea7b4">缺陷描述：</span> <span>{params.row.desc}</span>
                                    </Col>
                                </Row>
                                <Row type="flex">
                                    <Col span="24">
                                        <span style="color: #9ea7b4">处理情况： </span> <span>{params.row.comments}</span>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }
                },
                {
                    type: 'index',
                    width: '60',
                },
                {
                    title: '缺陷单编号',
                    width: '100',
                    key: 'fnumber',
                },
                {
                    title: '状态',
                    key: 'fstate',
                    able2search: true,
                    render:(h, params) => {
                        return wfUtil.mapFstate(params.row.fstate)
                    }
                },
                {
                    title: '发现人',
                    key: 'userId',
                    render:(h, params) => {
                        return params.row.userName || params.row.user.name
                    }
                },
                {
                    title: '缺陷级别',
                    key: 'flevelId',
                    ellipsis: true,
                    render:(h, params) => {
                        return params.row.flevelName || params.row.flevel.name
                    }
                },
                {
                    title: '缺陷描述',
                    key: 'desc',
                    ellipsis: true,
                    render:(h, params) => {
                        return <a href="javascript:void(0);" onClick={()=>{this.expendRow(params.row)}}>{params.row.desc}</a>
                    }
                },
                {
                    title: '消缺班组',
                    key: 'groupId',
                    ellipsis: true,
                    render:(h, params) => {
                        return params.row.teamName || params.row.groupIds
                    }
                },
                {
                    title: '功能位置',
                    key: 'kksId',
                    ellipsis: true,
                    render:(h, params) => {
                        return params.row.kksDesc || params.row.kks.desc
                    }
                },
                {
                    title: '处理情况',
                    key: 'comments',
                    ellipsis: true,
                    render:(h, params) => {
                        return <a href="javascript:void(0);" onClick={()=>{this.expendRow(params.row)}}>{params.row.comments}</a>
                    }
                }
            ]
        }
    },
    methods: {
        expendRow(row) {
            this.tableData.forEach(element => {
                if(element.id == row.id) {
                    element._expanded = !element._expanded;
                } else {
                    element._expanded = false;
                }
            });
        }
    }
}
</script>
