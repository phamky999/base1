import { Button } from '@/components/ui/button';
import { ContactSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/contact-section';
import { FlightSelectionSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-selection-section';
import { MerchantSelectionSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/merchant-selection-section';
import { PassengerSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/passenger-section';
import { useCreateFlightBookingMutation } from '@/features/flight-management/query';
import { flightManagementPaths } from '@/features/flight-management/routes';
import type {
  TCreateFlightBookingPayload,
  TFlightListItem,
} from '@/features/flight-management/types';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import type { ObjectType } from '@/lib/types';
import { Form } from 'antd';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const FlightBookingForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [selectedFlight, setSelectedFlight] = useState<TFlightListItem | null>(
    null
  );

  const [selectedMerchant, setSelectedMerchant] =
    useState<TMerchantListItem | null>(null);

  const [createFlightBookingFn, { isLoading }] =
    useCreateFlightBookingMutation();

  const onFinish = async (values: ObjectType) => {
    console.log('values', values, isLoading);
    if (isLoading) return;

    if (!selectedFlight) {
      toast.error('Vui lòng chọn chuyến bay');
      return;
    }
    if (!selectedMerchant) {
      toast.error('Vui lòng chọn kênh bán');
      return;
    }

    try {
      const passengers = (values.passengers || []).map(
        (p: ObjectType, idx: number) => ({
          index: idx + 1,
          type: p.type,
          gender: p.gender,
          firstName: p.firstName,
          lastName: p.lastName,
          birthday: p?.birthday
            ? (p.birthday as Dayjs)?.format(DEFAULT_DATE_FORMAT)
            : null,
          documentNumber: p?.documentNumber ?? null,
          documentExpiryDate: p?.documentExpiryDate
            ? (p.documentExpiryDate as Dayjs)?.format(DEFAULT_DATE_FORMAT)
            : null,
          documentIssuingCountry: p?.documentIssuingCountry ?? null,
          documentNationality: p?.documentNationality ?? null,
        })
      );

      const payload: TCreateFlightBookingPayload = {
        flightId: selectedFlight.id,
        merchantCode: selectedMerchant.merchantCode,
        passengers,
        contactInfo: {
          gender: values.contactInfo?.gender,
          firstName: values.contactInfo?.firstName,
          lastName: values.contactInfo?.lastName,
          address: values.contactInfo?.address,
          phone: values.contactInfo?.phone,
          email: values.contactInfo?.email,
        },
      };

      await createFlightBookingFn(payload).unwrap();
      toast.success('Tạo đơn hàng thành công');
      navigate(flightManagementPaths.bookingList.fullPath);
    } catch (error: unknown) {
      console.error('Submit booking error:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={isLoading}
      scrollToFirstError
      onFinish={onFinish}
      initialValues={{
        passengers: [{}],
      }}
    >
      <div className="space-y-6">
        <FlightSelectionSection
          selectedFlight={selectedFlight}
          setSelectedFlight={setSelectedFlight}
        />

        <MerchantSelectionSection
          selectedMerchant={selectedMerchant}
          setSelectedMerchant={setSelectedMerchant}
        />

        <PassengerSection />

        <ContactSection />
      </div>
      <div className="sticky bottom-0 z-1 mt-6 flex items-center justify-between gap-4 bg-(--main-background) p-4">
        <Button
          type="button"
          variant="outline"
          className="min-w-25"
          onClick={() => navigate(-1)}
        >
          Hủy
        </Button>

        <Button
          type="submit"
          variant="default"
          className="min-w-25"
          loading={isLoading}
        >
          Tạo đơn hàng
        </Button>
      </div>
    </Form>
  );
};
