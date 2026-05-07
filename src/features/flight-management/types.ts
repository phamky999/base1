import type {
  FLIGHT_BOOKING_STATUS_OPTION,
  FLIGHT_STATUS_OPTION,
} from '@/features/flight-management/constants';

export type TFlightStatus =
  (typeof FLIGHT_STATUS_OPTION)[keyof typeof FLIGHT_STATUS_OPTION];

export type TFlightListItem = {
  id: string;
  flightNumber: string;
  airline: string;
  originAirport: string;
  destinationAirport: string;
  departureDate: string;
  departureTime: string;
  returnDate: string;
  arrivalTime: string;
  aircraftType: string;
  seat: {
    total: number;
    available: number;
  };
  price: number;
  status: TFlightStatus;
};

export type TFlightBookingStatus =
  (typeof FLIGHT_BOOKING_STATUS_OPTION)[keyof typeof FLIGHT_BOOKING_STATUS_OPTION];
