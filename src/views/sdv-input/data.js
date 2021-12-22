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
            sdvProgress: 'SDV0%',
          },
          {
            id: '112',
            name: '留置信息',
            status: 'error',
            sdvProgress: 'SDV20%',
          },
          {
            id: '113',
            name: '并发症',
            status: 'over',
            sdvProgress: 'SDV0%',
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
                sdvProgress: 'SDV40%',
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
                sdvProgress: 'SDV完了',
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
                sdvProgress: '未录入',
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
            sdvProgress: '未录入',
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
            sdvProgress: 'SDV完了',
          },
          {
            id: '142',
            name: '有害事项2',
            sdvProgress: 'SDV40%',
          },
          {
            id: '143',
            name: '有害事项3',
            sdvProgress: 'SDV40%',
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
  div.style.position = 'relative'

  div.innerHTML = value

  // let container = document.createElement('span')
  // container.style.position = 'absolute'
  // container.style.right = 0

  // container.appendChild(checkbox)

  let checkbox = document.createElement('input')
  checkbox.style.position = 'absolute'
  checkbox.style.right = 0
  checkbox.type = 'checkbox'
  checkbox.style.right = 0

  div.appendChild(checkbox)

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
