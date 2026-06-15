import { baseApi } from '@/app/redux/baseApi';
import type { QueryResponse } from '@/app/redux/types';
import {
  flightBookingCreateInvalidateTags,
  flightBookingDetailProvideTags,
  flightBookingListProvideTags,
  flightBookingLogsProvideTags,
  flightBookingUpdateInvalidateTags,
  flightDeleteInvalidateTags,
  flightDetailProvideTags,
  flightListInvalidateTags,
  flightListProvideTags,
  flightLogsProvideTags,
  flightStatsProvideTags,
  flightStatusChangeInvalidateTags,
  flightUpdateInvalidateTags,
  fareRuleCreateInvalidateTags,
  fareRuleDeleteInvalidateTags,
  fareRuleDetailProvideTags,
  fareRulesProvideTags,
  fareRuleUpdateInvalidateTags,
} from '@/features/flight-management/query.helpers';
import {
  FLIGHT_BOOKING_MANAGEMENT_TAGS,
  FLIGHT_MANAGEMENT_TAGS,
  FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS,
} from '@/features/flight-management/query.tags';
import type {
  TAircraftItem,
  TAirlineItem,
  TAirportItem,
  TCreateFareRulePayload,
  TCreateFlightBookingPayload,
  TCreateFlightMutationArg,
  TCreateFlightResponse,
  TFlightBookingLogItem,
  TFlightDetailLogItem,
  TGetAirlineClassesResponse,
  TGetFareRuleDetailResponse,
  TGetFareRulesResponse,
  TGetFlightBookingDetailResponse,
  TGetFlightBookingListRequestParams,
  TGetFlightBookingListResponse,
  TGetFlightDetailResponse,
  TGetFlightListRequestParams,
  TGetFlightListResponse,
  TGetFlightStaticsResponse,
  TUpdateFareRulePayload,
  TUpdateFlightPayload,
  TUpdateFlightResponse,
} from '@/features/flight-management/types';

const endpoint = '/FlightInventory';

const MASTER_DATA_CACHE_TIME = 3600; // 1 hour

export const flightMasterDataQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [],
  })
  .injectEndpoints({
    endpoints: builder => ({
      SearchAirports: builder.query<
        QueryResponse<TAirportItem[]>,
        { keyword: string }
      >({
        query: params => ({
          url: `${endpoint}/Airports/Search`,
          method: 'GET',
          params,
        }),
        keepUnusedDataFor: MASTER_DATA_CACHE_TIME,
      }),
      GetAircrafts: builder.query<QueryResponse<TAircraftItem[]>, void>({
        query: () => ({
          url: `${endpoint}/Aircrafts`,
          method: 'GET',
        }),
        keepUnusedDataFor: MASTER_DATA_CACHE_TIME,
      }),
      GetAirlines: builder.query<QueryResponse<TAirlineItem[]>, void>({
        query: () => ({
          url: `${endpoint}/Airlines`,
          method: 'GET',
        }),
        keepUnusedDataFor: MASTER_DATA_CACHE_TIME,
      }),
      GetAirlineClasses: builder.query<
        QueryResponse<TGetAirlineClassesResponse>,
        void
      >({
        query: () => ({
          url: `${endpoint}/AirlineClasses`,
          method: 'GET',
        }),
        keepUnusedDataFor: MASTER_DATA_CACHE_TIME,
      }),
    }),
  });

