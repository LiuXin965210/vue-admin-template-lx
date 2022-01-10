const Mock = require('mockjs')

const data = Mock.mock({
  'items|15': [
    {
      'branchId|+1': 1,
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
      return {
        code: 20000,
        data: data.items,
      }
    },
  },
  {
    url: '/vue-admin-template/branch/deleteByIds',
    type: 'delete',
    response: (config) => {
      const { branchIds } = config.body
      data.items = data.items.filter(
        (item) => !branchIds.includes(item.branchId)
      )
      return {
        code: 20000,
        msg: '机构删除成功',
      }
    },
  },
  {
    url: '/vue-admin-template/branch/deleteById',
    type: 'delete',
    response: (config) => {
      const { branchId } = config.body
      const index = data.items.findIndex((item) => item.branchId === branchId)
      data.items.splice(index, 1)
      return {
        code: 20000,
        msg: '机构删除成功',
      }
    },
  },
  {
    url: '/vue-admin-template/branch/create',
    type: 'post',
    response: (config) => {
      const branch = config.body
      branch.branchId = Mock.mock('@id')
      data.items.push(branch)
      return {
        code: 20000,
        msg: '机构创建成功',
      }
    },
  },
  {
    url: '/vue-admin-template/branch/updateById',
    type: 'put',
    response: (config) => {
      const branch = config.body
      const index = data.items.findIndex(
        (item) => item.branchId === branch.branchId
      )
      data.items.splice(index, 1, branch)
      return {
        code: 20000,
        msg: '机构更新成功',
      }
    },
  },
]
