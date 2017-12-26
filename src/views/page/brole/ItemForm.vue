<template>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="15">
        <Card>
            <p slot="title">业务角色</p>
            <a href="#" v-if="isEditable" slot="extra" @click.prevent="$refs.wfForm.resetFields()">
                <Icon type="ios-loop-strong"></Icon>
                清空表单
            </a>
            <Form ref="wfForm" :model="form" :rules="rules" label-position="left" :label-width="100">
                <FormItem prop="name" label="角色名称">
                    <Input v-model="form.name" :maxlength="10" placeholder="请输入角色名称" :disabled="!isEditable"  class="check-input"></Input>
                </FormItem>
                <FormItem  prop="fstateIds" label="缺陷状态">
                    <Select v-model="form.fstateIds" multiple placeholder="选择缺陷状态" :disabled="!isEditable">
                        <Option v-for="el in fstates" :value="el.id" :key="el.id">{{ el.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem  prop="workTicketStatesIds" label="工作票状态">
                    <Select v-model="form.workTicketStatesIds" multiple placeholder="选择工作票状态" :disabled="!isEditable">
                        <Option v-for="el in workTicketStates" :value="el.id" :key="el.id">{{ el.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem  prop="operateTicketStatesIds" label="操作票状态">
                    <Select v-model="form.operateTicketStatesIds" multiple placeholder="选择操作票状态" :disabled="!isEditable">
                        <Option v-for="el in operateTicketStates" :value="el.id" :key="el.id">{{ el.name }}</Option>
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
import {ApiFstates, ApiWorkTicketStates, ApiOperateTicketStates} from '@/api/apiUtil'
import apiMixin from './config'

export default {
    mixins:[formMixin, apiMixin],
    name: 'ItemForm',
    data() {
        return {
            fstates: [],
            workTicketStates: [],
            operateTicketStates: [],
            form: {
                name: '',
                fstateIds: [],
                workTicketStatesIds: [],
                operateTicketStatesIds: []
            },
            rules: {
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ],
                fstateIds: [
                    { type: "array", required: true, message: '请选择缺陷状态', trigger: 'change' }
                ],
                workTicketStatesIds: [
                    { type: "array", required: true, message: '请选择工作票状态', trigger: 'change' }
                ],
                operateTicketStatesIds: [
                    { type: "array", required: true, message: '请选择操作票状态', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        onFormComponentDataPrepare() {
            ApiFstates.queryList().then(data => {
                this.fstates = data;
            });
            ApiWorkTicketStates.queryList().then(data => {
                this.workTicketStates = data;
            });
            ApiOperateTicketStates.queryList().then(data => {
                this.operateTicketStates = data;
            });
        },
        getFormRef() {
            return this.$refs.wfForm
        },
        onBeforeSubmit() {
            this.form.fstateIds = this.form.fstateIds.join();
            this.form.workTicketStatesIds = this.form.workTicketStatesIds.join();
            this.form.operateTicketStatesIds = this.form.operateTicketStatesIds.join();
        },
        onDataLoad(data) {
            if(data && data.fstates) {
                data.fstates = [];
                data.forEach(el => {
                    this.form.fstateIds.push(el.id);
                });
            }
            if(data && data.workTicketStates) {
                data.workTicketStates = [];
                data.forEach(el => {
                    this.form.workTicketStatesIds.push(el.id);
                });
            }
            if(data && data.operateTicketStates) {
                data.operateTicketStates = [];
                data.forEach(el => {
                    this.form.operateTicketStatesIds.push(el.id);
                });
            }
        }
    }
}
</script>

<style>
@import '../common.less';
</style>
