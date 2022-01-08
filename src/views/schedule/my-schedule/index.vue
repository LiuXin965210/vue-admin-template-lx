<template>
  <div>
    <el-calendar v-model="value" :lunarcalendar="true" :hidden="!showCalendar">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="date-cell">
          <div class="date-content">
            <div>{{ data.day.split('-')[2] }}</div>
            <div
              class="btn-add-schedule"
              title="新增个人日程"
              @click="addSchedule"
            >
              <svg-icon icon-class="add-schedule"></svg-icon>
            </div>
          </div>
          <div class="date-lunar">{{ solarToLunar(date, data) }}</div>
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
          v-model="textarea2"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        >
          >
        </el-input>
        <div class="schedule-book">
          <div>
            预约他人：
            <svg-icon icon-class="add-user"></svg-icon>
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
          <div>创建者：系统管理员</div>
          <div>创建日期：2022-1-8 23:52:27</div>
        </div>
      </div>
      <div class="schedule-footer">
        <el-button type="primary" @click="quit">保存退出</el-button>
        <el-button type="primary" @click="quit">删除</el-button>
        <el-button type="primary" @click="quit">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import calendar from './calendar'
  export default {
    data() {
      return {
        theme: '',
        position: '',
        startTime: '',
        endTime: '',
        type: '',
        showCalendar: true,
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
    },
  }
</script>

<style>
  label {
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
</style>
