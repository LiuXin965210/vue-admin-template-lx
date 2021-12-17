export const tree = [
  {
    id: '1',
    label: 'IMRD-001',
    icon: 'home',
    children: [
      {
        id: '11',
        label: '登录票',
        icon: 'folder',
        children: [
          {
            id: '111',
            label: '基本情报',
            icon: 'file',
            info: 'error',
          },
          {
            id: '112',
            label: '留置信息',
            icon: 'file',
            info: 'error',
          },
          {
            id: '113',
            label: '并发症',
            icon: 'file',
            info: 'tick',
          },
        ],
      },
      {
        id: '12',
        label: '生活调查票',
        icon: 'folder',
        children: [
          {
            id: '121',
            label: '1年目',
            icon: 'folder',
            children: [
              {
                id: '1211',
                label: '生活调查票',
                icon: 'file',
                info: 'error',
              },
            ],
          },
          {
            id: '122',
            label: '2年目',
            icon: 'folder',
            children: [
              {
                id: '1221',
                label: '生活调查票',
                icon: 'file',
                info: 'tick',
              },
            ],
          },
          {
            id: '123',
            label: '3年目',
            icon: 'folder',
            children: [
              {
                id: '1231',
                label: '生活调查票',
                icon: 'file',
              },
            ],
          },
        ],
      },
      {
        id: '13',
        label: 'BaseLine',
        icon: 'folder',
        children: [
          {
            id: '131',
            label: '合并症',
            icon: 'file',
          },
          {
            id: '132',
            label: '既往病例',
            icon: 'file',
          },
        ],
      },
      {
        id: '14',
        label: '有害事项',
        icon: 'folder',
        children: [
          {
            id: '141',
            label: '有害事项1',
            icon: 'file',
          },
          {
            id: '142',
            label: '有害事项2',
            icon: 'file',
          },
          {
            id: '143',
            label: '有害事项3',
            icon: 'file',
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
    value:
      '<input type="text" style="border: none; width: 100%; height: 100%; outline: none;">',
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
  input.style.border = 'none'
  input.style.width = width || '100%'
  input.style.height = '100%'
  input.style.backgroundColor = '#ededed'
  input.style.outline = 'none'
  if (right) input.style.marginRight = right
  if (left) input.style.marginLeft = left
  return input.outerHTML
}