export const flightManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(FLIGHT_MANAGEMENT_TAGS),
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetFlightList: builder.query<
        QueryResponse<TGetFlightListResponse>,
        TGetFlightListRequestParams
      >({
        query: params => ({
          url: `${endpoint}/Flights`,
          method: 'GET',
          params,
        }),
        providesTags: (result, error) => flightListProvideTags(result, error),
      }),

      GetFlightStatics: builder.query<
        QueryResponse<TGetFlightStaticsResponse>,
        TGetFlightListRequestParams
      >({
        query: params => ({
          url: `${endpoint}/Flights/Statistics`,
          method: 'GET',
          params,
        }),

        providesTags: (_, error) => flightStatsProvideTags(error),
      }),

      GetFlightDetail: builder.query<
        QueryResponse<TGetFlightDetailResponse>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Flights/${id}`,
          method: 'GET',
        }),

        providesTags: (_, error, id) => flightDetailProvideTags(error, id),
      }),

      GetFlightDetailLogs: builder.query<
        QueryResponse<TFlightDetailLogItem[]>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Flights/${id}/Logs`,
          method: 'GET',
        }),

        providesTags: (_, error, id) => flightLogsProvideTags(error, id),
      }),

      CreateFlight: builder.mutation<
        QueryResponse<TCreateFlightResponse>,
        TCreateFlightMutationArg
      >({
        query: ({ payload, extraOptions }) => ({
          url: `${endpoint}/Flights/Add`,
          method: 'POST',
          body: payload,
          extraOptions: {
            ...extraOptions,
          },
        }),

        invalidatesTags: (_, error) => flightListInvalidateTags(error),
      }),

      UpdateFlight: builder.mutation<
        QueryResponse<TUpdateFlightResponse>,
        TUpdateFlightPayload
      >({
        query: ({ id, ...restPayload }) => ({
          url: `${endpoint}/Flights/Update/${id}`,
          method: 'PUT',
          body: restPayload,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightUpdateInvalidateTags(error, id),
      }),

      PublishFlight: builder.mutation<
        QueryResponse<void>,
        { id: string; remark: string }
      >({
        query: ({ id, ...rest }) => ({
          url: `${endpoint}/Flights/Publish/${id}`,
          method: 'PUT',
          body: rest,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightStatusChangeInvalidateTags(error, id),
      }),

      CloseFlight: builder.mutation<
        QueryResponse<void>,
        { id: string; remark: string }
      >({
        query: ({ id, ...rest }) => ({
          url: `${endpoint}/Flights/Close/${id}`,
          method: 'PUT',
          body: rest,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightStatusChangeInvalidateTags(error, id),
      }),

      CancelFlight: builder.mutation<
        QueryResponse<void>,
        { id: string; remark: string }
      >({
        query: ({ id, ...rest }) => ({
          url: `${endpoint}/Flights/Cancel/${id}`,
          method: 'PUT',
          body: rest,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightStatusChangeInvalidateTags(error, id),
      }),

      ReopenFlight: builder.mutation<
        QueryResponse<void>,
        { id: string; remark: string }
      >({
        query: ({ id, ...rest }) => ({
          url: `${endpoint}/Flights/Reopen/${id}`,
          method: 'PUT',
          body: rest,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightStatusChangeInvalidateTags(error, id),
      }),

      DeleteFlight: builder.mutation<void, string>({
        query: id => ({
          url: `${endpoint}/Flights/Delete/${id}`,
          method: 'DELETE',
        }),

        invalidatesTags: (_, error, id) =>
          flightDeleteInvalidateTags(error, id),
      }),

      SearchAirports: builder.query<
        QueryResponse<TAirportItem[]>,
        { keyword: string }
      >({
        query: params => ({
          url: `${endpoint}/Airports/Search`,
          method: 'GET',
          params,
        }),
      }),
    }),
  });

export const flightBookingManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(FLIGHT_BOOKING_MANAGEMENT_TAGS),
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetFlightBookingList: builder.query<
        QueryResponse<TGetFlightBookingListResponse>,
        TGetFlightBookingListRequestParams
      >({
        query: params => ({
          url: `${endpoint}/Bookings`,
          method: 'GET',
          params,
        }),
        providesTags: (result, error) =>
          flightBookingListProvideTags(result, error),
      }),

      GetFlightBookingDetail: builder.query<
        QueryResponse<TGetFlightBookingDetailResponse>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Bookings/${id}`,
          method: 'GET',
        }),

        providesTags: (_, error, id) =>
          flightBookingDetailProvideTags(error, id),
      }),

      GetFlightBookingDetailLogs: builder.query<
        QueryResponse<TFlightBookingLogItem[]>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Bookings/${id}/Logs`,
          method: 'GET',
        }),
        providesTags: (_, error, id) =>
          flightBookingLogsProvideTags(error, id),
      }),

      CreateFlightBooking: builder.mutation<
        QueryResponse<string>,
        TCreateFlightBookingPayload
      >({
        query: payload => ({
          url: `${endpoint}/Bookings/Add`,
          method: 'POST',
          body: payload,
        }),

        invalidatesTags: (_, error) =>
          flightBookingCreateInvalidateTags(error),
      }),

      CancelBooking: builder.mutation<
        QueryResponse<void>,
        { id: string; remark: string }
      >({
        query: ({ id, ...rest }) => ({
          url: `${endpoint}/Bookings/Cancel/${id}`,
          method: 'PUT',
          body: rest,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightBookingUpdateInvalidateTags(error, id),
      }),

      IssueBooking: builder.mutation<
        QueryResponse<void>,
        { id: string; remark: string }
      >({
        query: ({ id, ...rest }) => ({
          url: `${endpoint}/Bookings/Issue/${id}`,
          method: 'PUT',
          body: rest,
        }),

        invalidatesTags: (_, error, { id }) =>
          flightBookingUpdateInvalidateTags(error, id),
      }),
    }),
  });

