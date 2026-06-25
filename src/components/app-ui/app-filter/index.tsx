import { AdvanceFilter } from '@/components/app-ui/app-filter/advance-filter';
import { QuickFilterSelection } from '@/components/app-ui/app-filter/quick-filter-selection';
import { QuickFilterSearchInput } from '@/components/app-ui/app-filter/search-input';
import { Button } from '@/components/ui/button';
import { DEFAULT_PAGE_INDEX, PAGINATION_QUERY_KEY } from '@/lib/constants';
import { useQueryHandle } from '@/hooks/use-query-handle';
import { XIcon } from 'lucide-react';
import { type ReactNode } from 'react';

type AppFilterProps = {
  searchField?: {
    placeholder?: string;
    key: string;
  };
  filters?: {
    type?: 'multiple' | 'single';
    filterKey: string;
    title: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
  advanceFilter?: {
    keys: string[];
    elements: ReactNode;
  };
  showAdvanceFilterOnly?: boolean;
};

export const AppFilter = ({
  searchField,
  filters = [],
  advanceFilter,
  showAdvanceFilterOnly = false,
}: AppFilterProps) => {
  const { queryParams, handleUpdateQuery } = useQueryHandle();

  const searchKey = searchField?.key ?? 'keyword';

  const hasSearch = searchKey in queryParams;

  const hasFacetedFilter = filters.some(f => f.filterKey in queryParams);

  const isFiltered = hasSearch || hasFacetedFilter;

  const handleReset = () => {
    const resetValues: Record<string, unknown> = {
      [PAGINATION_QUERY_KEY.PAGE_INDEX]: DEFAULT_PAGE_INDEX,
      [searchKey]: undefined,
    };

    filters.forEach(f => {
      resetValues[f.filterKey] = undefined;
    });

    handleUpdateQuery(resetValues);
  };

  const advanceFilterComponent = advanceFilter ? (
    <AdvanceFilter
      advanceFilterKeys={advanceFilter?.keys}
      formElements={advanceFilter?.elements}
    />
  ) : null;

  if (showAdvanceFilterOnly) return advanceFilterComponent;

  return (
    <div className="flex flex-1 flex-row flex-wrap items-start gap-4 sm:items-center">
      {!!searchField?.key && (
        <QuickFilterSearchInput
          searchKey={searchField?.key}
          placeholder={searchField?.placeholder ?? 'Nhập từ khóa tìm kiếm'}
        />
      )}

      {!!filters?.length && (
        <div className="flex gap-x-2">
          {filters.map(filter => (
            <QuickFilterSelection
              key={filter.filterKey}
              filterKey={filter.filterKey}
              title={filter.title}
              options={filter.options}
              type={filter?.type || 'single'}
            />
          ))}
        </div>
      )}

      {isFiltered && (
        <Button
          variant="outline"
          onClick={handleReset}
          className="h-8 border-dashed px-2 lg:px-3"
        >
          Reset
          <XIcon className="ms-2 h-4 w-4" />
        </Button>
      )}
      {advanceFilterComponent}
    </div>
  );
};
