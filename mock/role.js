const Mock = require('mockjs')

const mockData = Mock.mock({
  items: [
    {
      code: '@id',
      value: '研究者',
    },
    {
      code: '@id',
      value: '医师',
    },
    {
      code: '@id',
      value: 'DM',
    },
    {
      code: '@id',
      value: 'Admin',
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/role/list',
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
