<template>
<div>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="20">
        <Card>
            <p slot="title">缺陷单编号：{{form.fnumber}}</p>
            <p slot="extra" style="color: green">
                {{form.fstate | mapFstate}}
            </p>
            <Form ref="wfForm" :model="form" label-position="right" :rules="rules" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem prop="kksId" label="功能位置">
                            <Input class="input-disabled-white-bg" v-model="kksName" placeholder="请选择功能位置" :disabled="true">
                                <Button v-if="isEditable" slot="append" icon="ios-search" @click="$refs.kksModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="40">
                            <Input class="input-disabled-white-bg" v-model="kksDesc" placeholder="自动填充" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="flevelId" label="缺陷级别">
                            <Select class="input-disabled-white-bg" v-model="form.flevelId" placeholder="选择缺陷级别" :disabled="!isEditable" transfer @on-change="()=>{this.flevelChanged}">
                                <Option v-for="el in flevels" :value="el.id" :key="el.id">{{ el.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="缺陷发现人">
                            <Input class="input-disabled-white-bg" :value="userName" :disabled="true"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="groupId" label="运行值别">
                            <Input class="input-disabled-white-bg" v-model="group" placeholder="请选择运行值别" :disabled="true">
                                <Button v-if="isEditable" slot="append" icon="ios-search" @click="$refs.groupModal.show()"></Button>
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
                        
                    </Col>
                    <Col span="12">
                        <FormItem prop="" label="消缺班组">
                            <Cascader :data="teams" :load-data="loadTeams"></Cascader>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="12">
                        <FormItem prop="majorId" label="检修专业">
                            <Input class="input-disabled-white-bg" v-model="major" placeholder="请选择检修专业" :disabled="true">
                                <Button v-if="isEditable" slot="append" icon="ios-search" @click="$refs.majorModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="teamId" label="消缺班组">
                            <Input class="input-disabled-white-bg" v-model="team" placeholder="请选择消缺班组" :disabled="true">
                                <Button v-if="isEditable" slot="append" icon="ios-search" @click="$refs.teamModal.show()"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="12">
                        <FormItem prop="tjDate" label="提交时间">
                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                    <DatePicker type="date" :value="form.tjDate" disabled></DatePicker>
                                </Col>
                                <Col span="11">
                                    <TimePicker type="time" :value="form.tjDate" disabled></TimePicker>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="yqjsDate" label="要求结束时间">
                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                    <DatePicker type="date" :clearable="false" :value="form.yqjsDate" :options="options2" :disabled="form.flevelId<3 && !isEditable"></DatePicker>
                                </Col>
                                <Col span="11">
                                    <TimePicker type="time" :clearable="false" :steps="[1, 15]" format="HH:mm" :value="form.yqjsDate" :disabled="form.flevelId<3 && !isEditable"></TimePicker>
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
                        <Col span="4"><Button @click="()=>{form.fstate = 1; handleSubmit(1)}" :loading="isLoading" type="ghost" long>保存</Button></Col>
                        <Col span="4"><Button @click="()=>{form.fstate = 2; handleSubmit(1)}" :loading="isLoading" type="default" long>提交</Button></Col>
                        <Col span="4"><Button @click="()=>{form.fstate = 3; handleSubmit(1)}" :loading="isLoading" type="warning" long>审核提交</Button></Col>
                    </Row>
                </FormItem>
            </Form>
        </Card>
    </Col>
</Row>
<KksModal ref="kksModal" @KksSelected="KksSelected"></KksModal>
<MajorModal ref="majorModal" @ItemDidSelect="MajorDidSelect" title="请选择检修专业"></MajorModal>
<TeamModal ref="teamModal" @ItemDidSelect="TeamDidSelect" title="请选择消缺班组"></TeamModal>
<GroupModal ref="groupModal" @ItemDidSelect="GroupDidSelect" title="请选择运行值别"></GroupModal>
</div>
</template>

<script>
import formMixin from '@/views/page/mixins/form'
import {ApiFlevels, ApiFaults, ApiKKS, ApiGroups, ApiMajors, ApiTeams, ApiUser, ApiDep} from '@/api/apiUtil'
import apiMixin from './config'
import KksModal from './KksModal'
import MajorModal from './MajorModal'
import TeamModal from './TeamModal'
import GroupModal from './GroupModal'
import {parseTime} from '@/libs/timeUtil.js'

export default {
    mixins:[formMixin, apiMixin],
    name: 'faultForm',
    components: {KksModal, MajorModal, TeamModal, GroupModal},
    data() {
        return {
            teams: [],
            kksName: '',
            kksDesc: '',
            flevels:[],
            major: '',
            group: '',
            team: '',
            userName: this.$store.getters.name,
            form: {
                fnumber:'', //缺陷单编号
                fstate:'', // 缺陷单状态 1保存 2提交 3审核提交
                kksId: '',
                flevelId: '',
                userId: this.$store.getters.userId,
                tjDate: new Date(),
                yqjsDate: new Date(),
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
            },
            rules: {
                kksId: [
                    { type: "number", required: true, message: '请选择功能位置', trigger: 'change' }
                ],
                flevelId: [
                    { type: "number", required: true, message: '请选择缺陷级别', trigger: 'change' }
                ],
                groupId: [
                    { type: "number", required: true, message: '请选择运行职别', trigger: 'change' }
                ],
                majorId: [
                    { type: "number", required: true, message: '请选择检修专业', trigger: 'change' }
                ],
                teamId: [
                    { type: "number", required: true, message: '请选择消缺班组', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        loadTeams(item, callback) {
            item.loading = true;
            ApiDep.queryList({parentId: item.id}).then(data => {
                data.forEach(el => {
                    if(el.hasChildren) {
                        el.children = [];
                        el.loading = false;
                    }
                    el.value = el.id;
                    el.label = el.name;
                });
                item.loading = false;
                item.children = data;
                callback();
            })
        },
        onFormComponentDataPrepare() {
            ApiFlevels.queryList().then(data => {
                this.flevels = data;
            });
            ApiDep.queryList({parentId: 0}).then(data => {
                data.forEach(el => {
                    if(el.hasChildren) el.children = [];
                    el.loading = false;
                    el.value = el.id;
                    el.label = el.name;
                });
                this.teams = data;
            })
        },
        onDataLoad(data) {
            // 查询功能位置
            ApiKKS.query(data.kksId).then((kks) => {
                this.KksSelected(kks);
            });
            // 查询运行职别
            ApiGroups.query(data.groupId).then((group) => {
                this.GroupDidSelect(group);
            });
            // 查询检修专业
            ApiMajors.query(data.majorId).then((major) => {
                this.MajorDidSelect(major);
            });
            // 查询消缺班组
            ApiTeams.query(data.teamId).then((team) => {
                this.TeamDidSelect(team);
            });
            //缺陷发现人
            ApiUser.query(data.userId).then((user) => {
                this.UserDidSelect(user);
            });
        },
        getFormRef() {
            return this.$refs.wfForm
        },
        KksSelected(kks) {
            this.kksName = kks.name;
            this.kksDesc = kks.desc;
            this.form.kksId = kks.id;
        },
        flevelChanged(value) {
            if(value > 3) value = 3;
            let nowDate = new Date();
            nowDate.setTime(this.form.tjDate.getTime() + 1000*60*60*24*value);
            this.form.yqjsDate = nowDate;
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
        },
        UserDidSelect(user) {
            this.userName = user.name;
            this.form.userId = user.id;
        },
        onBeforeFormReset() {
            this.form.userId = this.$store.getters.userId;
            this.userName = this.$store.getters.name,
            this.kksName = '';
            this.kksDesc = '';
            this.major = '';
            this.group = '';
            this.team = '';
            this.form.fnumber = '';
            this.form.fstate = '';
        },
        onAfterFormReset() {
            this.form.tjDate = new Date();
            this.form.yqjsDate = new Date();
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
