<template>
  <div>
    <el-calendar v-model="value" :lunarcalendar="true" :hidden="!showCalendar">
      <template slot="dateCell" slot-scope="{ data }">
        <div class="date-cell">
          <div class="date-content">
            {{ data.day.split('-')[2] }}
            <div
              class="el-icon-edit btn-add-schedule"
              title="新增个人日程"
              @click="addSchedule"
            ></div>
            <div class="date-lunar">{{ solarToLunar(date, data) }}</div>
          </div>
        </div>
      </template>
    </el-calendar>
    <div class="add-schedule-container" :hidden="showCalendar">
      新增个人日程
      <el-button type="primary" @click="quit">退出</el-button>
    </div>
  </div>
</template>

<script>
  import calendar from './calendar'
  export default {
    data() {
      return {
        showCalendar: true,
        value: new Date(),
      }
    },
    methods: {
      // 公历转农历
      solarToLunar(slotDate, slotData) {
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
  .date-cell {
    display: flex;
    height: 100%;
  }
  .date-content {
    margin-block: auto;
    font-size: 13px;
  }
  .btn-add-schedule {
    margin-left: 15px;
  }
  .date-lunar {
    margin-top: 10px;
  }
</style>
