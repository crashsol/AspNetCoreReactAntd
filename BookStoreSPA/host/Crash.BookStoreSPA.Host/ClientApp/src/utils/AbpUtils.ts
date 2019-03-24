/**
 * 表格分页模块定义
 *
 * @export
 * @interface IPagination
 */
export interface IPagination {
  total: number;
  pageSize: number;
  current: number;
  showTotal: (total, range) => void;
}

/**
 * 获取所有EnumType的显示值，用于将后台中的1,2
 * 转换成可以阅读的EnumType类型
 * @export
 * @param {*} obj EnumTable
 * @returns
 */
export function EnumToStatusMap(obj) {
  return Object.keys(obj).map(item => item);
}

/**
 * 使用EnumType创建Table的过滤查询条件
 *
 * @export
 * @param {*} obj obj限定为Enumtype
 * @returns
 */
export function EnumToTableFilter(obj) {
  return Object.keys(obj).map((item, index) => {
    return {
      text: item,
      value: item,
    };
  });
}
