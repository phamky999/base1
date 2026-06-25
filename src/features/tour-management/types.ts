export type TGetTourCategoryListParams = {
  code?: string;
  name?: string;
  page?: number;
  pageSize?: number;
};

export type TCategoryListItem = {
  id: string;
  code: string;
  name: string;
};

export type TGetTourCategoryListResponse = {
  categories: TCategoryListItem[];
  totalCount: number;
};

export type TCreateCategoryParams = {
  code: string;
  name: string;
};

export type TUpdateCategoryParams = {
  code: string;
  name: string;
};

export type TTourType = 'DAILY' | 'WEEKLY' | 'SINGLE_DAY' | 'MULTI_DAY';

export type TItineraryItem = {
  title: string;
  content: string;
};

export type TCreateTourPayload = {
  tourRouteId: string;
  programName: string;
  departurePoint: string;
  destinationPoints: string[];
  tourType: TTourType;
  departureDayOfWeek?: number;
  departureDate?: string;
  departureDates?: string[];
  numberOfDays: number;
  numberOfNights: number;
  noteIds?: string[];
  holdTime: number;
  seatCount: number;
  transportation?: string;
  sightseeing?: string;
  cuisine?: string;
  promotions?: string;
  bestTimeToVisit?: string;
  suitableFor?: string;
  hotel?: string;
  adultPrice: number;
  childPrice: number;
  infantPrice: number;
  privateRoomPrice: number;
  paymentMethod?: string;
  itinerary?: TItineraryItem[];
};

export type TTour = TCreateTourPayload & {
  id: string;
  createdAt: string;
};

export type TGetTourListParams = {
  programName?: string;
  page?: number;
  pageSize?: number;
};
