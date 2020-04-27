/*
 * @文件描述:
 * @公司: thundersdata
 * @作者: 陈杰
 * @Date: 2019-10-27 16:26:45
 * @LastEditors: 陈杰
 * @LastEditTime: 2020-04-27 21:50:06
 */
export default {
  '/resource': {
    success: true,
    data: [
      {
        id: 2004,
        resourceKey: 'HOME',
        apiUrl: '/homepage',
        icon: 'icon-screen',
        description: '首页',
        type: 0,
        orderValue: 1,
        privilegeList: [],
      },
      {
        id: 2004,
        resourceKey: 'MODAL',
        apiUrl: '/modal',
        icon: 'icon-screen',
        description: '弹窗页面',
        type: 0,
        orderValue: 1,
        privilegeList: [],
        children: [
          {
            id: 2011,
            resourceKey: 'FORM_MODAL',
            apiUrl: '/modal/form',
            icon: 'icon-details',
            description: '表单弹窗',
            type: 0,
            orderValue: 1,
            children: [],
            privilegeList: [],
          },
          {
            id: 2012,
            resourceKey: 'DETAIL_MODAL',
            apiUrl: '/modal/detail',
            icon: 'icon-list',
            description: '详情弹窗',
            type: 0,
            orderValue: 2,
            children: [],
            privilegeList: [],
          },
        ],
      },
      {
        id: 2005,
        resourceKey: 'ORG',
        apiUrl: '/contacts',
        icon: 'icon-screen',
        description: '组织机构管理',
        type: 0,
        orderValue: 2,
        children: [],
        privilegeList: ['test', 'test2'],
      },
      {
        id: 2006,
        resourceKey: 'APPROVE',
        apiUrl: '/approval',
        icon: 'icon-chart',
        description: '审批管理',
        type: 0,
        orderValue: 3,
        children: [
          {
            id: 2011,
            resourceKey: 'APPROVAL_PROCESS',
            apiUrl: '/approval/process/list',
            icon: 'icon-details',
            description: '流程管理',
            type: 0,
            orderValue: 1,
            children: [],
            privilegeList: [],
          },
          {
            id: 2012,
            resourceKey: 'APPROVAL_SEAL',
            apiUrl: '/approval/seal/list',
            icon: 'icon-list',
            description: '用章管理',
            type: 0,
            orderValue: 2,
            children: [],
            privilegeList: ['hahaha'],
          },
        ],
        privilegeList: [],
      },
    ],
    code: 20000,
    message: '成功',
  },
};
