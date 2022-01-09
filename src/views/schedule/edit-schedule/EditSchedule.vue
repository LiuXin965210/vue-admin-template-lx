<template>
  <div class="add-schedule-container">
    <div>
      <el-button type="primary" class="schedule-header">我的日程安排</el-button>
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
          ref="theme"
          v-model="scheduleForm.theme"
          placeholder="请输入主题"
        ></el-input>
      </el-form-item>
      <el-form-item label="地点：" prop="position">
        <el-input
          ref="position"
          v-model="scheduleForm.position"
          placeholder="请输入地点"
        ></el-input>
      </el-form-item>
      <el-form-item label="会议类型：" prop="type">
        <el-select ref="type" v-model="scheduleForm.type" placeholder="请选择">
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
          ref="startTime"
          v-model="scheduleForm.startTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-date-picker
          ref="endTime"
          v-model="scheduleForm.endTime"
          type="datetime"
          placeholder="选择日期时间"
          default-time="12:00:00"
        ></el-date-picker>
      </el-form-item>
      <el-input
        ref="content"
        v-model="scheduleForm.content"
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        placeholder="请输入内容"
      ></el-input>
      <el-cascader
        ref="users"
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
        <el-checkbox ref="checked" v-model="scheduleForm.checked">
          是否公开
        </el-checkbox>
        <div>{{ '创建者：' + username }}</div>
        <div>
          {{ '创建日期：' + dateFormat() }}
        </div>
      </div>
    </el-form>
    <div class="schedule-footer">
      <el-button type="primary" @click="quitAndSave">保存退出</el-button>
      <el-button type="primary" :disabled="deleteDisabled" @click="delSchedule">
        删除
      </el-button>
      <el-button type="primary" @click="quit">退出</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      username: {
        type: String,
        default: '',
      },
      content: {
        type: Object,
      },
    },
    data() {
      return {
        theme: '',
        deleteDisabled: true,
        scheduleForm: {
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
      setContent(content) {
        this.scheduleForm = content
        this.deleteDisabled = false
      },
      quitAndSave() {
        this.$refs['scheduleForm'].validate((valid) => {
          if (valid) {
            this.$emit('quit-and-save', {
              theme: this.$refs.theme.value,
              position: this.$refs.position.value,
              type: this.$refs.type.value,
              startTime: this.$refs.startTime,
              endTime: this.$refs.endTime.value,
              content: this.$refs.content.value,
              users: this.$refs.users.getCheckedNodes(),
              checked: this.$refs.checked.value,
            })
            this.$refs['scheduleForm'].resetFields()
          } else {
            return false
          }
        })
      },
      quit() {
        this.$refs['scheduleForm'].resetFields()
        this.$emit('quit')
      },
      delSchedule() {
        this.$refs['scheduleForm'].resetFields()
        this.$emit('delete')
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
    },
  }
</script>

<style>
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
