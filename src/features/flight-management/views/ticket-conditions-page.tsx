import { PageHelmet } from '@/components/app-helmet';
import { AppPageHeader } from '@/components/app-page-header';
import { Button } from '@/components/ui/button';
import { TicketConditionForm } from '@/features/flight-management/components/ticket-condition/ticket-condition-form/index';
import { TicketConditionList } from '@/features/flight-management/components/ticket-condition/ticket-condition-list';
import { useState } from 'react';

export const TicketConditionsPage = () => {
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);

  const handleOpenCreateDrawer = () => {
    setIsAddEditModalOpen(true);
  };

  return (
    <>
      <PageHelmet title="Danh sách bộ điều kiện vé" />
      <AppPageHeader
        title="Danh sách bộ điều kiện vé"
        addon={
          <div className="flex justify-end gap-4">
            <Button variant={'default'} onClick={handleOpenCreateDrawer}>
              Thêm mới
            </Button>
          </div>
        }
      />

      <TicketConditionList />

      <TicketConditionForm
        selectedId={null}
        open={isAddEditModalOpen}
        onOpenChange={setIsAddEditModalOpen}
      />
    </>
  );
};
