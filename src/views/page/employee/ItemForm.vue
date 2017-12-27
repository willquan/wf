<template>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="20">
        <Card>
            <p slot="title">员工信息</p>
            <a href="#" v-if="isEditable" slot="extra" @click.prevent="$refs.wfForm.resetFields()">
                <Icon type="ios-loop-strong"></Icon>
                清空表单
            </a>
            <Form ref="wfForm" :model="form" :rules="rules" label-position="left" :label-width="60">
                <Row type="flex" :gutter="32">
                    <Col span="12">
                        <FormItem prop="username" label="登录名">
                            <Input v-model="form.username" :maxlength="30" placeholder="登录时使用" :disabled="!isEditable"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="pwd" label="密码" v-if="isEditable">
                            <Input type="text" v-model="form.pwd" :maxlength="50" placeholder="请输入登录密码"></Input>
                        </FormItem>
                    </Col>
                </Row>
                 <Row type="flex" :gutter="32">
                    <Col span="12">
                         <FormItem prop="name" label="姓名">
                            <Input v-model="form.name" :maxlength="10" placeholder="请输入姓名" :disabled="!isEditable"  class="check-input"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                       <FormItem prop="sex" label="性别">
                            <RadioGroup v-model="form.sex">
                                <Radio label="1" :disabled="!isEditable">
                                    <Icon type="man"></Icon>
                                    <span>男士</span>
                                </Radio>
                                <Radio label="0" :disabled="!isEditable">
                                    <Icon type="woman"></Icon>
                                    <span>女士</span>
                                </Radio>
                            </RadioGroup>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" :gutter="32">
                    <Col span="12">
                        <FormItem prop="worknum" label="工号">
                            <Input v-model="form.worknum" :maxlength="20" placeholder="请输入工号" :disabled="!isEditable"></Input>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="mobile" label="手机号">
                            <Input v-model="form.mobile" :maxlength="11" placeholder="请输入手机号" :disabled="!isEditable"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row type="flex" :gutter="32">
                    <Col span="12">
                        <FormItem prop="departmentId" label="部门">
                            <Select v-model="form.departmentId" placeholder="选择部门" :disabled="!isEditable" transfer>
                                <Option v-for="d in departments" :value="d.id" :key="d.id">{{ d.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem prop="positionId" label="岗位">
                            <Select v-model="form.positionId" placeholder="选择职位" :disabled="!isEditable" transfer>
                                <Option v-for="p in positions" :value="p.id" :key="p.id">{{ p.name }}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem  prop="roleIds" label="角色">
                    <Select v-model="form.roleIds" multiple placeholder="选择角色" :disabled="!isEditable">
                        <Option v-for="r in roles" :value="r.id" :key="r.id">{{ r.name }}</Option>
                    </Select>
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
            roles:[],
            positions: [],
            departments: [],
            form: {
                username: '',
                pwd: '',
                worknum: '',
                mobile: '',
                name: '',
                sex: '1',
                departmentId: '',
                positionId: '',
                roleIds: []
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
                mobile: [
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
                roleIds: [
                    { type: "array", required: true, message: '请选择角色', trigger: 'change' }
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
        },
        onBeforeSubmit() {
            this.form.roleIds = this.form.roleIds.join();
        },
        onDataLoad(data) {
            if(data && data.roles) {
                data.roleIds = [];
                data.roles.forEach(el => {
                    data.roleIds.push(el.id);
                });
            }
        }
    }
}
</script>

<style>
@import '../common.less';
</style>
