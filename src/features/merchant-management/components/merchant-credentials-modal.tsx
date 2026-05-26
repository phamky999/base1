import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  useGenerateMerchantCredentialMutation,
  useGetMerchantCredentialsQuery,
  useRegenerateMerchantCredentialMutation,
} from '@/features/merchant-management/query';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { skipToken } from '@reduxjs/toolkit/query';
import { Modal, Skeleton } from 'antd';
import {
  CheckIcon,
  CopyIcon,
  EyeIcon,
  EyeOffIcon,
  KeyRoundIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type MerchantCredentialsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchant: TMerchantListItem;
};

export const MerchantCredentialsModal = ({
  open,
  onOpenChange,
  merchant,
}: MerchantCredentialsModalProps) => {
  const queryArg = !merchant?.id || !open ? skipToken : { id: merchant.id };
  const { data, isLoading, isFetching } =
    useGetMerchantCredentialsQuery(queryArg);

  const [generateCredentials, { isLoading: isGenerating }] =
    useGenerateMerchantCredentialMutation();
  const [regenerateCredentials, { isLoading: isRegenerating }] =
    useRegenerateMerchantCredentialMutation();

  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedSecret, setCopiedSecret] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const credential = data?.data;

  const handleCopy = async (text: string, type: 'key' | 'secret') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'key') {
        setCopiedKey(true);
        setTimeout(() => setCopiedKey(false), 2000);
      } else {
        setCopiedSecret(true);
        setTimeout(() => setCopiedSecret(false), 2000);
      }
      toast.success('Đã sao chép vào bộ nhớ tạm');
    } catch (err) {
      console.error(err);
      toast.error('Không thể sao chép');
    }
  };

  const handleGenerate = async () => {
    try {
      await generateCredentials({ id: merchant.id }).unwrap();
      toast.success('Tạo thông tin kết nối API thành công');
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegenerate = async () => {
    Modal.confirm({
      icon: null,
      title: 'Xác nhận',
      content: (
        <p>
          Bạn có chắc chắn muốn cấp lại thông tin kết nối API? Khóa API cũ sẽ
          lập tức mất hiệu lực và các tích hợp đang hoạt động có thể bị gián
          đoạn.
        </p>
      ),
      okText: 'Đồng ý',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          await regenerateCredentials({ id: merchant.id }).unwrap();
          toast.success('Cấp lại thông tin kết nối API thành công');
        } catch (error) {
          console.error(error);
        }
      },
      okButtonProps: {
        danger: true,
        loading: isRegenerating,
      },
    });
  };

  const hasCredentials =
    credential?.hasCredentials || (credential?.apiKey && credential?.apiSecret);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRoundIcon className="size-5 text-primary" />
            <span>Thông tin kết nối API</span>
          </DialogTitle>
          <DialogDescription>
            Quản lý thông tin kết nối của kênh bán{' '}
            <span className="font-semibold text-primary">{merchant?.name}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="dialog-scroll-content">
          <Skeleton loading={isLoading || isFetching} active>
            {hasCredentials ? (
              <div className="space-y-4">
                {/* API Key */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    API Key
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2">
                    <code className="line-clamp-1 flex-1 font-mono text-sm break-all select-all">
                      {credential.apiKey}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() =>
                        credential.apiKey &&
                        handleCopy(credential.apiKey, 'key')
                      }
                    >
                      {copiedKey ? (
                        <CheckIcon className="size-4 text-emerald-500" />
                      ) : (
                        <CopyIcon className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* API Secret */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    API Secret
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-2">
                    <code className="line-clamp-1 flex-1 font-mono text-sm break-all select-all">
                      {showSecret
                        ? credential.apiSecret
                        : '••••••••••••••••••••••••••••••••'}
                    </code>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() => setShowSecret(!showSecret)}
                    >
                      {showSecret ? (
                        <EyeOffIcon className="size-4 text-muted-foreground" />
                      ) : (
                        <EyeIcon className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-8"
                      onClick={() =>
                        credential.apiSecret &&
                        handleCopy(credential.apiSecret, 'secret')
                      }
                    >
                      {copiedSecret ? (
                        <CheckIcon className="size-4 text-emerald-500" />
                      ) : (
                        <CopyIcon className="size-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 py-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <KeyRoundIcon className="size-8 text-primary" />
                </div>
                <div className="max-w-sm space-y-1.5">
                  <p className="text-sm font-semibold">
                    Chưa có thông tin kết nối
                  </p>
                  <p className="text-xs text-muted-foreground">
                    kênh bán này chưa được cấp thông tin kết nối API (API Key và
                    API Secret). Nhấn vào nút bên dưới để khởi tạo.
                  </p>
                </div>
                <Button
                  size="sm"
                  loading={isGenerating}
                  onClick={handleGenerate}
                  className="mt-2"
                >
                  Khởi tạo thông tin kết nối
                </Button>
              </div>
            )}
          </Skeleton>
        </div>

        <DialogFooter className="flex-row justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
          {hasCredentials && (
            <Button
              variant="default"
              loading={isRegenerating}
              onClick={handleRegenerate}
            >
              Cấp lại
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
