import { Button } from '@/components/ui/button';
import { ContactSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/contact-section';
import {
  CONTACT_FIELDS,
  PASSENGER_FIELDS,
} from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-booking-form.schema';
import { FlightSelectionSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/flight-selection-section';
import { MerchantSelectionSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/merchant-selection-section';
import { PassengerSection } from '@/features/flight-management/components/flight-booking/flight-booking-form/passenger-section';
import { useCreateFlightBookingMutation } from '@/features/flight-management/query';
import { PreviewBookingDrawer } from '@/features/flight-management/components/flight-booking/flight-booking-form/preview-booking-drawer';
import { FLIGHT_BOOKING_STATUS } from '@/features/flight-management/constants';
import type {
  TCreateFlightBookingPayload,
  TFlightListItem,
  TGetFlightBookingDetailPassenger,
  TGetFlightBookingDetailResponse,
} from '@/features/flight-management/types';
import type { TMerchantListItem } from '@/features/merchant-management/types';
import { GENDER, PASSENGER_TYPE } from '@/lib/constants';
import { DEFAULT_DATE_FORMAT } from '@/lib/date/constants';
import type { ObjectType } from '@/lib/types';
import { Form } from 'antd';
import type { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { flightManagementPaths } from '@/features/flight-management/routes';

export const FlightBookingForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [selectedFlight, setSelectedFlight] = useState<TFlightListItem | null>(
    null
  );

  const [selectedMerchant, setSelectedMerchant] =
    useState<TMerchantListItem | null>(null);

  const [isPreviewDrawerOpen, setIsPreviewDrawerOpen] = useState(false);

  const [previewDetail, setPreviewDetail] = useState<
    TGetFlightBookingDetailResponse | undefined
  >(undefined);

  const [createFlightBookingFn, { isLoading }] =
    useCreateFlightBookingMutation();

  const onFinish = async (
    values: ObjectType,
    action: 'submit' | 'preview' = 'preview'
  ) => {
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
      const passengers: TGetFlightBookingDetailPassenger[] = (
        values.passengers || []
      ).map((p: ObjectType, idx: number) => ({
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
      }));

      if (action === 'preview') {
        const adult = passengers.filter(
          p => p.type === PASSENGER_TYPE.ADULT
        ).length;
        const children = passengers.filter(
          p => p.type === PASSENGER_TYPE.CHILDREN
        ).length;
        const infant = passengers.filter(
          p => p.type === PASSENGER_TYPE.INFANT
        ).length;

        const totalPrice =
          adult * selectedFlight.priceAdult +
          children * selectedFlight.priceChild +
          infant * selectedFlight.priceInfant;

        const contactName = [
          values.contactInfo?.lastName,
          values.contactInfo?.firstName,
        ]
          .filter(Boolean)
          .join(' ');

        const detailResponse = {
          id: 'mock-booking-id',
          flightId: selectedFlight.id,
          status: FLIGHT_BOOKING_STATUS.HOLD,
          airlineCode: selectedFlight.airlineCode,
          airlineName: selectedFlight.airlineName,
          startPoint: selectedFlight.startPoint,
          endPoint: selectedFlight.endPoint,
          startDate: selectedFlight.startDate,
          endDate: selectedFlight.endDate,
          bookingCode: selectedFlight.bookingCode,
          userId: null,
          userName: null,
          providerCode: selectedMerchant.providerCode,
          merchantCode: selectedMerchant.merchantCode,
          merchantName: selectedMerchant.name,
          adult,
          children,
          infant,
          totalPrice,
          contactName,
          contactPhone: values.contactInfo?.phone || '',
          contactEmail: values.contactInfo?.email || '',
          lastTicketDate: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          passengers: passengers.map((p, idx) => ({
            id: `mock-passenger-id-${idx + 1}`,
            bookingId: 'mock-booking-id',
            flightId: selectedFlight.id,
            type: p.type,
            gender: p.gender,
            firstName: p.firstName,
            lastName: p.lastName,
            birthday: p.birthday,
            documentNumber: p.documentNumber || '',
            documentExpiryDate: p.documentExpiryDate,
            documentNationality: p.documentNationality,
            documentIssuingCountry: p.documentIssuingCountry,
          })),
        };

        setPreviewDetail(detailResponse as TGetFlightBookingDetailResponse);
        setIsPreviewDrawerOpen(true);

        return;
      }

      const payload: TCreateFlightBookingPayload = {
        flightId: selectedFlight.id,
        merchantCode: selectedMerchant.merchantCode,
        passengers,
        contactInfo: {
          gender: values.contactInfo?.gender,
          firstName: values.contactInfo?.firstName,
          lastName: values.contactInfo?.lastName,
          address: values.contactInfo?.address ?? 'Việt Nam',
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
    <>
      <Form
        form={form}
        layout="vertical"
        disabled={isLoading}
        scrollToFirstError
        onFinish={onFinish}
        initialValues={{
          passengers: [
            {
              [PASSENGER_FIELDS.TYPE]: PASSENGER_TYPE.ADULT,
              [PASSENGER_FIELDS.GENDER]: GENDER.MALE,
            },
          ],
          contactInfo: {
            [CONTACT_FIELDS.GENDER]: GENDER.MALE,
          },
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
        <div className="card sticky bottom-0 z-1 mt-6 flex items-center justify-between gap-4 bg-card">
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
      <PreviewBookingDrawer
        open={isPreviewDrawerOpen}
        onOpenChange={setIsPreviewDrawerOpen}
        detail={previewDetail}
        onConfirm={() => onFinish(form.getFieldsValue(), 'submit')}
      />
    </>
  );
};
