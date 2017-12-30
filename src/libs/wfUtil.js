let wfUtil = {

};
wfUtil.mapFstate = function(state) {
    if(state == '1') return '已保存';
    if(state == '2') return '已提交';
    if(state == '3') return '审核提交';
    return '';
};

wfUtil.toTree = function(data, parentId) {
    var tree = [];
    var temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].parentId == parentId) {
            var obj = data[i];
            temp = wfUtil.toTree(data, data[i].id);
            if (temp.length > 0) {
             obj.children = temp;
            }
            tree.push(obj);
        }
    }
    return tree;
};
export default wfUtil;