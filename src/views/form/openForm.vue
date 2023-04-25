<template>
  <el-dialog
    title="提示"
    :visible="visible"
    width="30%"
    @close="hide"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input :disabled="disabled" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <el-checkbox :disabled="disabled" :indeterminate="isIndeterminate" v-model="checkAll"
                     @change="handleCheckAllChange">全选
        </el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedMenus" @change="handleCheckedCitiesChange">
          <el-checkbox :disabled="disabled" v-for="menu in menus" :label="menu.title" :key="menu.code">{{
              menu.title
            }}
          </el-checkbox>
        </el-checkbox-group>


      </el-form-item>
    </el-form>


    <span v-if="!disabled" slot="footer" class="dialog-footer">
      <el-button @click="hide">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  name: 'openForm',
  data () {
    return {
      disabled: false, // 禁用 查看状态 不能修改
      visible: false, // 弹框 显示 隐藏
      model: -1,   // 类型  1 新增   2 修改   3 查看
      attributes: {},
      form: {
        name: '',
        menus: [],
        index: -1
      },
      checkAll: false,
      checkedMenus: [],
      isIndeterminate: false
    }
  },
  methods: {
    // 打开弹框 赋值操作
    show (data) {
      this.visible = data.visible || false
      this.model = data.model || 1
      this.attributes = data.attributes || {}
      //model 查看 -> 不能修改
      if (this.model == 3) this.disabled = true

      //model 修改 查看 -> 计算默认值
      if (this.model > 1) this.init()
    },
    // 关闭弹框
    hide () {
      // 所有数据清空 防止下一次弹框 数据污染
      this.visible = false
      this.model = -1
      this.attributes = {}
      this.checkedMenus = []
      this.disabled = false
      this.form = {
        name: '',
        menus: [],
        index: -1
      }
    },
    submit () {
      //组装 form
      const menus = []
      for (const key of this.checkedMenus) {
        const arr = this.menus.filter(e => {
          return e.title == key
        })
        if (arr && arr[0].children) {
          for (const menu of arr[0].children) {
            menus.push(menu)
          }
        }
      }
      this.form.menus = menus
      this.$emit('submit', this.form, this.model)
    },
    handleCheckAllChange (val) {
      this.checkedMenus = []

      if (val) {
        for (const menu of this.menus) {
          this.checkedMenus.push(menu.title)
        }
      }
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.menus.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.menus.length

    },
    isExist (code) {
      for (let i = 0; i < this.menus.length; i++) {
        for (let j = 0; j < this.menus[i].children.length; j++) {
          if (code == this.menus[i].children[j].code) {
            return this.menus[i].title
          }
        }
      }
      return false
    },
    init () {
      const mapKey = {}
      // 组装默认
      for (const menu of this.attributes.menus) {
        const is = this.isExist(menu.code)
        if (is && !mapKey[is]) {
          mapKey[is] = is
          this.checkedMenus.push(is)
        }
      }
      this.handleCheckedCitiesChange(this.checkedMenus)
      this.form.name = this.attributes.name
      this.form.index = this.attributes.index
    }
  }
}
</script>

<style scoped>

</style>
