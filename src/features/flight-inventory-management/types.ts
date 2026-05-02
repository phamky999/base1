import type { FLIGHT_STATUS_OPTION } from '@/features/flight-inventory-management/constants';

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
  arrivalTime: string;
  aircraftType: string;
  seat: {
    total: number;
    available: number;
  };
  price: number;
  status: TFlightStatus;
};
