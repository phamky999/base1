export type QueryTagValue = (typeof QUERY_TAGS)[keyof typeof QUERY_TAGS];
export type QueryTagArray = QueryTagValue[];

export const invalidatesTags = (tags: QueryTagArray) => (result: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (result ? tags : []) as any;
};

export const QUERY_TAGS = {
  USER_DETAIL: 'USER_DETAIL',
  FLIGHT_LIST: 'FLIGHT_LIST',
  FLIGHT_DETAIL: 'FLIGHT_DETAIL',
  FLIGHT_DETAIL_LOGS: 'FLIGHT_DETAIL_LOGS',
  FARE_RULES: 'FARE_RULES',
  FARE_RULE_DETAIL: 'FARE_RULE_DETAIL',
  USER_MANAGEMENT_LIST: 'USER_MANAGEMENT_LIST',
} as const;
