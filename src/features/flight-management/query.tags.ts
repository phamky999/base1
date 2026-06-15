export const FLIGHT_MANAGEMENT_TAGS = {
  FLIGHT: 'Flight',
  LOGS: 'FlightLogs',
  STATS: 'FlightStatistics',
} as const;

export type FlightManagementTagType =
  (typeof FLIGHT_MANAGEMENT_TAGS)[keyof typeof FLIGHT_MANAGEMENT_TAGS];

export const FLIGHT_MANAGEMENT_TAG_IDS = {
  LIST: 'LIST',
} as const;

export const FLIGHT_BOOKING_MANAGEMENT_TAGS = {
  BOOKING: 'FlightBooking',
  BOOKING_LOGS: 'FlightBookingLogs',
} as const;

export type FlightBookingManagementTagType =
  (typeof FLIGHT_BOOKING_MANAGEMENT_TAGS)[keyof typeof FLIGHT_BOOKING_MANAGEMENT_TAGS];

export const FLIGHT_BOOKING_MANAGEMENT_TAG_IDS = {
  LIST: 'LIST',
} as const;

export const FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS = {
  FARE_RULE: 'FareRule',
} as const;

export type FlightTicketConditionManagementTagType =
  (typeof FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS)[keyof typeof FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS];

export const FLIGHT_TICKET_CONDITION_MANAGEMENT_TAG_IDS = {
  LIST: 'LIST',
} as const;
