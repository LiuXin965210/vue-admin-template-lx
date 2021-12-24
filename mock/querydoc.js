const Mock = require('mockjs')

const mockData = Mock.mock({
  items: [
    {
      docNumber: 'Query00121',
      type: 'primary',
      text: '待发行',
      collected: true,
      title: '提出：张三 2021/11/22',
      active: 'Query00121_1',
      editableTabs: [
        {
          key: '@increment',
          title: '质疑',
          name: 'Query00121_1',
          content: `觀察期間(60ヶ月)の【測定日】か許容範圍外の日付てす。測定日：2004/06/12 許容範圍：2026/09/10 ~2026/10/08\
            \n张三 2021/11/22 数据审核提出`,
        },
        {
          key: '@increment',
          title: '回答',
          name: 'Query00121_2',
          content: '质疑项已修正\r\n\r\n李四 2021/11/24 回答',
        },
      ],
    },
    {
      docNumber: 'Query00122',
      type: 'warning',
      text: '待回答',
      collected: true,
      title: '审核：王五 2021/11/23 \r\n提出：张三 2021/11/22',
      active: 'Query00122_1',
      editableTabs: [
        {
          key: '@increment',
          title: '质疑',
          name: 'Query00122_1',
          content: `觀察期間(60ヶ月)の【測定日】か許容範圍外の日付てす。測定日：2004/06/12 許容範圍：2026/09/10 ~2026/10/08\
            \r\n\r\n张三 2021/11/22 数据审核提出`,
        },
      ],
    },
    {
      docNumber: 'Query00123',
      type: 'success',
      text: '已回答',
      collected: false,
      title:
        '回答：李四 2021/11/24 \r\n审核：王五 2021/11/23 \r\n提出：张三 2021/11/22',
      active: 'Query00123_1',
      editableTabs: [
        {
          key: '@increment',
          title: '质疑',
          name: 'Query00123_1',
          content: `觀察期間(60ヶ月)の【測定日】か許容範圍外の日付てす。測定日：2004/06/12 許容範圍：2026/09/10 ~2026/10/08\
              \r\n\r\n张三 2021/11/22 数据审核提出`,
        },
        {
          key: '@increment',
          title: '回答',
          name: 'Query00123_2',
          content: '质疑项已修正\r\n\r\n李四 2021/11/24 回答',
        },
      ],
    },
    {
      docNumber: 'Query00124',
      type: 'info',
      text: '已关闭',
      collected: false,
      title:
        '回答：李四 2021/11/24 \r\n审核：王五 2021/11/23 \r\n提出：张三 2021/11/22',
      active: 'Query00124_1',
      editableTabs: [
        {
          key: '1',
          title: '质疑',
          name: 'Query00124_1',
          content: `觀察期間(60ヶ月)の【測定日】か許容範圍外の日付てす。測定日：2004/06/12 許容範圍：2026/09/10 ~2026/10/08\
              \r\n\r\n张三 2021/11/22 数据审核提出`,
        },
        {
          key: '@increment',
          title: '回答',
          name: 'Query00124_2',
          content: '质疑项已修正\r\n\r\n李四 2021/11/24 回答',
        },
      ],
    },
    {
      docNumber: 'Query00125',
      type: 'primary',
      text: '待发行',
      collected: true,
      title: '提出：张三 2021/11/22',
      active: 'Query00125_1',
      editableTabs: [
        {
          key: '@increment',
          title: '质疑',
          name: 'Query00125_1',
          content: `觀察期間(60ヶ月)の【測定日】か許容範圍外の日付てす。測定日：2004/06/12 許容範圍：2026/09/10 ~2026/10/08\
            \r\n\r\n张三 2021/11/22 数据审核提出`,
        },
      ],
    },
    {
      docNumber: 'Query00126',
      type: 'primary',
      text: '待发行',
      collected: false,
      title: '提出：张三 2021/11/22',
      active: 'Query00126_1',
      editableTabs: [
        {
          key: '@increment',
          title: '质疑',
          name: 'Query00126_1',
          content: `觀察期間(60ヶ月)の【測定日】か許容範圍外の日付てす。測定日：2004/06/12 許容範圍：2026/09/10 ~2026/10/08\
            \r\n\r\n张三 2021/11/22 数据审核提出`,
        },
      ],
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/querydoc/list',
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
