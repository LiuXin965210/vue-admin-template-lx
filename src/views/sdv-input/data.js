export const tree = [
  {
    id: '1',
    name: 'IMRD-001',
    children: [
      {
        id: '11',
        name: '登录票',
        children: [
          {
            id: '111',
            name: '基本情报',
            status: 'error',
          },
          {
            id: '112',
            name: '留置信息',
            status: 'error',
          },
          {
            id: '113',
            name: '并发症',
            status: 'over',
          },
        ],
      },
      {
        id: '12',
        name: '生活调查票',
        children: [
          {
            id: '121',
            name: '1年目',
            children: [
              {
                id: '1211',
                name: '生活调查票',
                status: 'error',
              },
            ],
          },
          {
            id: '122',
            name: '2年目',
            children: [
              {
                id: '1221',
                name: '生活调查票',
                status: 'over',
              },
            ],
          },
          {
            id: '123',
            name: '3年目',
            children: [
              {
                id: '1231',
                name: '生活调查票',
              },
            ],
          },
        ],
      },
      {
        id: '13',
        name: 'BaseLine',
        children: [
          {
            id: '131',
            name: '合并症',
          },
          {
            id: '132',
            name: '既往病例',
            disabled: true,
          },
        ],
      },
      {
        id: '14',
        name: '有害事项',
        children: [
          {
            id: '141',
            name: '有害事项1',
          },
          {
            id: '142',
            name: '有害事项2',
          },
          {
            id: '143',
            name: '有害事项3',
          },
        ],
      },
    ],
  },
]

export const basicInfo = [
  {
    label: '施设名',
    value: 'HOSP001',
  },
  {
    label: '科名',
    value: createInput('text'),
  },
  {
    label: '研究对象者识别符号',
    value: createInput('text'),
  },
  {
    label: '同意取得日',
    value: createInput('text'),
  },
  {
    label: 'ERPC实施予定日',
    value: createInput('text'),
  },
  {
    label: '年龄',
    value: `${createInput('number', '40%', '5px')}岁`,
  },
  {
    label: '性别',
    value:
      '<input type="radio" name="sex" style="margin-right: 5px">男<input type="radio" name="sex" style="margin: 0 5px 0 50px;">女',
  },
]

export const retentionInfo = [
  {
    label: 'ステント留置本数',
    value: `左(${createInput(
      'number',
      '35%',
      '5px',
      '5px'
    )})<text>本</text><text style="margin-left: 50px">右</text>(${createInput(
      'number',
      '35%',
      '5px',
      '5px'
    )})本`,
  },
  {
    label: '使用EGISステント长',
    value: `左(${createInput(
      'number',
      '35%',
      '5px',
      '5px'
    )})<text>cm</text><text style="margin-left: 50px">右</text>(${createInput(
      'number',
      '35%',
      '5px',
      '5px'
    )})cm`,
  },
]

export const complication = [
  {
    label: '合并症 疾患名',
    value: createInput('text'),
  },
  {
    label: '入院の有无',
    value:
      '<input type="radio" name="sex" style="margin-right: 5px">有<input type="radio" name="sex" style="margin: 0 5px 0 200px;">无',
  },
]

function createInput(type, width, right, left) {
  let input = document.createElement('input')
  input.type = type
  input.className = 'inputdata'
  input.style.border = 'none'
  input.style.width = width || '100%'
  input.style.height = '100%'
  input.style.backgroundColor = '#ededed'
  input.style.outline = 'none'
  if (right) input.style.marginRight = right
  if (left) input.style.marginLeft = left
  return input.outerHTML
}
