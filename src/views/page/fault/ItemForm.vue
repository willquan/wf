<template>
<div>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="20">
        <Card>
            <p slot="title">缺陷单编号：1234123423423</p>
            <p slot="extra" style="color: green">
                临时保存
            </p>
            <Form ref="wfForm" :model="form" label-position="right" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem prop="posName" label="功能位置">
                            <Input class="input-disabled-white-bg" v-model="posName" placeholder="请选择功能位置" :disabled="true">
                                <Button slot="append" icon="ios-search" @click="$refs.fPosModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="40">
                            <Input v-model="posDesc" placeholder="自动填充" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="flevel" label="缺陷级别" v-if="isEditable">
                            <Select v-model="form.flevelId" placeholder="选择缺陷级别" :disabled="!isEditable" transfer @on-change="flevelChanged">
                                <Option v-for="el in flevels" :value="el.id" :key="el.id">{{ el.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="缺陷发现人" v-if="isEditable">
                            <Input :value="$store.getters.name" :disabled="true"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="group" label="运行值别" v-if="isEditable">
                            <Input class="input-disabled-white-bg" v-model="group" placeholder="请选择运行值别" :disabled="true">
                                <Button slot="append" icon="ios-search" @click="$refs.groupModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem prop="phone" label="联系电话">
                            <Input v-model="form.phone" :maxlength="11" placeholder="输入联系电话"/>
                        </FormItem>
                    </Col>
                </Row>
                 <FormItem prop="desc" label="缺陷描述">
                    <Input v-model="form.desc" :maxlength="300" type="textarea" placeholder="输入缺陷描述"/>
                </FormItem>
                 <Row>
                    <Col span="12">
                        <FormItem prop="major" label="检修专业" v-if="isEditable">
                            <Input class="input-disabled-white-bg" v-model="major" placeholder="请选择检修专业" :disabled="true">
                                <Button slot="append" icon="ios-search" @click="$refs.majorModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="team" label="消缺班组" v-if="isEditable">
                            <Input class="input-disabled-white-bg" v-model="team" placeholder="请选择消缺班组" :disabled="true">
                                <Button slot="append" icon="ios-search" @click="$refs.teamModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="12">
                        <FormItem prop="date1" label="提交时间">
                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                    <DatePicker type="date" :value="form.date1" disabled></DatePicker>
                                </Col>
                                <Col span="11">
                                    <TimePicker type="time" :value="form.date1" disabled></TimePicker>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="date2" label="要求结束时间">
                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                    <DatePicker type="date" :clearable="false" :value="form.date2" :options="options2" :disabled="form.flevelId<3"></DatePicker>
                                </Col>
                                <Col span="11">
                                    <TimePicker type="time" :clearable="false" :steps="[1, 15]" format="HH:mm" :value="form.date2" :disabled="form.flevelId<3"></TimePicker>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem prop="comments" label="备注">
                    <Input v-model="form.comments" type="textarea" placeholder="输入备注信息"/>
                </FormItem>
                <FormItem  v-if="isEditable">
                    <Row type="flex" justify="space-around">
                        <Col span="4"><Button @click="handleSubmit" :loading="isLoading" type="ghost" long>保存</Button></Col>
                        <Col span="4"><Button @click="handleSubmit" :loading="isLoading" type="default" long>提交</Button></Col>
                        <Col span="4"><Button @click="handleSubmit" :loading="isLoading" type="warning" long>审核提交</Button></Col>
                    </Row>
                </FormItem>
            </Form>
        </Card>
    </Col>
</Row>
<FposModal ref="fPosModal" @PosSelected="PosSelected"></FposModal>
<MajorModal ref="majorModal" @ItemDidSelect="MajorDidSelect" title="请选择检修专业"></MajorModal>
<TeamModal ref="teamModal" @ItemDidSelect="TeamDidSelect" title="请选择消缺班组"></TeamModal>
<GroupModal ref="groupModal" @ItemDidSelect="GroupDidSelect" title="请选择运行值别"></GroupModal>
</div>
</template>

<script>
import formMixin from '@/views/page/mixins/form'
import {ApiFlevels, ApiFaults} from '@/api/apiUtil'
import apiMixin from './config'
import FposModal from './FposModal'
import MajorModal from './MajorModal'
import TeamModal from './TeamModal'
import GroupModal from './GroupModal'
export default {
    mixins:[formMixin, apiMixin],
    name: 'faultForm',
    components: {FposModal, MajorModal, TeamModal, GroupModal},
    data() {
        return {
            posName: '',
            posDesc: '',
            flevels:[],
            major: '',
            group: '',
            team: '',
            form: {
                fposId: '',
                flevelId: '',
                date1: new Date(),
                date2: new Date(),
                teamId: '',
                groupId: '',
                desc: '',
                majorId: '',
                phone: '',
                comments: ''
            },
            options2: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now();
                }
            }
        }
    },
    methods: {
        onFormComponentDataPrepare() {
            ApiFlevels.queryList().then(data => {
                this.flevels = data;
            });
        },
        getFormRef() {
            return this.$refs.wfForm
        },
        handleSubmit() {
            ApiFaults.create(this.form).then(data => {
                this.isLoading = false;
                this.$Message.success('添加成功');
                this.getFormRef().resetFields();
                this.$emit('FormDataChanged')
            }).catch(e => {
                this.isLoading = false;
                console.log(e);
            });
        },
        PosSelected(fpos) {
            this.posName = fpos.name;
            this.posDesc = fpos.desc;
            this.fposId = fpos.id;
        },
        flevelChanged(value) {
            if(value > 3) value = 3;
            let nowDate = new Date();
            nowDate.setTime(this.form.date1.getTime() + 1000*60*60*24*value);
            this.form.date2 = nowDate;
        },
        MajorDidSelect(value) {
            this.form.majorId = value.id;
            this.major = value.name;
        },
        TeamDidSelect(value) {
            this.form.teamId = value.id;
            this.team = value.name;
        },
        GroupDidSelect(value) {
            this.form.groupId = value.id;
            this.group = value.name;
        }
    }
}
</script>

<style>
@import '../common.less';
.ivu-date-picker {
    display: block !important;
}
</style>
