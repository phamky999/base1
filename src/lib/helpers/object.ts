import { OBJECT_KEY_SEPARATOR } from '@/lib/constants';

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

/**
 * Transform object keys dạng `parent.key` về dạng `key`
 *VD: { 'parent.key': 'value' } -> { 'key': 'value' }
 * @param obj - Object to transform
 * @param index - Index of the key to keep (default: 1)
 * @returns Transformed object
 */
export const removeParentFromKeys = (
  obj: Record<string, unknown>,
  index = 1
): Record<string, unknown> => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const parts = key.split(OBJECT_KEY_SEPARATOR);

      acc[parts[index] ?? key] = value;

      return acc;
    },
    {} as Record<string, unknown>
  );
};

/**
 * Transform object keys từ dạng `key` sang `parent.key`
 * VD: { key: 'value' } -> { 'parent.key': 'value' }
 *
 * @param obj - Object cần transform
 * @param parentKey - Prefix key cha
 * @returns Transformed object
 */
export const appendParentToKeys = (
  obj: Record<string, unknown>,
  parentKey: string
): Record<string, unknown> => {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      acc[`${parentKey}${OBJECT_KEY_SEPARATOR}${key}`] = value;

      return acc;
    },
    {} as Record<string, unknown>
  );
};
