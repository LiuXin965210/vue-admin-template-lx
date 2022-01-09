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
              @click="addSchedule(data.day)"
            >
              <svg-icon icon-class="add-schedule"></svg-icon>
            </div>
          </div>
          <div class="date-lunar">
            {{ solarToLunar(date, data) }}
          </div>
          <div
            v-if="seen(data.day).result"
            class="date-schedule"
            @click="editSchedule(data.day)"
          >
            {{ seen(data.day).things }}
          </div>
        </div>
      </template>
    </el-calendar>
    <edit-schedule
      ref="editSchedule"
      :hidden="showCalendar"
      username="系统管理员"
      @quit="onQuit"
      @quit-and-save="onQuitAndSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
  import calendar from './calendar'
  import EditSchedule from '../edit-schedule/EditSchedule.vue'
  export default {
    components: { EditSchedule },
    data() {
      return {
        showCalendar: true,
        value: new Date(),
        scheduleData: [
          {
            year: '2022',
            month: '01',
            day: '21',
            things: '◎ 8:30 今天下...',
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
      addSchedule(currentDate) {
        this.showCalendar = false
        this.currentDate = currentDate
      },
      editSchedule(currentDate) {
        this.currentDate = currentDate
        this.showCalendar = false
        this.$refs.editSchedule.setContent({
          theme: '今天下午开小组会议',
          position: '会议室1',
          type: 'team meeting',
          startTime: '2022-1-9 22:47:00',
          endTime: '2022-2-9 22:47:00',
        })
      },
      onQuit() {
        this.showCalendar = true
      },
      onQuitAndSave(content) {
        this.showCalendar = true
        const dayArr = this.currentDate.split('-')
        this.scheduleData.push({
          year: dayArr[0],
          month: dayArr[1],
          day: dayArr[2],
          things: '◎ 8:30 今天下...',
        })
      },
      onDelete() {
        debugger
        this.showCalendar = true
        const dayArr = this.currentDate.split('-')
        const year = dayArr[0]
        const month = dayArr[1]
        const day = dayArr[2]
        for (const index in this.scheduleData) {
          const data = this.scheduleData[index]
          if (data.year == year && data.month == month && data.day == day) {
            return this.scheduleData.splice(index, 1)
          }
        }
      },
      seen(data) {
        const dayArr = data.split('-')
        const year = dayArr[0]
        const month = dayArr[1]
        const day = dayArr[2]
        for (const data of this.scheduleData) {
          if (data.year == year && data.month == month && data.day == day) {
            return { result: true, things: data.things }
          }
        }
        return { result: false }
      },
    },
  }
</script>

<style>
  .date-cell {
    display: flex;
    flex-direction: column;
    font-size: 14px;
  }
  .date-content {
    display: flex;
    font-size: 13px;
  }
  .btn-add-schedule {
    margin-left: 15px;
  }
  .date-lunar,
  .date-schedule {
    margin-top: 10px;
  }
</style>
