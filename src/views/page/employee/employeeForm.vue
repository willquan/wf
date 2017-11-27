<template>
<Row type="flex" justify="center" style="margin-bottom: 8px;">
    <Col span="20" :lg="15">
        <Card>
            <p slot="title">员工信息</p>
            <a href="#" v-if="isEditable" slot="extra" @click.prevent="$refs.addEmployeeForm.resetFields()">
                <Icon type="ios-loop-strong"></Icon>
                清空表单
            </a>
            <Form ref="addEmployeeForm" :model="form" :rules="rules" label-position="left" :label-width="100">
                <FormItem prop="username" label="登录名">
                    <Input v-model="form.username" :maxlength="30" placeholder="登录时使用" :disabled="!isEditable"></Input>
                </FormItem>
                <FormItem prop="pwd" label="密码" v-if="isEditable">
                    <Input type="text" v-model="form.pwd" :maxlength="50" placeholder="请输入登录密码"></Input>
                </FormItem>
                <FormItem prop="name" label="姓名">
                    <Input v-model="form.name" :maxlength="10" placeholder="请输入姓名" :disabled="!isEditable"  class="check-input"></Input>
                </FormItem>
                <FormItem prop="sex" label="性别">
                    <RadioGroup v-model="form.sex">
                        <Radio label="man" :disabled="!isEditable">
                            <Icon type="man"></Icon>
                            <span>男士</span>
                        </Radio>
                        <Radio label="woman" :disabled="!isEditable">
                            <Icon type="woman"></Icon>
                            <span>女士</span>
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem prop="worknum" label="工号">
                    <Input v-model="form.worknum" :maxlength="20" placeholder="请输入工号" :disabled="!isEditable"></Input>
                </FormItem>
                <FormItem prop="phone" label="手机号">
                    <Input v-model="form.phone" :maxlength="11" placeholder="请输入手机号" :disabled="!isEditable"></Input>
                </FormItem>
                <FormItem prop="departmentId" label="部门">
                    <Select v-model="form.departmentId" placeholder="选择部门" :disabled="!isEditable">
                        <Option v-for="d in departments" :value="d.id" :key="d.id">{{ d.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="positionId" label="职位">
                    <Select v-model="form.positionId" placeholder="选择职位" :disabled="!isEditable">
                        <Option v-for="p in positions" :value="p.id" :key="p.id">{{ p.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem  prop="roleId" label="角色">
                    <Select v-model="form.roleId" placeholder="选择角色" :disabled="!isEditable">
                        <Option v-for="r in roles" :value="r.id" :key="r.id">{{ r.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem  v-if="isEditable">
                    <Button @click="handleSubmit" :loading="isLoading" type="primary" long>{{userId==0 ? '添加' : '修改'}}</Button>
                </FormItem>
            </Form>
        </Card>
    </Col>
</Row>
</template>

<script>
import {addEmployee, modifyEmployee, getDepartments, getPositions, getRoles, getEmployeeById} from '@/api/employee'

export default {
    name: 'employeeForm',
    props: {
        isEditable: Boolean,
        userId: {
            type: Number,
            default: 0
        }
    },
    mounted: function() {
        getDepartments().then(data => {
            this.departments = data;
        });
        getPositions().then(data => {
            this.positions = data;
        });
        getRoles().then(data => {
            this.roles = data;
        });
        this.getData(this.userId);
    },
    data() {
        return {
            isLoading: false,
            roles:[],
            positions: [],
            departments: [],
            form: {
                username: '',
                pwd: '',
                worknum: '',
                phone: '',
                name: '',
                sex: 'man',
                departmentId: '',
                positionId: '',
                roleId: ''
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
        handleSubmit() {
            this.$refs.addEmployeeForm.validate((valid) => {
                if (valid) {
                    this.isLoading = true;
                    // 增加用户
                    if(this.userId == 0) {
                        addEmployee(this.form).then(data => {
                            this.isLoading = false;
                            this.$Message.success('添加成功');
                            this.$refs.addEmployeeForm.resetFields();
                        }).catch(e => {
                            this.isLoading = false;
                            console.log(e);
                        });
                    } else {
                        //修改用户
                        modifyEmployee(this.form).then(data => {
                            this.isLoading = false;
                            this.$Message.success('修改成功');
                        }).catch(e => {
                            this.isLoading = false;
                        });
                    }
                    
                } else {
                    console.log('校验没通过');
                    return false
                }
            });
        },
        getData(uId){
            this.$refs.addEmployeeForm.resetFields();
            if(uId != 0) {
                getEmployeeById(uId).then(data => {
                    this.form = data;
                });
            }
        }
    },
    watch: {
        userId: function(newUserId) {
            this.getData(newUserId)
        }
    }
}
</script>

<style>
@import '../common.less';
</style>
