export interface FlightSegment {
  airline: string;
  flightNumber: string;
  plane: string;
  flightTime?: string;
  startPoint?: string;
  startDate?: string;
  startTime?: string;
  endPoint?: string;
  endDate?: string;
  endTime?: string;
}

export interface FlightRule {
  ruleType?: string;
  ruleDescription?: string;
}

export interface FlightFormValues {
  airline: string;
  flightNumber: string;
  status: string;
  plane: string;
  class: string;
  seatTotal: string | number;
  flightTime?: string;
  startPoint?: string;
  startDate?: string;
  startTime?: string;
  endPoint?: string;
  endDate?: string;
  endTime?: string;
  segments: FlightSegment[];
  adultPrice: string | number;
  childPrice: string | number;
  infantPrice: string | number;
  flightRules: FlightRule[];
}
