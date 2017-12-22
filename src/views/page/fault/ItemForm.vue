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
                        <FormItem prop="fpos" label="功能位置">
                            <Input class="input-disabled-white-bg" v-model="form.fpos" :maxlength="30" placeholder="请选择功能位置" :disabled="true">
                                <Button slot="append" icon="ios-search" @click="chooseFpos"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="40">
                            <Input v-model="form.phone" placeholder="自动填充" disabled/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="flevel" label="缺陷级别" v-if="isEditable">
                            <Select v-model="form.flevel" placeholder="选择缺陷级别" :disabled="!isEditable" transfer>
                                <Option v-for="el in flevels" :value="el.id" :key="el.id">{{ el.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        
                    </Col>
                </Row>
                <FormItem prop="fdesc" label="缺陷描述">
                    <Input v-model="form.fdesc" :maxlength="200" type="textarea" placeholder="输入缺陷描述"/>
                </FormItem>
                <Row>
                    <Col span="12">
                         <FormItem prop="finder" label="缺陷发现人" v-if="isEditable">
                            <Input class="input-disabled-white-bg" v-model="form.finder" :maxlength="30" placeholder="请选择缺陷发现人" :disabled="true">
                                <Button slot="append" icon="ios-search"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                         <FormItem prop="phone" label="联系电话">
                            <Input v-model="form.phone" :maxlength="30" placeholder="输入联系电话"/>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="12">
                        <FormItem prop="fixMajor" label="检修专业" v-if="isEditable">
                            <Input class="input-disabled-white-bg" v-model="form.fixMajor" :maxlength="30" placeholder="请选择检修专业" :disabled="true">
                                <Button slot="append" icon="ios-search"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="fgroup" label="消缺班组" v-if="isEditable">
                            <Input class="input-disabled-white-bg" v-model="form.fgroup" :maxlength="30" placeholder="请选择消缺班组" :disabled="true">
                                <Button slot="append" icon="ios-search"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                 <Row>
                    <Col span="12">
                        <FormItem prop="phone" label="提交时间">
                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                    <Input v-model="form.phone" :disabled="true"/>
                                </Col>
                                <Col span="11">
                                    <Input v-model="form.phone" :disabled="true"/>
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="phone" label="要求结束时间">
                            <Row type="flex" justify="space-between">
                                <Col span="12">
                                    <Input v-model="form.phone" :disabled="true"/>
                                </Col>
                                <Col span="11">
                                    <Input v-model="form.phone" :disabled="true"/>
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
<Modal
    v-model="fposDlg"
    title="Common Modal dialog box title"
    width="768"
    @on-ok="()=>{}"
    @on-cancel="()=>{}">
    <FposTree></FposTree>
</Modal>
</div>
</template>

<script>
import formMixin from '@/views/page/mixins/form'
import {ApiDep, ApiPos, ApiRole} from '@/api/apiUtil'
import apiMixin from './config'
import FposTree from './FposTree'
export default {
    mixins:[formMixin, apiMixin],
    name: 'faultForm',
    components: {FposTree},
    data() {
        return {
            fposDlg : false,
            flevels:[],
            ftypes: [],
            departments: [],
            form: {
                fnumber: '',
                fstatus: '',
                flevel: '',
                fgroup: '',
                fpos: '',
                fdesc: '',
                ftype: '',
                runGrounp: 'man',
                finder: '',
                fixMajor: '',
                phone: '',
                runfg: '',
                comments: ''
            }
        }
    },
    methods: {
        onFormComponentDataPrepare() {
            ApiDep.queryList().then(data => {
                this.departments = data;
            });
            ApiPos.queryList().then(data => {
                this.positions = data;
            });
            ApiRole.queryList().then(data => {
                this.roles = data;
            });
        },
        getFormRef() {
            return this.$refs.wfForm
        },
        chooseFpos() {
            this.fposDlg = !this.fposDlg;
        }
    }
}
</script>

<style>
@import '../common.less';
</style>
