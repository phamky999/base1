import type { QueryResponse } from '@/app/redux/types';
import {
  FLIGHT_BOOKING_MANAGEMENT_TAGS,
  FLIGHT_BOOKING_MANAGEMENT_TAG_IDS,
  FLIGHT_MANAGEMENT_TAGS,
  FLIGHT_MANAGEMENT_TAG_IDS,
  FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS,
  FLIGHT_TICKET_CONDITION_MANAGEMENT_TAG_IDS,
} from './query.tags';
import type {
  TGetFareRulesResponse,
  TGetFlightBookingListResponse,
  TGetFlightListResponse,
} from '@/features/flight-management/types';

export const flightListProvideTags = (
  result: QueryResponse<TGetFlightListResponse> | undefined,
  error: unknown
) => {
  if (error) return [];
  return result?.data?.items?.length
    ? [
        {
          type: FLIGHT_MANAGEMENT_TAGS.FLIGHT,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
        ...result.data.items.map(item => ({
          type: FLIGHT_MANAGEMENT_TAGS.FLIGHT,
          id: item.id,
        })),
      ]
    : [
        {
          type: FLIGHT_MANAGEMENT_TAGS.FLIGHT,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];
};

export const flightDetailProvideTags = (error: unknown, id: string) =>
  error ? [] : [{ type: FLIGHT_MANAGEMENT_TAGS.FLIGHT, id }];

export const flightLogsProvideTags = (error: unknown, id: string) =>
  error ? [] : [{ type: FLIGHT_MANAGEMENT_TAGS.LOGS, id }];

export const flightStatsProvideTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: FLIGHT_MANAGEMENT_TAGS.STATS,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const flightStatusChangeInvalidateTags = (error: unknown, id: string) =>
  error
    ? []
    : [
        { type: FLIGHT_MANAGEMENT_TAGS.FLIGHT, id },
        {
          type: FLIGHT_MANAGEMENT_TAGS.FLIGHT,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
        { type: FLIGHT_MANAGEMENT_TAGS.LOGS, id },
        {
          type: FLIGHT_MANAGEMENT_TAGS.STATS,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const flightListInvalidateTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: FLIGHT_MANAGEMENT_TAGS.FLIGHT,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
        {
          type: FLIGHT_MANAGEMENT_TAGS.STATS,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const flightUpdateInvalidateTags = (error: unknown, id: string) =>
  error
    ? []
    : [
        { type: FLIGHT_MANAGEMENT_TAGS.FLIGHT, id },
        {
          type: FLIGHT_MANAGEMENT_TAGS.FLIGHT,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
        { type: FLIGHT_MANAGEMENT_TAGS.LOGS, id },
        {
          type: FLIGHT_MANAGEMENT_TAGS.STATS,
          id: FLIGHT_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const flightDeleteInvalidateTags = (error: unknown, id: string) => [
  ...flightListInvalidateTags(error),
  ...(error ? [] : [{ type: FLIGHT_MANAGEMENT_TAGS.LOGS, id }]),
];

// ─── Flight Booking Management ───────────────────────────────────────

export const flightBookingListProvideTags = (
  result: QueryResponse<TGetFlightBookingListResponse> | undefined,
  error: unknown
) => {
  if (error) return [];
  return result?.data?.items?.length
    ? [
        {
          type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING,
          id: FLIGHT_BOOKING_MANAGEMENT_TAG_IDS.LIST,
        },
        ...result.data.items.map(item => ({
          type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING,
          id: item.id,
        })),
      ]
    : [
        {
          type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING,
          id: FLIGHT_BOOKING_MANAGEMENT_TAG_IDS.LIST,
        },
      ];
};

export const flightBookingDetailProvideTags = (error: unknown, id: string) =>
  error
    ? []
    : [{ type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING, id }];

export const flightBookingLogsProvideTags = (error: unknown, id: string) =>
  error
    ? []
    : [{ type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING_LOGS, id }];

export const flightBookingCreateInvalidateTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING,
          id: FLIGHT_BOOKING_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const flightBookingUpdateInvalidateTags = (
  error: unknown,
  id: string
) =>
  error
    ? []
    : [
        { type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING, id },
        {
          type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING,
          id: FLIGHT_BOOKING_MANAGEMENT_TAG_IDS.LIST,
        },
        { type: FLIGHT_BOOKING_MANAGEMENT_TAGS.BOOKING_LOGS, id },
      ];

// ─── Flight Ticket Condition (Fare Rules) Management ─────────────────

export const fareRulesProvideTags = (
  result: QueryResponse<TGetFareRulesResponse> | undefined,
  error: unknown
) => {
  if (error) return [];
  return result?.data?.length
    ? [
        {
          type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE,
          id: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAG_IDS.LIST,
        },
        ...result.data.map(item => ({
          type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE,
          id: item.id,
        })),
      ]
    : [
        {
          type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE,
          id: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAG_IDS.LIST,
        },
      ];
};

export const fareRuleDetailProvideTags = (error: unknown, id: string) =>
  error
    ? []
    : [{ type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE, id }];

export const fareRuleCreateInvalidateTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE,
          id: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const fareRuleUpdateInvalidateTags = (
  error: unknown,
  id: string
) =>
  error
    ? []
    : [
        { type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE, id },
        {
          type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE,
          id: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAG_IDS.LIST,
        },
      ];

export const fareRuleDeleteInvalidateTags = (
  error: unknown,
  id: string
) => [
  ...fareRuleCreateInvalidateTags(error),
  ...(error
    ? []
    : [{ type: FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS.FARE_RULE, id }]),
];
