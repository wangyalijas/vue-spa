export default {
  data() {
    return {
      tableName: 'dataTable',
      multipleSelection: [],
    };
  },
  computed: {
    firstSelectedItem() {
      return this.multipleSelection.length ? this.multipleSelection[0] : null;
    },
  },
  methods: {
    /**
     * 将选中的行间数据赋值给multipleSelection
     * @example
     * __________________________________________________
     * | <el-table                                       |
     * | :ref="tableName"                                |
     * | :data="tableData"                               |
     * | tooltip-effect="dark"                           |
     * | @selection-change="handleTableSelectionChange"  |
     * | style="width: 100%">                            |
     * __________________________________________________|
     */
    handleTableSelectionChange(value) {
      this.multipleSelection = value;
    },
    /**
     * 获取选中数组multipleSelection的attribute属性
     * @param attribute {String} 需要返回的属性，名称
     * @return {Array} [attribute1, attribute2, attribute3]
     * @author jasmine 2018/07/21
     * @example
     * _________________                                             ______
     * |  id   |  姓名 |                                             |  id  |
     * -----------------      getAttributeFromSelectedItems('id')    -------
     * |  01   |  张三 |              =>                             |  01  |
     * -----------------                                             -------
     * |  02   |  王五 |                                             |  02   |
     * -----------------                                             -------
     */
    getAttributeFromSelectedItems(attribute) {
      return this.multipleSelection.map(item => item[attribute]);
    },
    /**
     * 全选删除验证
     * @param requiredSelected {Boolean} 是否必须选中
     * @param selectedCount {Number} 必须选中的个数
     * @param messages {Object} {必须选中提示, 选中个数提示}
     * @return Promise
     * @author jasmine 2018/07/21
     * @example
     * ______________________________________________________________________
     * | handleDeleteAll () {                                                |
     * | this.validateSelectedItems()                                        |
     * |    .then(() => {                                                    |
     * |     this.$confirm(`确认删除该数据?`, '提示', {
     * |        confirmButtonText: '确定',                                    |
     * |        cancelButtonText: '取消',                                     |
     * |       type: 'warning'                                               |
     * |      }).then(() => {                                                |
     * |        let ids = this.getAttributeFromSelectedItems('id')           |
     * |       this.deleteTableData(ids)                                     |
     * |     })                                                              |
     * |   })                                                                |
     * |    .catch(error => this.$message.warning(error.message))            |
     * | }                                                                   |
     * * ____________________________________________________________________|
     */
    validateSelectedItems(
      requiredSelected = true,
      selectedCount,
      messages = { requiredSelected: '必须选择需要操作的记录', maxSelectedCount: `只能选择${selectedCount}条记录` },
    ) {
      return new Promise((resolve, reject) => {
        if (requiredSelected && !this.multipleSelection.length) {
          reject(new Error(messages.requiredSelected));
          return;
        }
        if (selectedCount && this.multipleSelection.length !== parseInt(selectedCount, 10)) {
          reject(new Error(messages.maxSelectedCount));
          return;
        }
        resolve();
      });
    },
    /**
     * 清空选中数据
     */
    clearSelectedItems() {
      this.$refs[this.tableName].clearSelection();
    },
  },
};
