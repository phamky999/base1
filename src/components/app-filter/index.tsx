import { AdvanceFilter } from '@/components/app-filter/advance-filter';
import { QuickFilterSelection } from '@/components/app-filter/quick-filter-selection';
import { QuickFilterSearchInput } from '@/components/app-filter/search-input';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';

type AppFilterProps = {
  searchField?: {
    placeholder?: string;
    key: string;
  };
  filters?: {
    filterKey: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
  advanceFilter?: {
    keys: string[];
    elements: React.ReactNode;
  };
};

export const AppFilter = ({
  searchField,
  filters = [],
  advanceFilter,
}: AppFilterProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = searchField?.key ?? 'keyword';

  const isFiltered = React.useMemo(() => {
    const hasSearch = !!searchParams.get(searchKey);
    const hasFacetedFilter = filters.some(f => searchParams.has(f.filterKey));
    return hasSearch || hasFacetedFilter;
  }, [searchParams, filters, searchKey]);

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(searchKey);
    filters.forEach(f => newParams.delete(f.filterKey));

    setSearchParams(newParams, { replace: true });
  };

  return (
    <div className="flex items-start justify-between gap-4 sm:items-center">
      <div className="flex flex-1 flex-row flex-wrap items-start gap-4 sm:items-center">
        {!!searchField?.key && (
          <QuickFilterSearchInput
            searchKey={searchField?.key}
            placeholder={searchField?.placeholder ?? 'Nhập từ khóa tìm kiếm'}
          />
        )}

        <div className="flex gap-x-2">
          {filters.map(filter => (
            <QuickFilterSelection
              key={filter.filterKey}
              filterKey={filter.filterKey}
              title={filter.title}
              options={filter.options}
            />
          ))}
        </div>

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
      </div>
      {!!advanceFilter && (
        <AdvanceFilter
          advanceFilterKeys={advanceFilter?.keys}
          formElements={advanceFilter?.elements}
        />
      )}
    </div>
  );
};
