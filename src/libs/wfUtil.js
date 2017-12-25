let wfUtil = {

};
wfUtil.mapFstate = function(state) {
    if(state == '1') return '已保存';
    if(state == '2') return '已提交';
    if(state == '3') return '审核提交';
    return '';
};
export default wfUtil;