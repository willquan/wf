<script>
import SelectModal from './SelectModal'
import {ApiGroups} from '@/api/apiUtil'
import { Checkbox } from 'iview'
export default {
    mixins:[SelectModal],
    name: "GroupModal",
    data() {
        return {
            columns:[
                {
                    type: 'index',
                    title: ' ',
                    width: 50,
                    align: 'center'
                },
                {
                    title: '工作中心描述',
                    key: 'name'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '工厂',
                    key: 'fatory'
                }
            ]
        }
    },
    mounted: function() {
        ApiGroups.queryList().then((data) => {
            this.dataDidLoad(data);
            this.data = data;
        });
    }
}
</script>