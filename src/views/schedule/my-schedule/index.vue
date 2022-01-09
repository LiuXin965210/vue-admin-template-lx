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
          <div class="date-lunar">
            {{ solarToLunar(date, data) }}
          </div>
          <div
            v-if="data.day.split('-')[2] == 15"
            class="date-schedule"
            @click="editSchedule"
          >
            ◎ 8:30 今天下...
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
      <el-form
        ref="scheduleForm"
        :model="scheduleForm"
        label-position="left"
        label-width="100px"
        :rules="rules"
        class="schedule-body"
      >
        <el-form-item label="主题：" prop="theme">
          <el-input
            v-model="scheduleForm.theme"
            placeholder="请输入主题"
          ></el-input>
        </el-form-item>
        <el-form-item label="地点：" prop="position">
          <el-input
            v-model="scheduleForm.position"
            placeholder="请输入地点"
          ></el-input>
        </el-form-item>
        <el-form-item label="会议类型：" prop="type">
          <el-select v-model="scheduleForm.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker
            v-model="scheduleForm.startTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker
            v-model="scheduleForm.endTime"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          ></el-date-picker>
        </el-form-item>
        <el-input
          v-model="scheduleForm.content"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入内容"
        ></el-input>
        <el-cascader
          separator="-"
          placeholder="预约他人"
          :options="userData"
          :props="{
            multiple: true,
            expandTrigger: 'hover',
          }"
          class="schedule-book"
          clearable
        ></el-cascader>
        <div class="schedule-description">
          <div>选项：</div>
          <el-checkbox v-model="scheduleForm.checked">是否公开</el-checkbox>
          <div>{{ '创建者：' + curUserName }}</div>
          <div>
            {{ '创建日期：' + dateFormat() }}
          </div>
        </div>
      </el-form>
      <div class="schedule-footer">
        <el-button type="primary" @click="saveAndQuit">保存退出</el-button>
        <el-button
          type="primary"
          :disabled="deleteDisabled"
          @click="delSchdule"
        >
          删除
        </el-button>
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
        scheduleForm: {
          theme: '',
          position: '',
          type: '',
          startTime: '',
          endTime: '',
          content: '',
          checked: false,
        },
        rules: {
          theme: [{ required: true, message: '请输入主题', trigger: 'change' }],
          position: [
            { required: true, message: '请输入地点', trigger: 'change' },
          ],
          type: [
            { required: true, message: '请选择会议类型', trigger: 'change' },
          ],
          startTime: [
            { required: true, message: '请设置开始时间', trigger: 'change' },
          ],
          endTime: [
            { required: true, message: '请设置结束时间', trigger: 'change' },
          ],
        },
        curUserName: '系统管理员',
        deleteDisabled: true,
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
        userData: [
          {
            value: 1,
            label: '华北电力科学研究院',
            icon: 'folder',
            children: [
              {
                value: 2,
                label: '销售部',
                icon: 'tree-department',
                children: [
                  {
                    value: 3,
                    label: '李贝贝',
                    department: '销售部',
                    icon: 'person',
                  },
                  {
                    value: 4,
                    label: '齐静雪',
                    department: '销售部',
                    icon: 'person',
                  },
                  {
                    value: 5,
                    label: '杨嘉丽',
                    department: '销售部',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
          {
            value: 6,
            label: '中国科学院声学研究所',
            icon: 'folder',
            children: [
              {
                value: 7,
                label: '研发部',
                icon: 'tree-department',
                children: [
                  {
                    value: 8,
                    department: '研发部',
                    label: '系统管理员',
                    icon: 'person',
                  },
                  {
                    value: 9,
                    department: '研发部',
                    label: '武丽平',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
          {
            value: 10,
            label: '北大青鸟集团',
            icon: 'folder',
            children: [
              {
                value: 11,
                label: '财务部',
                icon: 'tree-department',
                children: [],
              },
              {
                value: 12,
                label: '综合部',
                icon: 'tree-department',
                children: [
                  {
                    value: 13,
                    department: '综合部',
                    label: '刘广平',
                    icon: 'person',
                  },
                ],
              },
              {
                value: 14,
                label: '培训部',
                icon: 'tree-department',
                children: [
                  {
                    value: 15,
                    department: '培训部',
                    label: '王超',
                    icon: 'person',
                  },
                ],
              },
            ],
          },
          {
            value: 16,
            label: '大唐国际盘山发电有限公司',
            icon: 'folder',
            children: [
              {
                value: 17,
                label: '发电部',
                icon: 'tree-department',
                children: [
                  {
                    value: 18,
                    department: '发电部',
                    label: '姬耀钦',
                    icon: 'person',
                  },
                  {
                    value: 19,
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
      editSchedule() {
        this.showCalendar = false
        this.deleteDisabled = false
      },
      saveAndQuit() {
        this.$refs['scheduleForm'].validate((valid) => {
          if (valid) {
            this.showCalendar = true
          } else {
            return false
          }
        })
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
  .add-schedule-container {
    font-size: 13px;
  }
  .schedule-header {
    margin: 14px 0 0 10px;
  }
  .schedule-body {
    margin: 0 60px;
  }
  .schedule-book {
    width: 300px;
    margin-top: 15px;
  }
  .schedule-description {
    margin-top: 15px;
    display: flex;
  }
  .schedule-footer {
    margin: 15px;
  }
  .schedule-description div {
    margin-left: 130px;
  }
</style>
