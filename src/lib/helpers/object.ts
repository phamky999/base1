export const fillArrayWithNumber = (
  number: number,
  startWith?: number
): number[] => {
  return Array(number)
    .fill(null)
    .map((_, index) => (startWith ? startWith + index : index));
};

/** Helper giúp map data dạng array về dạng select options dùng cho Ant Select */
type Option<ValueType, DataType> = {
  value: ValueType;
  label: string;
  originalData: DataType;
};

export const mapArrayDataToSelectOptions = <
  DataType extends { id: string | number; name: string },
>(
  data: DataType[] | undefined
): Option<DataType['id'], DataType>[] =>
  data?.map(item => ({
    value: item.id,
    label: item.name,
    originalData: item,
  })) || [];