export const flightTicketConditionManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: Object.values(FLIGHT_TICKET_CONDITION_MANAGEMENT_TAGS),
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetFareRules: builder.query<QueryResponse<TGetFareRulesResponse>, void>({
        query: () => ({
          url: `${endpoint}/FareRules`,
          method: 'GET',
        }),

        providesTags: (result, error) => fareRulesProvideTags(result, error),
      }),

      GetFareRuleDetail: builder.query<
        QueryResponse<TGetFareRuleDetailResponse>,
        string
      >({
        query: id => ({
          url: `${endpoint}/FareRules/${id}`,
          method: 'GET',
        }),

        providesTags: (_, error, id) => fareRuleDetailProvideTags(error, id),
      }),

      CreateFareRule: builder.mutation<
        QueryResponse<void>,
        TCreateFareRulePayload
      >({
        query: payload => ({
          url: `${endpoint}/FareRules/Add`,
          method: 'POST',
          body: payload,
        }),

        invalidatesTags: (_, error) => fareRuleCreateInvalidateTags(error),
      }),

      UpdateFareRule: builder.mutation<
        QueryResponse<void>,
        TUpdateFareRulePayload
      >({
        query: ({ id, ...restPayload }) => ({
          url: `${endpoint}/FareRules/Update/${id}`,
          method: 'PUT',
          body: restPayload,
        }),

        invalidatesTags: (_, error, { id }) =>
          fareRuleUpdateInvalidateTags(error, id),
      }),

      DeleteFareRule: builder.mutation<void, string>({
        query: id => ({
          url: `${endpoint}/FareRules/Delete/${id}`,
          method: 'DELETE',
        }),

        invalidatesTags: (_, error, id) =>
          fareRuleDeleteInvalidateTags(error, id),
      }),
    }),
  });

//master data
export const {
  useSearchAirportsQuery,
  useGetAircraftsQuery,
  useGetAirlinesQuery,
  useGetAirlineClassesQuery,
} = flightMasterDataQueryApi;

//flight
export const {
  useGetFlightListQuery,
  useGetFlightStaticsQuery,
  useGetFlightDetailLogsQuery,
  useCreateFlightMutation,
  useGetFlightDetailQuery,
  useUpdateFlightMutation,
  usePublishFlightMutation,
  useCloseFlightMutation,
  useCancelFlightMutation,
  useReopenFlightMutation,
  useDeleteFlightMutation,
} = flightManagementQueryApi;

//booking
export const {
  useGetFlightBookingListQuery,
  useGetFlightBookingDetailQuery,
  useGetFlightBookingDetailLogsQuery,
  useCreateFlightBookingMutation,
  useCancelBookingMutation,
  useIssueBookingMutation,
} = flightBookingManagementQueryApi;

//fare rules
export const {
  useGetFareRulesQuery,
  useGetFareRuleDetailQuery,
  useLazyGetFareRuleDetailQuery,
  useCreateFareRuleMutation,
  useUpdateFareRuleMutation,
  useDeleteFareRuleMutation,
} = flightTicketConditionManagementQueryApi;
