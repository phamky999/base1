import { HelmetProvider, Helmet } from 'react-helmet-async';

export const PageHelmet = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <Helmet>
    <title>{`${title} | Việt An | Kho Sản Phẩm`}</title>
    <meta name="description" content={description ? description : title} />
  </Helmet>
);

export const AppHelmetWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => <HelmetProvider>{children}</HelmetProvider>;
