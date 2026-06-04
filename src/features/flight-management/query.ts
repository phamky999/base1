import { baseApi } from '@/app/redux/baseApi';
import { invalidatesTags, QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
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
    addTagTypes: [
      QUERY_TAGS.FLIGHT_LIST,
      QUERY_TAGS.FLIGHT_DETAIL,
      QUERY_TAGS.FLIGHT_DETAIL_LOGS,
    ],
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

        providesTags: [QUERY_TAGS.FLIGHT_LIST],
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
      }),

      GetFlightDetail: builder.query<
        QueryResponse<TGetFlightDetailResponse>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Flights/${id}`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.FLIGHT_DETAIL],
      }),

      GetFlightDetailLogs: builder.query<
        QueryResponse<TFlightDetailLogItem[]>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Flights/${id}/Logs`,
          method: 'GET',
        }),
        providesTags: [QUERY_TAGS.FLIGHT_DETAIL_LOGS],
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.FLIGHT_LIST]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FLIGHT_LIST,
          QUERY_TAGS.FLIGHT_DETAIL,
          QUERY_TAGS.FLIGHT_DETAIL_LOGS,
        ]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FLIGHT_LIST,
          QUERY_TAGS.FLIGHT_DETAIL,
          QUERY_TAGS.FLIGHT_DETAIL_LOGS,
        ]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FLIGHT_LIST,
          QUERY_TAGS.FLIGHT_DETAIL,
          QUERY_TAGS.FLIGHT_DETAIL_LOGS,
        ]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FLIGHT_LIST,
          QUERY_TAGS.FLIGHT_DETAIL,
          QUERY_TAGS.FLIGHT_DETAIL_LOGS,
        ]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FLIGHT_LIST,
          QUERY_TAGS.FLIGHT_DETAIL,
          QUERY_TAGS.FLIGHT_DETAIL_LOGS,
        ]),
      }),

      DeleteFlight: builder.mutation<void, string>({
        query: id => ({
          url: `${endpoint}/Flights/Delete/${id}`,
          method: 'DELETE',
        }),

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FLIGHT_LIST,
          QUERY_TAGS.FLIGHT_DETAIL,
        ]),
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
    addTagTypes: [QUERY_TAGS.FLIGHT_BOOKING_LIST],
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
        providesTags: [QUERY_TAGS.FLIGHT_BOOKING_LIST],
      }),

      GetFlightBookingDetail: builder.query<
        QueryResponse<TGetFlightBookingDetailResponse>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Bookings/${id}`,
          method: 'GET',
        }),
      }),

      GetFlightBookingDetailLogs: builder.query<
        QueryResponse<TFlightBookingLogItem[]>,
        string
      >({
        query: id => ({
          url: `${endpoint}/Bookings/${id}/Logs`,
          method: 'GET',
        }),
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.FLIGHT_BOOKING_LIST]),
      }),
    }),
  });

export const flightTicketConditionManagementQueryApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [QUERY_TAGS.FARE_RULES, QUERY_TAGS.FARE_RULE_DETAIL],
  })
  .injectEndpoints({
    endpoints: builder => ({
      GetFareRules: builder.query<QueryResponse<TGetFareRulesResponse>, void>({
        query: () => ({
          url: `${endpoint}/FareRules`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.FARE_RULES],
      }),

      GetFareRuleDetail: builder.query<
        QueryResponse<TGetFareRuleDetailResponse>,
        string
      >({
        query: id => ({
          url: `${endpoint}/FareRules/${id}`,
          method: 'GET',
        }),

        providesTags: [QUERY_TAGS.FARE_RULE_DETAIL],
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

        invalidatesTags: invalidatesTags([QUERY_TAGS.FARE_RULES]),
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

        invalidatesTags: invalidatesTags([
          QUERY_TAGS.FARE_RULES,
          QUERY_TAGS.FARE_RULE_DETAIL,
        ]),
      }),

      DeleteFareRule: builder.mutation<void, string>({
        query: id => ({
          url: `${endpoint}/FareRules/Delete/${id}`,
          method: 'DELETE',
        }),

        invalidatesTags: invalidatesTags([QUERY_TAGS.FARE_RULES]),
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
