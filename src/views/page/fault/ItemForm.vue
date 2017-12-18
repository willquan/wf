<template>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="20">
        <Card>
            <p slot="title">缺陷单编号：1234123423423</p>
            <span slot="extra">
                状态：临时保存
            </span>
            <Form ref="wfForm" :model="form" :rules="rules" label-position="right" :label-width="100">
                <Row>
                    <Col span="12">
                        <FormItem prop="flevel" label="缺陷级别" v-if="isEditable">
                            <Select v-model="form.flevel" placeholder="选择缺陷级别" :disabled="!isEditable" transfer>
                                <Option v-for="el in flevels" :value="el.id" :key="el.id">{{ el.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="fgroup" label="消缺班组" v-if="isEditable">
                            <Input v-model="form.fgroup" :maxlength="30" placeholder="请选择消缺班组" :disabled="true">
                                <Button slot="append" icon="ios-search"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="fpos" label="功能位置">
                            <Input v-model="form.fpos" :maxlength="30" placeholder="请选择功能位置" :disabled="true">
                                <Button slot="append" icon="ios-search"></Button>
                            </Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label-width="40">
                            <span>功能位置描述功能位置描述功能位置描述功能位置描述功能位置描述</span>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem prop="fpos" label="设备描述">
                            <Input v-model="form.fpos" :maxlength="30" placeholder="请选择功能位置" :disabled="true"/>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="主责任班组">
                            <Input placeholder="自动填充" :disabled="true"/>
                        </FormItem>
                    </Col>
                </Row>
                
                <FormItem prop="fdesc" label="缺陷描述">
                    <Input v-model="form.fdesc" :maxlength="30" placeholder="输入缺陷描述"/>
                </FormItem>
                <FormItem prop="ftype" label="缺陷现象类型" v-if="isEditable">
                    <Select v-model="form.ftype" placeholder="选择缺陷现象类型" :disabled="!isEditable" transfer>
                        <Option v-for="el in ftypes" :value="el.id" :key="el.id">{{ el.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="finder" label="缺陷发现人" v-if="isEditable">
                   <Input v-model="form.finder" :maxlength="30" placeholder="请选择缺陷发现人" :disabled="true">
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                </FormItem>
                <FormItem prop="runGrounp" label="运行职别" v-if="isEditable">
                   <Input v-model="form.runGrounp" :maxlength="30" placeholder="请选择运行职别" :disabled="true">
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                </FormItem>
                <FormItem prop="fixMajor" label="检修专业" v-if="isEditable">
                   <Input v-model="form.fixMajor" :maxlength="30" placeholder="请选择检修专业" :disabled="true">
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                </FormItem>
                 <FormItem prop="phone" label="联系电话">
                    <Input v-model="form.phone" :maxlength="30" placeholder="输入联系电话"/>
                </FormItem>
                 <FormItem prop="runfg" label="运行分工" v-if="isEditable">
                   <Input v-model="form.runfg" :maxlength="30" placeholder="请选择运行分工" :disabled="true">
                        <Button slot="append" icon="ios-search"></Button>
                    </Input>
                </FormItem>
                <FormItem prop="comments" label="备注">
                    <Input v-model="form.comments" type="textarea" placeholder="输入备注信息"/>
                </FormItem>
                <FormItem  v-if="isEditable">
                    <Button @click="handleSubmit" :loading="isLoading" type="primary" long>{{itemId==0 ? '添加' : '修改'}}</Button>
                </FormItem>
            </Form>
        </Card>
    </Col>
</Row>
</template>

<script>
import formMixin from '@/views/page/mixins/form'
import {ApiDep, ApiPos, ApiRole} from '@/api/apiUtil'
import apiMixin from './config'

export default {
    mixins:[formMixin, apiMixin],
    name: 'employeeForm',
    data() {
        return {
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
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ],
                worknum: [
                    { required: true, message: '工号不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '手机号码不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '用户姓名不能为空', trigger: 'blur' }
                ],
                sex: [
                    { required: true, message: '性别不能为空', trigger: 'change' }
                ],
                departmentId: [
                    { type: "number", required: true, message: '请选择部门', trigger: 'change' }
                ],
                positionId: [
                    { type: "number", required: true, message: '请选择职位', trigger: 'change' }
                ],
                roleId: [
                    { type: "number", required: true, message: '请选择角色', trigger: 'change' }
                ]
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
        }
    }
}
</script>

<style>
@import '../common.less';
</style>
