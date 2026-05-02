import { store } from '@/app/redux/store';
import { AppHelmetWrapper } from '@/components/app-helmet';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useTheme } from '@/context/theme';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
import vi_VN from 'antd/es/locale/vi_VN';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from '@/app/router/app-routes';

export function App() {
  const { theme: appTheme } = useTheme();

  const ANT_DESIGN_THEME = {
    algorithm:
      appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: '#4F46E5',
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
            <Toaster position="top-right" closeButton richColors />

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
}

export default App;
