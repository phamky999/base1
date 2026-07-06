import { Button } from '@/components/ui/button';
import { GeneralInfoSection } from '@/features/tour-management/components/tour/general-info';
import { ItinerarySection } from '@/features/tour-management/components/tour/itinerary-section';
import { PriceInfoSection } from '@/features/tour-management/components/tour/price-info';
import { useCreateTourMutation } from '@/features/tour-management/query';
import { tourManagementPaths } from '@/features/tour-management/routes';
import type { TCreateTourPayload } from '@/features/tour-management/types';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const TourForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [createTourMutationFn, { isLoading: isCreating }] =
    useCreateTourMutation();
  const isSubmitting = isCreating;

  const onFinish = async (values: TCreateTourPayload) => {
    if (isSubmitting) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (createTourMutationFn({ payload: values }) as any).unwrap();
      toast.success('Tạo tour thành công');
      navigate(tourManagementPaths.tourList.fullPath);
    } catch (error) {
      console.error('Submit Error', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={isSubmitting}
      scrollToFirstError
      onFinish={onFinish}
      onKeyDown={e => {
        if (e.key === 'Enter' && !(e.target instanceof HTMLTextAreaElement)) {
          e.preventDefault();
        }
      }}
    >
      <div className="space-y-4">
        <GeneralInfoSection className="card" />
        <PriceInfoSection className="card" />

        <ItinerarySection className="card" />
      </div>

      <div className="card sticky bottom-0 z-50 mt-4 flex items-center justify-between gap-4 bg-card">
        <Button
          type="button"
          variant="outline"
          className="min-w-25"
          onClick={() => navigate(-1)}
          disabled={isSubmitting}
        >
          Hủy
        </Button>

        <Button
          type="submit"
          variant="default"
          className="min-w-25"
          loading={isSubmitting}
        >
          Tạo tour
        </Button>
      </div>
    </Form>
  );
};
