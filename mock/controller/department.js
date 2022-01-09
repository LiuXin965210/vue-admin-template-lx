const Mock = require('mockjs')

const data = Mock.mock({
  'items|15': [
    {
      deptId: '@id',
      'deptName|+1': [
        '华北电力科学研究院',
        '中国科学院声学研究所',
        '北大青鸟集团',
        '大唐国际盘山发电有限公司',
        '青岛恒源田地有限公司',
        '阿里巴巴有限公司',
      ],
      'userName|+1': ['张三', '李四', '王五', '李白', '杜甫', '刘欣', '陈瑞'],
      connectTelNo: '8@integer(1000000, 9999999)',
      connectMobileTelNo: '13@integer(100000000, 999999999)',
      faxes: '@integer(10000000, 99999999)',
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/department/findAll',
    type: 'get',
    response: () => {
      const items = data.items
      return {
        code: 20000,
        data: items,
      }
    },
  },
  {
    url: '/vue-admin-template/department/deleteByIds',
    type: 'delete',
    response: (config) => {
      const { deptIds } = config.body
      data.items = data.items.filter((item) => !deptIds.includes(item.deptId))
      return {
        code: 20000,
        msg: '部门删除成功',
      }
    },
  },
  {
    url: '/vue-admin-template/department/deleteById',
    type: 'delete',
    response: (config) => {
      const { deptId } = config.body
      const index = data.items.findIndex((item) => item.deptId === deptId)
      data.items.splice(index, 1)
      return {
        code: 20000,
        msg: '部门删除成功',
      }
    },
  },
  {
    url: '/vue-admin-template/department/create',
    type: 'post',
    response: (config) => {
      const { deptName, userName, connectTelNo, connectMobileTelNo, faxes } =
        config.body
      const deptId = Mock.mock('@id')
      data.items.push({
        deptId,
        deptName,
        userName,
        connectTelNo,
        connectMobileTelNo,
        faxes,
      })
      return {
        code: 20000,
        msg: '部门创建成功',
      }
    },
  },
  {
    url: '/vue-admin-template/department/updateById',
    type: 'put',
    response: (config) => {
      const {
        deptId,
        deptName,
        userName,
        connectTelNo,
        connectMobileTelNo,
        faxes,
      } = config.body
      const index = data.items.findIndex((item) => item.deptId === deptId)
      data.items.splice(index, 1, {
        deptId,
        deptName,
        userName,
        connectTelNo,
        connectMobileTelNo,
        faxes,
      })
      return {
        code: 20000,
        msg: '部门更新成功',
      }
    },
  },
]
