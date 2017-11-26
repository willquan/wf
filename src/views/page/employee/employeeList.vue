<template>
<div>
    <auto-table></auto-table>
</div>
</template>
<script>
import AutoTable from '../../components/AutoTable'
import {getEmployeeList} from '@/api/employee'

export default {
    components: {AutoTable},
    created: function(){
        getEmployeeList().then(data=> {

        });
    },
    data() {
        return {
            cols: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '姓名',
                    key: 'name'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: '部门',
                    key: 'department'
                },
                {
                    title: '职位',
                    key: 'position'
                },
                {
                    title: '工号',
                    key: 'worknum'
                },
                {
                    title: '角色',
                    key: 'role'
                }
            ]
        }
    }
}
</script>
