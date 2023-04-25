<template>
 <div>
   <el-table
     :data="tableData"
     style="width: 100%">
     <el-table-column
       prop="index"
       label="序号"
       width="180">
     </el-table-column>
     <el-table-column
       prop="name"
       label="角色名称"
       width="180">
     </el-table-column>
     <el-table-column
       prop="menus"
       label="角色权限">
       <template slot-scope="scope">
         {{ format(scope.row) }}
       </template>
     </el-table-column>
     <el-table-column
       fixed="right"
       label="操作"
       width="150">
       <template slot="header" slot-scope="scope">
         <el-button @click="handleAdd" type="text" size="small">新增</el-button>
       </template>
       <template slot-scope="scope">
         <el-button @click="handleSee(scope.row)" type="text" size="small">查看</el-button>
         <el-button type="text" @click="handleEdit(scope.row)" size="small">编辑</el-button>
         <el-button type="text" @click="handleDelete(scope.row)" size="small">删除</el-button>
       </template>
     </el-table-column>
   </el-table>

   <open-form  ref="openForm" :menus="menus" @submit="submit">

   </open-form>
 </div>
</template>

<script>
import openForm from './openForm.vue'
export default {
  components:{
    openForm
  },
  data () {
    return {
      menus: [
        {
          title: '客户管理',
          children: [
            {
              code: 'enterprise.page',
              title: '客户管理'
            }
          ]
        }, {
          title: '用户管理',
          children: [
            {
              code: 'sim-user.page',
              title: 'SIMKEY用户管理'
            }
          ]
        }, {
          title: '证书管理',
          children: [
            {
              code: 'root-cert.page',
              title: '根证书管理'
            },
            {
              code: 'user-cent.page',
              title: '用户证书管理'
            }
          ]
        }, {
          title: '密钥管理',
          children: [
            {
              code: 'user-secret-key-negotiation-log.page',
              title: '密钥申请记录'
            }
          ]
        }, {
          title: '配置管理',
          children: [
            {
              code: 'user-type.page',
              title: '用户类型配置'
            }
          ]
        }, {
          title: '系统管理',
          children: [
            {
              code: 'manager.page',
              title: '人员管理'
            },
            {
              code: 'role.page',
              title: '角色管理'
            }
          ]
        }
      ],  // 自己组装的数据 方便后续计算

      menusList: [
        {
          code: 'enterprise.page',
          title: '客户管理'
        }, {
          code: 'sim-user.page',
          title: 'SIMKEY用户管理'
        }, {
          code: 'root-cert.page',
          title: '根证书管理'
        },
        {
          code: 'user-cent.page',
          title: '用户证书管理'
        }, {
          code: 'user-secret-key-negotiation-log.page',
          title: '密钥申请记录'
        }, {
          code: 'user-type.page',
          title: '用户类型配置'
        }, {
          code: 'manager.page',
          title: '人员管理'
        },
        {
          code: 'role.page',
          title: '角色管理'
        }
      ], // 全部菜单

      tableData: [],
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // 表单提交操作
    submit(row,model){
      if (model == 2){
        // 修改操作
        this.tableData.forEach(role =>{
          if (role.index == row.index) {
            role.name = row.name
            role.menus = row.menus
          }
        })
      }

      // 关闭弹框 一般调用接口成功后 关闭
      this.$refs.openForm.hide()
    },
    // 新增
    handleAdd(){
      // 打开弹框
      this.$refs.openForm.show({ visible: true, model:1})
    },
    // 查看
    handleSee(row){
      // 打开弹框
      this.$refs.openForm.show({ visible: true, model:3 , attributes: row})
    },
    // 修改
    handleEdit(row){
      // 打开弹框
      this.$refs.openForm.show({ visible: true, model:2 , attributes: row})
    },
    // 删除
    handleDelete(row){
     console.log('删除',row)
    },
    init () {
      // 模拟 数据库请求  这里手动加两条数据
      this.tableData.push({
        index: 1,
        name: 'admin',
        menus: this.menusList
      })

      this.tableData.push({
        index: 2,
        name: 'hxl',
        menus: this.menusList.slice(0,4)
      })


    },
    // 格式化 权限显示
    format (row) {
      let text = ''
      for (const menu of row.menus) {
        text += ' ' + menu.title
      }
      return text
    }
  }
}
</script>
