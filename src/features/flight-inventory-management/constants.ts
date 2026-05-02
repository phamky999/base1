import type { TFlightListItem } from '@/features/flight-inventory-management/types';
import { fillArrayWithNumber } from '@/lib/helpers/array';

export const FLIGHT_STATUS_OPTION = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  CANCELLED: 'CANCELLED',
} as const;

export const FLIGHT_STATUS_LABEL = {
  [FLIGHT_STATUS_OPTION.PENDING]: 'Đang chờ',
  [FLIGHT_STATUS_OPTION.ACTIVE]: 'Đang hoạt động',
  [FLIGHT_STATUS_OPTION.CANCELLED]: 'Đã hủy',
} as const;

export const FLIGHT_STATUS_COLOR = {
  [FLIGHT_STATUS_OPTION.PENDING]: 'yellow',
  [FLIGHT_STATUS_OPTION.ACTIVE]: 'blue',
  [FLIGHT_STATUS_OPTION.CANCELLED]: 'red',
} as const;

export const mockFlightList: TFlightListItem[] = fillArrayWithNumber(20).map(
  (_, index) => ({
    id: (index + 2).toString(),
    flightNumber: `VN${index + 123}`,
    airline: `Vietnam Airlines ${index + 1}`,
    originAirport: 'HAN',
    destinationAirport: 'SGN',
    departureDate: '2022-01-01',
    departureTime: '12:00',
    arrivalTime: '13:00',
    aircraftType: 'Boeing 737',
    seat: {
      total: 180,
      available: index > 0 && index % 9 === 0 ? 0 : 100,
    },
    price: 1000000,
    status:
      index === 0
        ? FLIGHT_STATUS_OPTION.PENDING
        : index > 10 && index % 3 === 0
          ? FLIGHT_STATUS_OPTION.CANCELLED
          : FLIGHT_STATUS_OPTION.ACTIVE,
  })
);

export const mockReportData = {
  totalFlight: mockFlightList.length,
  totalSeat: mockFlightList.reduce((acc, flight) => acc + flight.seat.total, 0),
  totalPrice: mockFlightList.reduce((acc, flight) => acc + flight.price, 0),
  totalAvailable: mockFlightList.reduce(
    (acc, flight) => acc + flight.seat.available,
    0
  ),
  totalFlightSold: mockFlightList.reduce(
    (acc, flight) => acc + (flight.seat.total - flight.seat.available),
    0
  ),
  countFlightByStatus: mockFlightList.reduce(
    (acc, flight) => {
      acc[flight.status] = (acc[flight.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  ),
};
