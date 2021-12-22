export const tree = [
  {
    id: '1',
    label: 'IMRD-001',
    icon: 'home',
    children: [
      {
        id: '10',
        label: '基本情报',
        icon: 'file',
        info: 'error',
        saved: true,
      },
      {
        id: '11',
        label: '登录票',
        icon: 'folder',
        saved: true,
        children: [
          {
            id: '111',
            label: '留置信息',
            icon: 'file',
            info: 'error',
            saved: true,
          },
          {
            id: '112',
            label: '并发症',
            icon: 'file',
            info: 'tick',
            saved: true,
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
            activate: false,
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
    value: createDiv('HOSP001'),
  },
  {
    label: '科名',
    value: createDiv(createInput('text')),
  },
  {
    label: '研究对象者识别符号',
    value: createDiv(createInput('text')),
  },
  {
    label: '同意取得日',
    value: createDiv(createInput('text')),
  },
  {
    label: 'ERPC实施予定日',
    value: createDiv(createInput('text')),
  },
  {
    label: '年龄',
    value: createDiv(`${createInput('number', '40%', '5px')}岁`),
  },
  {
    label: '性别',
    value: createDiv(
      '<input type="radio" name="sex" style="margin-right: 5px">男<input type="radio" name="sex" style="margin: 0 5px 0 50px;">女'
    ),
  },
]

export const retentionInfo = [
  {
    label: 'ステント留置本数',
    value: createDiv(`左(${createInput(
      'number',
      '35%',
      '5px',
      '5px'
    )})<text>本</text>
      <text style="margin-left: 50px">右</text>(${createInput(
        'number',
        '35%',
        '5px',
        '5px'
      )})本`),
  },
  {
    label: '使用EGISステント长',
    value: createDiv(`左(${createInput(
      'number',
      '35%',
      '5px',
      '5px'
    )})<text>cm</text>
      <text style="margin-left: 50px">右</text>(${createInput(
        'number',
        '35%',
        '5px',
        '5px'
      )})cm`),
  },
]

export const complication = [
  {
    no: 1,
    label: '合并症 疾患名',
    height: '80px',
    value: createDiv(createInput('text')),
  },
  {
    value: createDiv(createInput('text')),
  },
  {
    label: '入院の有无',
    value: createDiv(
      '<input type="radio" name="sex" style="margin-right: 5px">有<input type="radio" name="sex" style="margin: 0 5px 0 200px;">无'
    ),
  },
]

function createDiv(value) {
  let div = document.createElement('div')
  div.className = 'table-td-input'
  div.style.padding = '3px 0 2px'
  div.style.height = '100%'
  div.style.display = 'flex'
  div.style.alignItems = 'center'
  div.innerHTML = value
  return div.outerHTML
}

function createInput(type, width, right, left) {
  let input = document.createElement('input')
  input.type = type
  input.className = 'inputdata'
  input.style.border = 'none'
  input.style.width = width || '100%'
  input.style.height = '100%'
  input.style.backgroundColor = '#f3f3f3'
  input.style.outline = 'none'
  if (right) input.style.marginRight = right
  if (left) input.style.marginLeft = left
  return input.outerHTML
}
