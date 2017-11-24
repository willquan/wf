<template>
<Row type="flex" justify="center">
    <Col span="20" :lg="15">
        <Card>
            <p slot="title">填写员工信息</p>
            <a href="#" slot="extra" @click.prevent="$refs.addEmployeeForm.resetFields()">
                <Icon type="ios-loop-strong"></Icon>
                清空表单
            </a>
            <Form ref="addEmployeeForm" :model="form" :rules="rules">
                <FormItem prop="name">
                    <Input v-model="form.name" placeholder="请输入用户姓名">
                    </Input>
                </FormItem>
                <FormItem prop="sex" label="性别">
                    <RadioGroup v-model="form.sex">
                        <Radio label="man">
                            <Icon type="man"></Icon>
                            <span>男士</span>
                        </Radio>
                        <Radio label="woman">
                            <Icon type="woman"></Icon>
                            <span>女士</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="worknum">
                    <Input v-model="form.worknum" placeholder="请输入工号">
                    </Input>
                </FormItem>
                <FormItem prop="phone">
                    <Input v-model="form.phone" placeholder="请输入手机号">
                    </Input>
                </FormItem>
                <FormItem prop="username">
                    <Input v-model="form.username" placeholder="请输入登录用户名">
                    </Input>
                </FormItem>
                <FormItem prop="pwd">
                    <Input type="text" v-model="form.pwd" placeholder="请输入登录密码">
                    </Input>
                </FormItem>
                
                <FormItem>
                    <Button @click="handleSubmit" :loading="isLoading" type="primary" long>添加</Button>
                </FormItem>
            </Form>
        </Card>
    </Col>
</Row>
</template>

<script>
import {postEmployee} from '@/api/employee'
export default {
    name: 'employeeForm',
    data() {
        return {
            delay: false,
            isLoading: false,
            form: {
                username: '',
                pwd: '',
                worknum: '',
                phone: '',
                name: '',
                sex: 'man'
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                pwd: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.addEmployeeForm.validate((valid) => {
                if (valid) {
                    this.isLoading = true;
                    postEmployee(this.form).then(data => {
                        this.isLoading = false;
                    }).catch(e => {
                        this.isLoading = false;
                    });
                } else {
                    console.log('校验没通过');
                    return false
                }
            });
        }
    }
}
</script>

<style>

</style>
