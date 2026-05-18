import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { UpdatePasswordModal } from '@/features/auth/components/update-password-modal';
import { UserProfileModal } from '@/features/auth/components/user-profile-modal';
import { useRevokeAuthTokenMutation } from '@/features/auth/query';
import { currentUserSelector } from '@/features/auth/selector';
import { logout } from '@/features/auth/slice';
import { TOKEN } from '@/lib/constants';
import { clearAuthToken, cn, getAuthToken } from '@/lib/utils';
import { Modal } from 'antd';
import {
  ChevronsUpDownIcon,
  LockIcon,
  LogOutIcon,
  User2Icon,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { confirm } = Modal;

export const SidebarUser = ({ showInHeader }: { showInHeader?: boolean }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isMobile, open } = useSidebar();

  const [openUserProfileDialog, setOpenUserProfileDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  const currentUser = useAppSelector(currentUserSelector);

  const avatarFallback =
    currentUser?.displayName?.charAt(0)?.toUpperCase() || 'U';

  const [revokeAuthTokenFn] = useRevokeAuthTokenMutation();

  const handleLogout = () => {
    confirm({
      title: 'Đăng xuất',
      content: 'Bạn có chắc chắn muốn đăng xuất?',
      okText: 'Đăng xuất',
      cancelText: 'Hủy',
      icon: null,
      onOk: () => {
        const refreshToken = getAuthToken(TOKEN.REFRESH_TOKEN);
        if (refreshToken) {
          revokeAuthTokenFn(refreshToken);
        }

        clearAuthToken();
        dispatch(logout());
        navigate('/auth/login', { replace: true });
      },
      okButtonProps: {
        className: 'bg-destructive! hover:bg-destructive/80!',
      },
    });
  };

  return (
    <SidebarMenu className={cn(showInHeader && 'w-fit')}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {!showInHeader ? (
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={currentUser?.avatar}
                      alt={currentUser?.displayName}
                    />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                  </Avatar>
                </div>
                {open && (
                  <>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {currentUser?.displayName}
                      </span>
                      <span className="truncate text-xs">
                        {currentUser?.email}
                      </span>
                    </div>
                    <ChevronsUpDownIcon className="ml-auto size-4" />
                  </>
                )}
              </SidebarMenuButton>
            ) : (
              <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@admin" />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={showInHeader ? 'bottom' : isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal text-accent-foreground!">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={currentUser?.avatar}
                    alt={currentUser?.displayName}
                  />
                  <AvatarFallback className="rounded-lg">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {currentUser?.displayName}
                  </span>
                  <span className="truncate text-xs">{currentUser?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setOpenUserProfileDialog(true)}>
                <User2Icon />
                Tài khoản
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setOpenPasswordDialog(true)}>
                <LockIcon />
                Đổi mật khẩu
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
              <LogOutIcon />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      <UserProfileModal
        open={openUserProfileDialog}
        onOpenChange={setOpenUserProfileDialog}
      />
      <UpdatePasswordModal
        open={openPasswordDialog}
        onOpenChange={setOpenPasswordDialog}
      />
    </SidebarMenu>
  );
};
