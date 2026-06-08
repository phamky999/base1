import { AdvanceFilter } from '@/components/app-ui/app-filter/advance-filter';
import { QuickFilterSelection } from '@/components/app-ui/app-filter/quick-filter-selection';
import { QuickFilterSearchInput } from '@/components/app-ui/app-filter/search-input';
import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams, setSearchParams] = useSearchParams();

  const searchKey = searchField?.key ?? 'keyword';

  const hasSearch = !!searchParams.get(searchKey);

  const hasFacetedFilter = filters.some(f => searchParams.has(f.filterKey));

  const isFiltered = hasSearch || hasFacetedFilter;

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(searchKey);
    filters.forEach(f => newParams.delete(f.filterKey));

    setSearchParams(newParams, { replace: true });
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
