<template>
  <div>
    <el-calendar v-model="value" :lunarcalendar="true" :hidden="!showCalendar">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="date-cell">
          <div class="date-content">
            <div style="font-size: 18px">{{ data.day.split('-')[2] }}</div>
            <div
              class="btn-add-schedule"
              title="新增个人日程"
              @click="addSchedule"
            >
              <svg-icon icon-class="add-schedule"></svg-icon>
            </div>
          </div>
          <div style="font-size: 12px" class="date-lunar">
            {{ solarToLunar(date, data) }}
          </div>
        </div>
      </template>
    </el-calendar>
    <div class="add-schedule-container" :hidden="showCalendar">
      <div>
        <el-button type="primary" class="schedule-header">
          我的日程安排
        </el-button>
      </div>
      <el-divider></el-divider>
      <div class="schedule-body">
        <div class="schedule-theme">
          <label>主题：</label>
          <el-input v-model="theme" placeholder="请输入主题"></el-input>
        </div>
        <div class="schedule-section">
          <div class="schedule-position">
            <label>地点：</label>
            <el-input v-model="position" placeholder="请输入地点"></el-input>
          </div>
          <div class="schedule-type">
            <label>会议类型：</label>
            <el-select v-model="type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="schedule-time">
          <div class="schedule-position">
            <label>开始时间：----</label>
            <el-date-picker
              v-model="startTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            ></el-date-picker>
          </div>
          <div class="schedule-position">
            <label>结束时间：----</label>
            <el-date-picker
              v-model="endTime"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            ></el-date-picker>
          </div>
        </div>
        <el-input
          v-model="content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        >
          >
        </el-input>
        <div class="schedule-book">
          <div>
            预约他人：
            <el-popover
              v-model="userTreevisible"
              placement="right"
              width="300"
              trigger="click"
            >
              <div class="schedule-tree-container">
                <el-tree
                  ref="tree"
                  show-checkbox
                  default-expand-all
                  :data="userData"
                  node-key="id"
                >
                  <div slot-scope="{ node, data }">
                    <svg-icon :icon-class="data.icon"></svg-icon>
                    <i :class="node.icon"></i>
                    {{ node.label }}
                  </div>
                </el-tree>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="userTreevisible = false"
                  >
                    取消
                  </el-button>
                  <el-button type="primary" size="mini" @click="onAddUser">
                    确定
                  </el-button>
                </div>
              </div>
              <svg-icon
                slot="reference"
                icon-class="add-user"
                class="schedule-add-user"
              ></svg-icon>
            </el-popover>
            <div class="schedule-book-area">
              <div class="schedule-users"></div>
              <div class="schedule-delete-book">
                <el-button size="mini">删除选定预约的人</el-button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div class="schedule-description">
          <div>选项：</div>
          <el-checkbox v-model="checked">是否公开</el-checkbox>
          <div>{{ '创建者：' + curUserName }}</div>
          <div>
            {{ '创建日期：' + dateFormat() }}
          </div>
        </div>
      </div>
      <div class="schedule-footer">
        <el-button type="primary" @click="quit">保存退出</el-button>
        <el-button type="primary" :disabled="deleteDisabled" @click="quit">
          删除
        </el-button>
        <el-button type="primary" @click="quit">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import calendar from '../my-schedule/calendar'
  export default {
    data() {
      return {
        theme: '',
        position: '',
        startTime: '',
        endTime: '',
        content: '',
        type: '',
        curUserName: '系统管理员',
        deleteDisabled: true,
        showCalendar: false,
        userTreevisible: false,
        checked: false,
        value: new Date(),
        options: [
          {
            value: 'annual meeting',
            label: '公司年会',
          },
          {
            value: 'institutional meetings',
            label: '机构会议',
          },
          {
            value: 'departmental meetings',
            label: '部门会议',
          },
          {
            value: 'team meeting',
            label: '小组会议',
          },
          {
            value: 'external cooperation meeting',
            label: '外部合作会议',
          },
        ],
        userData: [
          {
            id: 1,
            label: '华北电力科学研究院',
            icon: 'folder',
            children: [
              {
                id: 2,
                label: '销售部',
                icon: 'tree-department',
                children: [
                  {
                    id: 3,
                    label: '李贝贝',
                    department: '销售部',
                    icon: 'person',
                  },
                  {
                    id: 4,
                    label: '齐静雪',
                    department: '销售部',
                    icon: 'person',
                  },
                  {
                    id: 5,
                    label: '杨嘉丽',
                    department: '销售部',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
          {
            id: 6,
            label: '中国科学院声学研究所',
            icon: 'folder',
            children: [
              {
                id: 7,
                label: '研发部',
                icon: 'tree-department',
                children: [
                  {
                    id: 8,
                    department: '研发部',
                    label: '系统管理员',
                    icon: 'person',
                  },
                  {
                    id: 9,
                    department: '研发部',
                    label: '武丽平',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
          {
            id: 10,
            label: '北大青鸟集团',
            icon: 'folder',
            children: [
              {
                id: 11,
                label: '财务部',
                icon: 'tree-department',
                children: [],
              },
              {
                id: 12,
                label: '综合部',
                icon: 'tree-department',
                children: [
                  {
                    id: 13,
                    department: '综合部',
                    label: '刘广平',
                    icon: 'person',
                  },
                ],
              },
              {
                id: 14,
                label: '培训部',
                icon: 'tree-department',
                children: [
                  {
                    id: 15,
                    department: '培训部',
                    label: '王超',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
          {
            id: 16,
            label: '大唐国际盘山发电有限公司',
            icon: 'folder',
            children: [
              {
                id: 17,
                label: '发电部',
                icon: 'tree-department',
                children: [
                  {
                    id: 18,
                    department: '发电部',
                    label: '姬耀钦',
                    icon: 'person',
                  },
                  {
                    id: 19,
                    department: '发电部',
                    label: '袁斌',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
        ],
      }
    },
    methods: {
      // 公历转农历
      solarToLunar(_slotDate, slotData) {
        let solarDayArr = slotData.day.split('-')
        let lunarDay = calendar.solar2lunar(
          solarDayArr[0],
          solarDayArr[1],
          solarDayArr[2]
        )
        // 农历日期
        let lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn

        // 公历节日\农历节日\农历节气
        let festAndTerm = []
        festAndTerm.push(
          lunarDay.festival == null ? '' : ' ' + lunarDay.festival
        )
        festAndTerm.push(
          lunarDay.lunarFestival == null ? '' : '' + lunarDay.lunarFestival
        )
        festAndTerm.push(lunarDay.Term == null ? '' : '' + lunarDay.Term)
        festAndTerm = festAndTerm.join('')

        return festAndTerm == '' ? lunarMD : festAndTerm
      },
      addSchedule() {
        this.showCalendar = false
      },
      quit() {
        this.showCalendar = true
      },
      dateFormat(date = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') {
        let ret
        const opt = {
          'y+': date.getFullYear().toString(), // 年
          'M+': (date.getMonth() + 1).toString(), // 月
          'd+': date.getDate().toString(), // 日
          'h+': date.getHours().toString(), // 时
          'm+': date.getMinutes().toString(), // 分
          's+': date.getSeconds().toString(), // 秒
          // 有其他格式化字符需求可以继续添加，必须转化成字符串
        }
        for (let k in opt) {
          ret = new RegExp('(' + k + ')').exec(fmt)
          if (ret) {
            fmt = fmt.replace(
              ret[1],
              ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
            )
          }
        }
        return fmt
      },
      onAddUser() {
        this.userTreevisible = false
        let selected = ''
        const nodes = this.$refs.tree.getCheckedNodes(true)
        for (const node of nodes) {
          if (node.icon != 'person') {
            this.$message('您选择的不是人员，请重新选择！')
            return
          }
          selected += node.department + ' - ' + node.label + '\r\n'
        }
        this.$message(selected)
      },
    },
  }
</script>

<style>
  .schedule-body label {
    width: 60px;
  }
  .date-cell {
    display: flex;
    flex-direction: column;
  }
  .date-content {
    display: flex;
    font-size: 13px;
  }
  .btn-add-schedule {
    margin-left: 15px;
  }
  .date-lunar {
    margin-top: 10px;
  }
  .add-schedule-container {
    font-size: 13px;
  }
  .schedule-header {
    margin: 14px 0 0 10px;
  }
  .schedule-body {
    margin: 0 60px;
  }
  .schedule-theme {
    display: flex;
    line-height: 50px;
    height: 50px;
  }
  .schedule-position,
  .schedule-type {
    display: flex;
    line-height: 50px;
    height: 50px;
    margin-right: 170px;
  }
  .schedule-position label {
    width: 72px;
  }
  .schedule-type label {
    width: 100px;
  }
  .schedule-time,
  .schedule-book,
  .schedule-book-area {
    margin: 10px 0;
  }
  .schedule-book-area,
  .schedule-description {
    display: flex;
  }
  .schedule-time label {
    width: 120px;
  }
  .schedule-section {
    margin-top: 20px;
    display: flex;
  }
  .schedule-footer {
    margin: 20px;
  }
  .schedule-users {
    height: 150px;
    width: 120px;
    background-color: aqua;
  }
  .schedule-delete-book {
    line-height: 150px;
    margin-left: 5px;
  }
  .schedule-description div {
    margin-left: 130px;
  }
  .schedule-add-user {
    cursor: pointer;
  }
  .schedule-tree-container {
    height: 500px;
    overflow: auto;
  }
</style>
