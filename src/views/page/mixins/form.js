import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            isLoading: false,
        }
    },
    props: {
        isEditable: Boolean,
        itemId: {
            type: Number,
            default: 0
        }
    },
    mounted: function() {
        this.onFormComponentDataPrepare();
        this.onFormDataPrepare();
    },
    methods: {
        onFormComponentDataPrepare() {
        },
        onFormDataPrepare(){
            this.query(this.itemId);
        },
        handleSubmit() {
            this.getFormRef().validate((valid) => {
                if (valid) {
                    this.isLoading = true;
                    // 增加用户
                    if(this.itemId == 0) {
                        this.getApi().create(this.form).then(data => {
                            this.isLoading = false;
                            this.$Message.success('添加成功');
                            this.getFormRef().resetFields();
                            this.$emit('FormDataChanged')
                        }).catch(e => {
                            this.isLoading = false;
                            console.log(e);
                        });
                    } else {
                        //修改用户
                        this.getApi().update(this.form).then(data => {
                            this.isLoading = false;
                            this.$Message.success('修改成功');
                            this.$emit('FormDataChanged')
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
        query(uId){
            this.getFormRef().resetFields();
            if(uId != 0) {
                this.getApi().query(uId).then(data => {
                    this.form = data;
                });
            }
        }
    },
    watch: {
        itemId: function(newId) {
            this.query(newId)
        }
    },
    computed: {
        ...mapGetters([
            'access'
        ])
    }
}