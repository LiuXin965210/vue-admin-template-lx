const Mock = require('mockjs')

const data = Mock.mock({
  'items|15': [
    {
      'deptId|+1': 1,
      'deptName|+1': [
        '销售部',
        '研发部',
        '财务部',
        '发电部',
        '综合部',
        '培训部',
      ],
      'branchId|+1': 1,
      'branchName|+1': [
        '华北电力科学研究院',
        '中国科学院声学研究所',
        '北大青鸟集团',
        '大唐国际盘山发电有限公司',
        '青岛恒源田地有限公司',
        '阿里巴巴有限公司',
      ],
      'userId|+1': 1,
      'username|+1': ['张三', '李四', '王五', '李白', '杜甫', '刘欣', '陈瑞'],
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
      return {
        code: 20000,
        data: data.items,
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
      const department = Object.assign({}, config.body)
      department.deptId = Mock.mock('@id')
      data.items.push(department)
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
      const department = Object.assign({}, config.body)
      const index = data.items.findIndex(
        (item) => item.deptId === department.deptId
      )
      data.items.splice(index, 1, department)
      return {
        code: 20000,
        msg: '部门更新成功',
      }
    },
  },
]
