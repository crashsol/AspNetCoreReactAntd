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
export function EnumTypeStatusNames(obj) {
  const keys = Object.keys(obj);
  console.log(keys);
  if (keys.length > 0) {
    const flag = keys.length / 2;
    console.log(flag);
    return keys.filter((item, index) => index >= flag);
  } else {
    return [];
  }
}

export interface IOption {
  text: string;
  value: string;
}
/**
 * 使用EnumType创建Table的过滤查询条件
 *
 * @export
 * @param {*} obj obj限定为Enumtype
 * @returns
 */
export function EnumToTableFilter(obj): IOption[] {
  const keyValues = Object.keys(obj);
  const flag = keyValues.length / 2;
  const result = [];
  for (let index = 0; index < flag; index++) {
    result.push({
      text: keyValues[flag + index],
      value: keyValues[index],
    });
  }
  return result;
}
