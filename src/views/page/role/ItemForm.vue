<template>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="15">
        <Card>
            <p slot="title">角色信息</p>
            <a href="#" v-if="isEditable" slot="extra" @click.prevent="$refs.wfForm.resetFields()">
                <Icon type="ios-loop-strong"></Icon>
                清空表单
            </a>
            <Form ref="wfForm" :model="form" :rules="rules" label-position="left" :label-width="100">
                <FormItem prop="name" label="角色名称">
                    <Input v-model="form.name" :maxlength="10" placeholder="请输入角色名称" :disabled="!isEditable"  class="check-input"></Input>
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
            form: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '角色名称不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        getFormRef() {
            return this.$refs.wfForm
        }
    }
}
</script>

<style>
@import '../common.less';
</style>
