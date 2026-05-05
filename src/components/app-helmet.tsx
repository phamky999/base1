import { HelmetProvider, Helmet } from 'react-helmet-async';

export const PageHelmet = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => (
  <Helmet>
    <title>{`${title} | Kho Sản Phẩm | Việt An `}</title>
    <meta name="description" content={description ? description : title} />
  </Helmet>
);

export const AppHelmetWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => <HelmetProvider>{children}</HelmetProvider>;
