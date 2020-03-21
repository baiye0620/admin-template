const tablePage = {
  data() {
    return {
      noselected: true,
      // 选中列
      selectedList: [],
      // 表格数据
      tableData: [],
      // 分页数据
      pageable: {
        // 当前页数，为实际显示页数，传给后台的减1，获取后台后+1
        page: 1,
        // 每页显示条数
        size: 10,
        // 总条数
        total: 0,
        // 总页数
        pages: 0
      },
      // 总参数（查询加分页）
      totalParam: {},
      // 查询参数
      searchParam: {},
      searchShow: true
    }
  },
  computed: {
    // 分页所携参数，其他暂时默认，每页条数（默认为10），排序方式（默认为id）可配置
    pageParam: {
      get: function () {
        return {
          page: this.pageable.page,
          size: this.pageable.size
        }
      },
      set: function (newVal) {
        console.log('newVal', newVal)
        // this.pageable.size = newVal.size ? newVal.size : this.pageable.size
      }
    },
    loading: function () {
      return this.$store.getters.loading
    },
    // 获取所选id
    selectedListIds: function () {
      const ids = []
      this.selectedList.forEach(v => {
        ids.push(v['id'])
      })
      return ids
    },
    // 切换按钮禁用状态
    disabled: function () {
      return !(this.selectedList.length > 0)
    }
  },
  methods: {
    // 更新查询参数
    updatedTotalParam() {
      // const nowSearchParam = {}
      // 搜索参数前缀
      // const searchPre = 's_'
      this.totalParam = {}
      // for (const key in this.searchParam) {
      //   // this.searchParam[key] === false:某些状态判断值会为false
      //   if (this.searchParam.hasOwnProperty(key) && (this.searchParam[key] || this.searchParam[key] === false)) {
      //     nowSearchParam[searchPre + key] = this.searchParam[key]
      //   }
      // }
      Object.assign(this.totalParam, this.pageParam, this.searchParam)
    },
    // 查询
    search() {
      this.pageable.page = 1
      this.updatedTotalParam()
      this.global.clearObjVal(this.searchParam)
      this.getList()
    },
    // 重置
    reset() {
      this.pageable.page = 1
      this.totalParam = this.pageParam
      this.global.emptyObjVal(this.searchParam)
      this.global.clearObjVal(this.searchParam)
      this.clearList && this.clearList()
      this.getList()
    },
    // 获取当前页数下表格的序号
    getTableIndex(index) {
      return index + this.pageable.page * this.pageable.size + 1
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.pageable.size = val
      this.updatedTotalParam()
      this.getList()
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.pageable.page = val
      this.updatedTotalParam()
      this.getList()
    },
    // 当表格勾选变化时
    selectionChange(rowArr) {
      rowArr.length === 0 ? (this.noselected = true) : (this.noselected = false)
      this.selectedList = rowArr
      console.log(this.showCancel)
    },
    // 更新分页信息，原有的sort不覆盖
    updatePageable(resPageable) {
      Object.assign(this.pageable, resPageable)
    },
    // 导出带查询条件的excel
    exportSExcel(url) {
      const nowSearchParam = []
      let nowSearchStr = ''
      // 搜索参数前缀
      const searchPre = 's_'
      for (const key in this.searchParam) {
        if (this.searchParam.hasOwnProperty(key) && this.searchParam[key]) {
          nowSearchParam.push(searchPre + key + '=' + this.searchParam[key])
        }
      }
      nowSearchParam.forEach((v, k) => {
        if (k === 0) {
          nowSearchStr += '?' + v
        } else {
          nowSearchStr += '&' + v
        }
      })
      window.open(url + nowSearchStr, '_self')
    }
  }
}
export default tablePage
