import { PageHelmet } from '@/components/app-ui/app-helmet';
import { AppPageHeader } from '@/components/app-ui/app-page-header';
import { Button } from '@/components/ui/button';
import { CategoryFilter } from '@/features/tour-management/components/category/category-filter';
import { CategoryList } from '@/features/tour-management/components/category/category-list';
import { CreateCategoryModal } from '@/features/tour-management/components/category/create-category-modal';
import { useConsumeSearchParams } from '@/hooks/use-consume-search-params';
import { useState } from 'react';

export const TourCategoryPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useConsumeSearchParams({
    key: 'action',
    value: 'create',
    onConsume: () => {
      setIsAddModalOpen(true);
    },
  });

  return (
    <>
      <PageHelmet title="Danh sách tuyến tour" />
      <AppPageHeader
        title="Danh sách tuyến tour"
        addon={
          <div className="flex items-center justify-end gap-2">
            <Button
              variant={'default'}
              onClick={() => setIsAddModalOpen(true)}
            >
              Thêm mới
            </Button>
            <CategoryFilter />
          </div>
        }
      />
      <div className="space-y-4">
        <CategoryList />
      </div>

      <CreateCategoryModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
};
