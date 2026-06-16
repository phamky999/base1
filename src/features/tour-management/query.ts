import { MOCK_TOUR_CATEGORIES } from '@/features/tour-management/mock-data';
import type {
  TCategoryListItem,
  TGetTourCategoryListParams,
} from '@/features/tour-management/types';
import { useMemo, useState } from 'react';

let mockCategories = [...MOCK_TOUR_CATEGORIES];
let listeners: (() => void)[] = [];

const notifyListeners = () => {
  listeners.forEach(fn => fn());
};

const generateId = () => Math.random().toString(36).substring(2, 11);

export const addCategory = (code: string, name: string) => {
  const newCategory: TCategoryListItem = {
    id: generateId(),
    code,
    name,
  };
  mockCategories = [...mockCategories, newCategory];
  notifyListeners();
  return newCategory;
};

export const updateCategory = (id: string, code: string, name: string) => {
  mockCategories = mockCategories.map(item =>
    item.id === id ? { ...item, code, name } : item
  );
  notifyListeners();
};

export const deleteCategory = (id: string) => {
  mockCategories = mockCategories.filter(item => item.id !== id);
  notifyListeners();
};

export const useGetTourCategoryListQuery = (
  params?: TGetTourCategoryListParams
) => {
  const [, setTick] = useState(0);

  useMemo(() => {
    const listener = () => setTick(t => t + 1);
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(fn => fn !== listener);
    };
  }, []);

  let filtered = mockCategories;

  if (params?.code) {
    filtered = filtered.filter(item =>
      item.code.toLowerCase().includes(params.code!.toLowerCase())
    );
  }

  if (params?.name) {
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(params.name!.toLowerCase())
    );
  }

  const page = params?.page ?? 1;
  const pageSize = params?.pageSize ?? 10;
  const start = (page - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  return {
    data: {
      data: { categories: paged, totalCount: filtered.length },
    },
    isFetching: false,
  };
};

export const resetMockCategories = () => {
  mockCategories = [...MOCK_TOUR_CATEGORIES];
  notifyListeners();
};
