const Mock = require('mockjs')

const mockData = Mock.mock({
  items: [
    {
      code: '@id',
      value: '所有可访问研究中心',
    },
    {
      code: '@id',
      value: '华东研究中心',
    },
    {
      code: '@id',
      value: '华北研究中心',
    },
    {
      code: '@id',
      value: '华中研究中心',
    },
    {
      code: '@id',
      value: '华南研究中心',
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/hospital/list',
    type: 'get',
    response: (config) => {
      const items = mockData.items
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
