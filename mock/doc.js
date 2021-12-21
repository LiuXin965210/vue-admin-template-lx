const Mock = require('mockjs')

const mockData = Mock.mock({
  'items|12': [
    {
      docNumber: 'IMRD-@increment',
      patientNumber: 'H001-@integer(100, 999)',
      birthday: '@date',
      hospitalName: '@region()研究中心',
      stared: '@boolean',
      collected: '@boolean',
      hasError: '@boolean',
      inputProgress: '@integer(0, 100)',
      checkProgress: '@integer(0, 100)',
      sdvProgress: '@integer(0, 100)',
      signProgress: '@integer(0, 100)',
      lockProgress: '@integer(0, 100)',
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/doc/list',
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
