import { AppDrawer } from '@/components/app-drawer';
import { MerchantList } from '@/features/merchant-management/components/merchant-list';
import type { TMerchantListItem } from '@/features/merchant-management/types';

type MerchantSelectionDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectMerchant: (record: TMerchantListItem) => void;
};

export const MerchantSelectionDrawer = ({
  open,
  onOpenChange,
  onSelectMerchant,
}: MerchantSelectionDrawerProps) => {
  return (
    <AppDrawer open={open} onOpenChange={onOpenChange} title="Chọn kênh bán">
      <MerchantList
        showMerchantActiveOnly
        showInSelectMerchantDrawer
        customOnSelectRecord={onSelectMerchant}
      />
    </AppDrawer>
  );
};
