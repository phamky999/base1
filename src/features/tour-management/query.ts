import { MOCK_TOUR_CATEGORIES, MOCK_TOURS } from '@/features/tour-management/mock-data';
import type {
  TCategoryListItem,
  TCreateTourPayload,
  TGetTourCategoryListParams,
  TTour,
} from '@/features/tour-management/types';
import { useMemo, useState } from 'react';

let mockCategories = [...MOCK_TOUR_CATEGORIES];
let categoryListeners: (() => void)[] = [];

const notifyCategoryListeners = () => {
  categoryListeners.forEach(fn => fn());
};

const generateId = () => Math.random().toString(36).substring(2, 11);

export const addCategory = (code: string, name: string) => {
  const newCategory: TCategoryListItem = {
    id: generateId(),
    code,
    name,
  };
  mockCategories = [...mockCategories, newCategory];
  notifyCategoryListeners();
  return newCategory;
};

export const updateCategory = (id: string, code: string, name: string) => {
  mockCategories = mockCategories.map(item =>
    item.id === id ? { ...item, code, name } : item
  );
  notifyCategoryListeners();
};

export const deleteCategory = (id: string) => {
  mockCategories = mockCategories.filter(item => item.id !== id);
  notifyCategoryListeners();
};

export const useGetTourCategoryListQuery = (
  params?: TGetTourCategoryListParams
) => {
  const [, setTick] = useState(0);

  useMemo(() => {
    const listener = () => setTick(t => t + 1);
    categoryListeners = [...categoryListeners, listener];
    return () => {
      categoryListeners = categoryListeners.filter(fn => fn !== listener);
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
  notifyCategoryListeners();
};

// --- Tour CRUD ---

let mockTours = [...MOCK_TOURS];
let tourListeners: (() => void)[] = [];

const notifyTourListeners = () => {
  tourListeners.forEach(fn => fn());
};

export const createTour = (payload: TCreateTourPayload) => {
  const newTour: TTour = {
    id: generateId(),
    ...payload,
    createdAt: new Date().toISOString(),
  };
  mockTours = [...mockTours, newTour];
  notifyTourListeners();
  return newTour;
};

export const useGetTourListQuery = (params?: { programName?: string }) => {
  const [, setTick] = useState(0);

  useMemo(() => {
    const listener = () => setTick(t => t + 1);
    tourListeners = [...tourListeners, listener];
    return () => {
      tourListeners = tourListeners.filter(fn => fn !== listener);
    };
  }, []);

  let filtered = mockTours;

  if (params?.programName) {
    filtered = filtered.filter(item =>
      item.programName
        .toLowerCase()
        .includes(params.programName!.toLowerCase())
    );
  }

  return {
    data: {
      data: filtered,
    },
    isFetching: false,
  };
};

export const useCreateTourMutation = () => {
  const [isLoading, setIsLoading] = useState(false);

  const mutateAsync = async ({
    payload,
  }: {
    payload: TCreateTourPayload;
  }) => {
    setIsLoading(true);
    try {
      const newTour = createTour(payload);
      return { data: newTour, unwrap: () => Promise.resolve(newTour) };
    } finally {
      setIsLoading(false);
    }
  };

  return [mutateAsync, { isLoading }] as const;
};
