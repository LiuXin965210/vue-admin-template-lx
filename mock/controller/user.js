const Mock = require('mockjs')

const tokens = {
  admin: {
    token: 'admin-token',
  },
  editor: {
    token: 'editor-token',
  },
}

const userInfo = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
  },
}

const data = Mock.mock({
  'items|30': [
    {
      'userId|+1': 1,
      username: '@cname',
      password: '@word(6)',
      'departId|+1': '@natural(1, 15)',
      gender: '@natural(0, 1)',
      'roleId|+1': 1,
      'userState|+1': 1,
    },
  ],
})

module.exports = [
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: (config) => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
        }
      }

      return {
        code: 20000,
        data: token,
      }
    },
  },
  {
    url: '/vue-admin-template/user/info.*',
    type: 'get',
    response: (config) => {
      const { token } = config.query
      const info = userInfo[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
        }
      }

      return {
        code: 20000,
        data: info,
      }
    },
  },
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 20000,
        data: 'success',
      }
    },
  },
  {
    url: '/vue-admin-template/user/findAll',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: data.items,
      }
    },
  },
]
