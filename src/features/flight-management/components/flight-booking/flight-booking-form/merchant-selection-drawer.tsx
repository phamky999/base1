import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { MerchantList } from '@/features/merchant-management/components/merchant-list';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { XIcon } from 'lucide-react';

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
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="flex h-full max-w-3xl! flex-col max-md:w-full!">
        <DrawerHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <DrawerTitle className="text-lg font-bold">
              Chọn kênh bán
            </DrawerTitle>
          </div>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => onOpenChange(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div data-vaul-no-drag className="flex-1 overflow-y-auto p-4">
          <MerchantList
            showMerchantActiveOnly
            showInSelectMerchantDrawer
            customOnSelectRecord={onSelectMerchant}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
