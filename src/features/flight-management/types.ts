import type { TCustomExtraOptions } from '@/app/redux/types';
import type {
  FARE_RULE_TYPE,
  FLIGHT_BOOKING_ACTION,
  FLIGHT_BOOKING_STATUS,
  FLIGHT_DETAIL_ACTION,
  FLIGHT_ITINERARY_TYPE,
  FLIGHT_STATUS,
} from '@/features/flight-management/constants';
import type { TGender, TPaginationRequest } from '@/lib/types';
import type { ReactElement } from 'react';

export type TFlightStatus = (typeof FLIGHT_STATUS)[keyof typeof FLIGHT_STATUS];

export type TFareRuleType =
  (typeof FARE_RULE_TYPE)[keyof typeof FARE_RULE_TYPE];

export type TFlightBookingStatus =
  (typeof FLIGHT_BOOKING_STATUS)[keyof typeof FLIGHT_BOOKING_STATUS];

export type TFlightDetailAction =
  (typeof FLIGHT_DETAIL_ACTION)[keyof typeof FLIGHT_DETAIL_ACTION];

export type TFlightBookingAction =
  (typeof FLIGHT_BOOKING_ACTION)[keyof typeof FLIGHT_BOOKING_ACTION];

export type TFlightItineraryType =
  (typeof FLIGHT_ITINERARY_TYPE)[keyof typeof FLIGHT_ITINERARY_TYPE];

export type TAirlineItem = {
  code: string;
  name: string;
};

export type TAirlineClassItem = {
  bookingClass: string;
  cabinClass: string;
  airlineCode: string;
};

export type TAircraftItem = {
  icaoCode: string;
  iataCode: string;
  name: string;
};

export type TGetAirlineClassesResponse = Record<string, TAirlineClassItem[]>;

export type TAirportItem = {
  code: string;
  name: string;
  cityCode: string;
  cityName: string;
  countryCode: string;
  countryName: string;
};

export type TCreateFlightSegmentItem = {
  airlineCode: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  flightNumber: string;
  seatClass: string;
  plane: string;
  duration: number;
};

export type TCreateFlightPayload = {
  airlineCode: string;
  bookingCode: string;
  seatTotal: number;
  fareRules: Array<{
    type: TFareRuleType;
    text: string;
  }>;
  timeLimit: number;
  closingDaysBeforeDeparture: number;
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  departureSegments: Array<TCreateFlightSegmentItem>;
  returnSegments?: Array<TCreateFlightSegmentItem>;
  itineraryType: TFlightItineraryType;
};

export type TCreateFlightMutationArg = {
  payload: TCreateFlightPayload;
  extraOptions?: TCustomExtraOptions;
};

export type TCreateFlightResponse = {
  id: string;
  bookingCode: string;
  segmentCount: number;
};

export type TGetFlightListRequestParams = TPaginationRequest & {
  status?: TFlightStatus;
  airlineCode?: string;
  bookingCode?: string;
  startPoint?: string;
  endPoint?: string;
  flightNumber?: string;
  transactionCode?: string;
};

export type TFlightListItem = {
  id: string;
  status: TFlightStatus;
  airlineCode: string;
  airlineName: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  bookingCode: string;
  seatTotal: number;
  seatAvailable: number;
  flightNumbers: string[];
  seatClasses: string[];
  planes: string[];
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  bookingTotalCount: number;
  bookingHoldCount: number;
  bookingIssuedCount: number;
  createdAt: string;
  updatedAt: string;
  allowedStatuses: TFlightStatus[];
  allowedActions: TFlightDetailAction[];
  itineraryType: TFlightItineraryType;
  transactionCode: string; //Mã định dạng chuyến bay => dùng cho search
};

export type TGetFlightListResponse = {
  items: TFlightListItem[];
  totalItems: number;
};

export type TFlightSegment = {
  airlineCode: string;
  airlineName: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  flightNumber: string;
  seatClass: string;
  plane: string;
  duration: number;
};

export type TFareRule = {
  type: TFareRuleType;
  text: string;
};

export type TGetFlightDetailResponse = {
  id: string;
  status: TFlightStatus;
  airlineCode: string;
  airlineName: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  bookingCode: string;
  seatTotal: number;
  seatAvailable: number;
  flightNumbers: string[];
  seatClasses: string[];
  planes: string[];
  fareRules: Array<TFareRule>;
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
  timeLimit: number;
  closingDaysBeforeDeparture: number;
  userId: string;
  userName: string;
  providerCode: string;
  createdAt: string;
  updatedAt: string;
  bookingTotalCount: number;
  bookingHoldCount: number;
  bookingIssuedCount: number;
  departureSegments: Array<TFlightSegment>;
  returnSegments?: Array<TFlightSegment>;
  allowedStatuses: TFlightStatus[];
  allowedActions: TFlightDetailAction[];
  itineraryType: TFlightItineraryType;
  transactionCode: string; //Mã định dạng chuyến bay => dùng cho search
};

export type TUpdateFlightPayload = TCreateFlightPayload & {
  id: string;
};
export type TUpdateFlightResponse = TCreateFlightResponse;

type TFlightActionVisibleContext = {
  can: (action: TFlightDetailAction) => boolean;
};

export type TFlightDetailActionConfig = {
  label: string;
  icon: ReactElement;
  visible: (ctx: TFlightActionVisibleContext) => boolean;
  danger?: boolean;
};

