import { AppDialog } from '@/components/app-dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { UserProfileUpdateModal } from '@/features/auth/components/user-profile-update-modal';
import { useGetCurrentUserQuery } from '@/features/auth/query';
import { Skeleton } from 'antd';
import { MailIcon, PhoneIcon, User2Icon } from 'lucide-react';
import { useState } from 'react';

type UserProfileModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const UserProfileModal = ({
  open,
  onOpenChange,
}: UserProfileModalProps) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const { data, isFetching } = useGetCurrentUserQuery();
  const userInfo = data?.data;

  return (
    <>
      <AppDialog
        open={open}
        onOpenChange={onOpenChange}
        title={
          <>
            <User2Icon className="size-5 text-primary" />
            <span>Thông tin cá nhân</span>
          </>
        }
        description={
          <>
            Thông tin tài khoản{' '}
            <span className="font-semibold text-primary">
              {userInfo?.username}
            </span>
          </>
        }
        footer={
          <>
            <DialogClose asChild>
              <Button type="reset" variant="outline">
                Đóng
              </Button>
            </DialogClose>
            <Button onClick={() => setOpenUpdateModal(true)}>Cập nhật</Button>
          </>
        }
      >
        <Skeleton active loading={isFetching}>
          <div className="mb-2 flex flex-col items-center gap-2">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <Avatar className="h-12 w-12 rounded-lg">
                <AvatarFallback className="rounded-lg">
                  {userInfo?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
            <p className="font-semibold">{userInfo?.displayName}</p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              <MailIcon className="size-4 text-gray-400" />
              <span>{userInfo?.email || 'Chưa cập nhật'}</span>
            </div>

            <div className="flex items-center gap-1">
              <PhoneIcon className="size-4 text-gray-400" />
              <span>{userInfo?.phone || 'Chưa cập nhật'}</span>
            </div>
          </div>
        </Skeleton>
      </AppDialog>

      <UserProfileUpdateModal
        open={openUpdateModal}
        onOpenChange={setOpenUpdateModal}
      />
    </>
  );
};
