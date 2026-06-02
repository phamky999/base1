import { Button } from '@/components/ui/button';
import { MerchantSelectionDrawer } from '@/features/flight-management/components/flight-booking/flight-booking-form/merchant-selection-drawer';
import { MerchantInfoCard } from '@/features/merchant-management/components/merchant-info-card';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { InfoIcon } from 'lucide-react';
import { useState, type Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';

type MerchantSelectionSectionProps = {
  selectedMerchant: TMerchantListItem | null;
  setSelectedMerchant: Dispatch<React.SetStateAction<TMerchantListItem | null>>;
};

export const MerchantSelectionSection = ({
  selectedMerchant,
  setSelectedMerchant,
}: MerchantSelectionSectionProps) => {
  const navigate = useNavigate();

  const [isMerchantDrawerOpen, setIsMerchantDrawerOpen] = useState(false);

  const handleSelectMerchant = (merchant: TMerchantListItem) => {
    setSelectedMerchant(merchant);
    setIsMerchantDrawerOpen(false);
    navigate(
      {
        search: '',
      },
      {
        replace: true,
        preventScrollReset: true,
      }
    );
  };

  return (
    <>
      <div className="card flex min-h-60 flex-col justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2">
            <h3 className="text-base font-semibold">Thông tin kênh bán</h3>
          </div>

          {selectedMerchant ? (
            <MerchantInfoCard
              merchantId={selectedMerchant?.id}
              className="border-dashed! bg-muted! shadow-none!"
            />
          ) : (
            <div className="card flex flex-col items-center justify-center border-dashed bg-muted shadow-none!">
              <InfoIcon className="mb-2 size-8 text-muted-foreground" />
              <p className="mb-1 text-sm">Chưa chọn kênh bán</p>
              <p className="text-center text-xs text-muted-foreground">
                Vui lòng click nút phía dưới để chọn kênh bán từ danh sách
              </p>
            </div>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-4 flex w-full items-center justify-center gap-2 border-dashed"
          onClick={() => setIsMerchantDrawerOpen(true)}
        >
          {selectedMerchant ? 'Đổi kênh bán khác' : 'Chọn kênh bán'}
        </Button>
      </div>

      <MerchantSelectionDrawer
        open={isMerchantDrawerOpen}
        onOpenChange={setIsMerchantDrawerOpen}
        onSelectMerchant={handleSelectMerchant}
      />
    </>
  );
};