export type TFlightBookingListItem = {
  id: string;
  flightId: string;
  status: TFlightBookingStatus;
  airlineCode: string;
  airlineName: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  bookingCode: string;
  userId: string | null;
  userName: string | null;
  providerCode: string;
  merchantCode: string;
  merchantName: string;
  adult: number;
  children: number;
  infant: number;
  totalPrice: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  lastTicketDate: string;
  createdAt: string;
  updatedAt: string;
  allowedStatuses: TFlightBookingStatus[];
  allowedActions: TFlightBookingAction[];
  transactionCode: string; //Mã định dạng flight booking => dùng cho search
  flightTransactionCode: string;
};

export type TGetFlightStaticsResponse = {
  totalFlights: number;
  totalActiveFlights: number;
  totalSeats: number;
  totalAvailableSeats: number;
};

export type TGetFlightBookingListRequestParams = TPaginationRequest & {
  status?: TFlightBookingStatus;
  airlineCode?: string;
  bookingCode?: string;
  startPoint?: string;
  endPoint?: string;
  flightId?: string;
  flightDate?: string;
  transactionCode?: string;
  merchantCode?: string;
};

export type TGetFlightBookingListResponse = {
  items: TFlightBookingListItem[];
  totalItems: number;
};

export type TGetFlightBookingDetailPassenger = {
  index?: number;
  id: string;
  bookingId: string;
  flightId: string;
  type: string;
  gender: TGender;
  firstName: string;
  lastName: string;
  birthday: string | null;
  documentNumber: string;
  documentExpiryDate: string | null;
  documentNationality: string | null;
  documentIssuingCountry: string | null;
};
export type TGetFlightBookingDetailResponse = {
  id: string;
  flightId: string;
  status: TFlightBookingStatus;
  airlineCode: string;
  airlineName: string;
  startPoint: string;
  endPoint: string;
  startDate: string;
  endDate: string;
  bookingCode: string;
  userId: string | null;
  userName: string | null;
  providerCode: string;
  merchantCode: string;
  merchantName: string;
  adult: number;
  children: number;
  infant: number;
  totalPrice: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  lastTicketDate?: string;
  createdAt?: string;
  updatedAt?: string;
  passengers: Array<TGetFlightBookingDetailPassenger>;
  transactionCode: string; //Mã định dạng flight booking => dùng cho search
  allowedStatuses: TFlightBookingStatus[];
  allowedActions: TFlightBookingAction[];
  flightTransactionCode?: string;
};

export type TFlightDetailLogItem = {
  action: TFlightDetailAction;
  userId: string;
  userName: string;
  note: string;
  createdAt: string;
};

export type TFlightBookingLogItem = {
  action: TFlightBookingAction;
  userId: string;
  userName: string;
  merchantCode: string;
  merchantName: string;
  note: string;
  createdAt: string;
};

export type TCreateFareRulePayload = {
  name: string;
  airlineCode: string;
  rules: {
    type: TFareRuleType;
    text: string;
  }[];
};

export type TUpdateFareRulePayload = TCreateFareRulePayload & {
  id: string;
};

export type TGetFareRuleDetailResponse = {
  id: string;
  providerCode: string;
  name: string;
  airlineCode: string;
  rules: {
    type: TFareRuleType;
    text: string;
  }[];
};

export type TGetFareRulesResponse = Omit<TGetFareRuleDetailResponse, 'rules'>[];

export type TFlightExcelImportRow = {
  stt?: string;
  airlineCode?: string;
  bookingCode?: string;
  seatTotal?: string | number;
  timeLimit?: string | number;
  closingDaysBeforeDeparture?: string | number;
  priceAdult?: string | number;
  priceChild?: string | number;
  priceInfant?: string | number;
  itinerary?: string;
  departure?: {
    date?: string;
    time?: string;
    arrDate?: string;
    arrTime?: string;
    flightNum?: string;
    seatClass?: string;
    plane?: string;
  };
  return?: {
    date?: string;
    time?: string;
    arrDate?: string;
    arrTime?: string;
    flightNum?: string;
    seatClass?: string;
    plane?: string;
  };
};

export type TParsedFlightFromExcelData = {
  id: string;
  rowRaw: TFlightExcelImportRow;
  rules: Array<{
    label: string;
    text: string;
  }>;
  errors: string[];
  isValid: boolean;
  payload: TCreateFlightPayload | null;
};

export type TImportResultDetailItem = {
  bookingCode: string;
  success: boolean;
  error?: string;
};

export type TImportResult = {
  success: number;
  fail: number;
  details: Array<TImportResultDetailItem>;
};

export type TCreateFlightBookingPayload = {
  flightId: string;
  merchantCode: string;
  passengers: Array<{
    index?: number;
    type: string;
    gender: TGender;
    firstName: string;
    lastName: string;
    birthday: string | null;
    documentExpiryDate: string | null;
    documentIssuingCountry: string | null;
    documentNationality: string | null;
    documentNumber: string | null;
  }>;
  contactInfo: {
    gender: TGender;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    email: string;
  };
};

type TFlightBookingActionVisibleContext = {
  can: (action: TFlightBookingAction) => boolean;
};

export type TFlightBookingActionConfig = {
  label: string;
  icon: ReactElement;
  visible: (ctx: TFlightBookingActionVisibleContext) => boolean;
  danger?: boolean;
};

export type TFlightScheduleUpdatePayload = {
  remark: string;
  segments: Array<{
    segmentId: string;
    startDate: string; // 'DD/MM/YYYY HH:mm:ss'
    endDate: string; // 'DD/MM/YYYY HH:mm:ss'
    duration: number;
  }>;
};

export type TUpdateInventoryPayload = {
  remark: string;
  seatTotal: string;
  priceAdult: number;
  priceChild: number;
  priceInfant: number;
};
