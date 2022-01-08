const Mock = require('mockjs')

const data = Mock.mock({
  'items|15': [
    {
      branchId: '@id',
      'branchName|+1': [
        '华北电力科学研究院',
        '中国科学院声学研究所',
        '北大青鸟集团',
        '大唐国际盘山发电有限公司',
      ],
      'branchShortName|+1': ['华电', '中科研究所', '青鸟', '盘电'],
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/branch/findAll',
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
    url: '/vue-admin-template/branch/deleteById',
    type: 'get',
    response: (config) => {
      const { branchId } = config.body
      const index = data.items.findIndex((item) => item.branchId === branchId)
      data.items.splice(index, 1)
      return {
        code: 20000,
        msg: '机构删除成功',
        index: data.items,
      }
    },
  },
  {
    url: '/vue-admin-template/branch/create',
    type: 'post',
    response: (config) => {
      const { branchName, branchShortName } = config.body
      const branchId = Mock.mock('@id')
      data.items.push(branchId, branchName, branchShortName)
      return {
        code: 20000,
        msg: '机构创建成功',
      }
    },
  },
  {
    url: '/vue-admin-template/branch/updateById',
    type: 'post',
    response: (config) => {
      const { branchId, branchName, branchShortName } = config.body
      const index = data.items.findIndex((item) => item.branchId === branchId)
      data.items.splice(index, 1, { branchId, branchName, branchShortName })
      return {
        code: 20000,
        msg: '机构更新成功',
      }
    },
  },
]
