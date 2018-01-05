<template>
<Row>
    <Col span="24">
        <Row type="flex" justify="center">
            <Col span="24">
                <Steps :current="currentStep" size="small">
                    <Step @click.native="currentStep = 0" title="关联典型票"></Step>
                    <Step @click.native="currentStep = 1" title="操作内容"></Step>
                    <Step @click.native="currentStep = 2" title="危险点预控卡"></Step>
                    <Step @click.native="currentStep = 3" title="审批流程"></Step>
                </Steps>
            </Col>
        </Row>
        <Row>
            <Col span="24" style="margin-top: 8px">
                <Tabs class="no-tabs" v-model="currentTab">
                    <TabPane label="标签一" name="tab0">
                        <Row type="flex" justify="center" style="margin-top: 16px">
                            <Col span="20" :lg="15">
                                <Card>
                                    <p slot="title">引用典型票</p>
                                    <Form ref="wfForm" :model="form" :rules="rules" label-position="left" :label-width="80">
                                        <FormItem prop="typicalTicketId" label="典型票">
                                            <Input class="input-disabled-white-bg" v-model="typicalTicket.typicalTicketName" placeholder="请选择典型票" :disabled="true">
                                                <Button v-if="isEditable" slot="append" icon="ios-search" @click="$refs.typicalTicketModal.show()"></Button>
                                            </Input>
                                        </FormItem>
                                        <FormItem prop="typicalTicketTitle" label="操作任务">
                                            <Input v-model="typicalTicket.title" placeholder="操作任务"/>
                                        </FormItem>
                                        <FormItem label="单元">
                                            <Input v-model="typicalTicket.unitName" placeholder="选择典型票后 自动填充" disabled/>
                                        </FormItem>
                                        <FormItem label="机组">
                                            <Input v-model="typicalTicket.machineGroupName" placeholder="选择典型票后 自动填充" disabled/>
                                        </FormItem>
                                        <FormItem label="值别">
                                            <Input v-model="typicalTicket.groupName" placeholder="选择典型票后 自动填充" disabled/>
                                        </FormItem>
                                        <FormItem>
                                            <Button @click="nextStep" :loading="isLoading" type="primary" long>下一步</Button>
                                        </FormItem>
                                    </Form>
                                </Card>
                                <typical-ticket-modal ref="typicalTicketModal"></typical-ticket-modal>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="标签二" name="tab1">
                        <Row>
                            <Col span="24">
                                <operate-ticket-table></operate-ticket-table>
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane label="标签三" name="tab2">标签三的内容</TabPane>
                    <TabPane label="标签三" name="tab3">
                        <Row type="flex">
                            <Col span="6" offset="18">
                                <Steps :current="3" direction="vertical" size="small">
                                    <Step title="操作人 - 已确认" content="2018-01-02 21:21"></Step>
                                    <Step title="监护人 - 已确认" content="2018-01-02 21:21"></Step>
                                    <Step title="值班负责人 - 已确认" content="2018-01-02 21:21"></Step>
                                    <Step title="点击确认" style="color: blue" icon="edit" content="2018-01-02 21:21"></Step>
                                    <Step title="等待值长确认" content="2018-01-02 21:21"></Step>
                                </Steps>
                            </Col>
                        </Row>
                       
                    </TabPane>
                </Tabs>
            </Col>
        </Row>
    </Col>
</Row>

</template>

<script>
import apiMixin from './config'
import TypicalTicketModal from './TypicalTicketModal'
import OperateTicketTable from './OperateTicketTable'
export default {
    mixins:[apiMixin],
    name: 'itemForm',
    components: {TypicalTicketModal, OperateTicketTable},
    data() {
        return {
            isEditable: true,
            isLoading: false,
            currentStep: 0,
            typicalTicket: {
                unitName: '',
                machineGroupName: '',
                groupName: '',
                typicalTicketName: '',
                typicalTicketId: 0,
                title: '',
            },
            form: {
                typicalTicketId: 0,
                name: ''
            },
            rules: {
                typicalTicketId: [
                    { required: true, message: '请选择典型票', trigger: 'blur' }
                ],
                typicalTicketTitle: [
                    { required: true, message: '操作任务不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getFormRef() {
            return this.$refs.wfForm
        },
        nextStep() {
            this.currentStep ++
        }
    },
    computed: {
        currentTab: {
            get: function() {
                return "tab" + this.currentStep
            }
        }
    }
}
</script>
<style lang="less">
@import '../common.less';
.no-tabs {
    .ivu-tabs-bar {
        display: none;
    }
}
</style>
