interface FilterItem {
  name: string,
  type: string,
  options?:object[],
  render?:Function
}
interface Props {
  filters: FilterItem[],
  value: any,
  onChange: Function,
  onSearch: Function,
}

export {FilterItem, Props}
