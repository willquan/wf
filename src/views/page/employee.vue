<template>
<Tabs :value="currentTab" type="card" :closable="isClosable" @on-tab-remove="handleTabRemove">
    <TabPane label="员工列表" v-if="isListTabShow" name="list">
        <div class="tab-content">sdfsdf</div>
    </TabPane>
    <TabPane :label="tabeditLable" v-if="isEditTabShow" name="edit">
        <Row type="flex" justify="center">
            <Col span="20">
                <Card>
                    <p slot="title">填写员工信息</p>
                        <a href="#" slot="extra" @click.prevent="clearForm">
                        <Icon type="ios-loop-strong"></Icon>
                        清空表单
                    </a>
                    <Form ref="addEmployeeForm" :model="form" :rules="rules">
                        <FormItem prop="username">
                            <Input v-model="form.username" placeholder="请输入用户名">
                            </Input>
                        </FormItem>
                        <FormItem prop="pwd">
                            <Input type="text" v-model="form.pwd" placeholder="请输入初始密码">
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" :loading="isLoading" type="primary" long>添加</Button>
                        </FormItem>
                    </Form>
                </Card>
            </Col>
        </Row>
    </TabPane>
    <Button type="primary" @click="showEditTab" size="small" slot="extra">添加员工</Button>
</Tabs>
</template>

<script>
import {postEmployee} from '@/api/employee'
export default {
    data() {
        return {
            isListTabShow: true,
            isEditTabShow: false,
            tabeditLable: "添加员工",
            isClosable: false,
            currentTab: "list",
            isLoading: false,
            form: {
                username: '',
                pwd: ''
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
        handleTabRemove(name) {
            this['tab' + name] = false;
        },
        showEditTab() {
            this.isEditTabShow = true;
            this.currentTab = "edit";
        },
        clearForm() {
            this.form.username = '';
            this.form.pwd = '';
        },
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
