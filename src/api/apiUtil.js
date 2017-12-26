import createApi from './common'

export const resMap = {
    "users": "用户信息",
    "departments": "部门信息",
    "positions": "岗位信息",
    "roles": "用户信息",
    "menus": "菜单信息",
    "rights": "权限信息",
}

export const rightsMap = {
    "create": "创建数据",
    "del": "删除数据",
    "dels": "批量删除",
    "detail": "查看详情",
    "export": "导出数据",
    "list": "数据列表",
    "update": "更新数据",
}

export const ApiUser = createApi("users");
export const ApiDep = createApi("departments");
export const ApiPos = createApi("positions");
export const ApiRole = createApi("roles");
export const ApiMenu = createApi("menus");
export const ApiRights = createApi("rights");
export const ApiBrole = createApi("broles");
export const ApiKKS = createApi("kks");
export const ApiFlevels = createApi("flevels");
export const ApiMajors = createApi("majors"); //专业
export const ApiGroups = createApi("groups");//值别
export const ApiTeams = createApi("teams");//班组
export const ApiFaults = createApi("faults");//缺陷
export const ApiFstates = createApi("fstates");//缺陷状态
export const ApiWorkTicketStates = createApi("workTicketStates");//工作票状态
export const ApiOperateTicketStates = createApi("operateTicketStates");//操作票状态