const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [
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
    response: (config) => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items,
        },
      }
    },
  },
]
