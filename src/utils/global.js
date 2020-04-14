import $api from '@/api'

const global = {}

/**
 * 全局获取列表方法
 **/
global.getList = (
  $this = this,
  api,
  pageParams,
  id,
  isPage = true,
  tableData = 'tableData'
) => {
  return new Promise(resolve => {
    $this.$store.dispatch('setLoading', true)
    $api[api](pageParams, id)
      .then(res => {
        if (
          (res.data.code === 200 && res.data.status) ||
          res.data.type === 'text/xml'
        ) {
          $this[tableData] = res.data.data
          isPage &&
            $this.updatePageable({
              page: res.data.page,
              size: res.data.size,
              total: res.data.total,
              pages: res.data.pages
            })
          $this.$store.dispatch('setLoading', false)
          resolve(res)
        } else {
          $this.$message.error({
            message: res.data.message,
            duration: 2000
          })
        }
        $this.$store.dispatch('setLoading', false)
      })
      .catch(() => {
        $this.$store.dispatch('setLoading', false)
      })
  })
}

/**
 * 全局操作方法
 **/
global.operate = ($this = this, api, params, id) => {
  return new Promise(resolve => {
    $this.$store.dispatch('setLoading', true)
    $api[api](params, id)
      .then(res => {
        if (
          (res.data.code === 200 && res.data.status) ||
          res.data.type === 'text/xml'
        ) {
          $this.$message.success({
            message: '操作成功！',
            duration: 2000
          })
          $this.getList()
        } else {
          if (res.data.type === 'application/json') {
            $this.$message.error({
              message: '无导出数据',
              duration: 2000
            })
          } else {
            $this.$message.error({
              message: res.data.message,
              duration: 2000
            })
          }
        }
        resolve(res)
        $this.$store.dispatch('setLoading', false)
      })
      .catch(() => {
        $this.$store.dispatch('setLoading', false)
      })
  })
}

// 删除操作时弹出提示框
global.delete = ($this = this, api, params) => {
  return new Promise(resolve => {
    $this
      .$confirm(
        api === 'delSuppliers' ? '是否删除该选项? 该操作将对应的服务和产品删除无法恢复' : api === 'delSupplier_products' ? '是否删除该选项? 该操作将对应的产品删除无法恢复' : '是否删除该选项? 该操作无法恢复。',
        `确认删除`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'primary-button',
          cancelButtonClass: 'cancel-button',
          center: true
        }
      )
      .then(() => {
        $this.$store.dispatch('setLoading', true)
        $api[api](params)
          .then(res => {
            if (
              (res.data.code === 200 && res.data.status) ||
              res.data.type === 'text/xml'
            ) {
              $this.$message({
                type: 'success',
                message: `删除成功!`,
                duration: 2000
              })
              resolve(res)
              $this.getList()
            } else {
              $this.$message.error({
                message: res.data.message,
                duration: 3000
              })
            }
            $this.$store.dispatch('setLoading', false)
          })
          .catch(() => {
            $this.$store.dispatch('setLoading', false)
          })
      })
      .catch(() => {})
  })
}

// 敏感操作时弹出提示框
global.confirm = ($this = this, api, params, tip) => {
  return new Promise(resolve => {
    $this
      .$confirm(`是否${tip}`, `确认${tip}？`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'primary-button',
        cancelButtonClass: 'cancel-button',
        center: true
      })
      .then(() => {
        $this.$store.dispatch('setLoading', true)
        $api[api](params)
          .then(res => {
            if (
              (res.data.code === 200 && res.data.status) ||
              res.data.type === 'text/xml'
            ) {
              $this.$message({
                type: 'success',
                message: `${tip}成功!`,
                duration: 2000
              })
              resolve(res)
              $this.getList()
            } else {
              $this.$message.error({
                message: res.data.message,
                duration: 2000
              })
            }
            $this.$store.dispatch('setLoading', false)
          })
          .catch(() => {
            $this.$store.dispatch('setLoading', false)
          })
      })
      .catch(() => {})
  })
}

// 清空对象内所有key的value
global.emptyObjVal = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      obj[key] = ''
    }
  }
}

// 清空对象内所有value为空的key
global.clearObjVal = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim()
      }
      obj[key] === '' && delete obj[key]
    }
  }
}

export default global
