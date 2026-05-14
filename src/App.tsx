import { store } from '@/app/redux/store';
import { appRoutes } from '@/app/router/app-routes';
import { AppHelmetWrapper } from '@/components/app-helmet';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useTheme } from '@/context/theme';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import vi_VN from 'antd/es/locale/vi_VN';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { Spin } from 'antd';
import { AppScreenLoader } from '@/components/app-screen-loader';

Spin.setDefaultIndicator(<AppScreenLoader isFullScreen={false} />);

export const App = () => {
  const { resolvedTheme } = useTheme();

  const ANT_DESIGN_THEME = {
    algorithm:
      resolvedTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: resolvedTheme === 'dark' ? '#193cb8' : '#1447e6',
    },
    components: {
      Form: {
        itemMarginBottom: 20,
      },
    },
  };
  return (
    <Provider store={store}>
      <AppHelmetWrapper>
        <StyleProvider layer>
          <ConfigProvider locale={vi_VN} theme={ANT_DESIGN_THEME}>
            <Toaster
              position="top-right"
              closeButton
              richColors
              offset={{
                top: 50,
              }}
            />

            <TooltipProvider>
              <RouterProvider
                future={{
                  v7_startTransition: true,
                }}
                router={appRoutes}
              />
            </TooltipProvider>
          </ConfigProvider>
        </StyleProvider>
      </AppHelmetWrapper>
    </Provider>
  );
};
