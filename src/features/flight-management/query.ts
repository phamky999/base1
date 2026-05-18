import { baseApi } from '@/app/redux/baseApi';
import { invalidatesTags, QUERY_TAGS } from '@/app/redux/constants';
import type { QueryResponse } from '@/app/redux/types';
import type {
  TAirportItem,
  TCreateFlightPayload,
  TCreateFlightResponse,
  TFlightBookingLogItem,
  TFlightDetailLogItem,
  TGetFlightBookingDetailResponse,
  TGetFlightBookingListRequestParams,
  TGetFlightBookingListResponse,
  TGetFlightDetailResponse,
  TGetFlightListRequestParams,
  TGetFlightListResponse,
  TGetFlightStaticsResponse,
  TUpdateFlightPayload,
  TUpdateFlightResponse,
} from '@/features/flight-management/types';

const endpoint = '/FlightInventory';

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
        query: () => ({
          url: `${endpoint}/Flights/Statistics`,
          method: 'GET',
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
        TCreateFlightPayload
      >({
        query: payload => ({
          url: `${endpoint}/Flights/Add`,
          method: 'POST',
          body: payload,
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

      GetFlightBookingList: builder.query<
        QueryResponse<TGetFlightBookingListResponse>,
        TGetFlightBookingListRequestParams
      >({
        query: params => ({
          url: `${endpoint}/Bookings`,
          method: 'GET',
          params,
        }),
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
    }),
  });

export const {
  //flight
  useSearchAirportsQuery,
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
  //booking
  useGetFlightBookingListQuery,
  useGetFlightBookingDetailQuery,
  useGetFlightBookingDetailLogsQuery,
} = flightManagementQueryApi;
