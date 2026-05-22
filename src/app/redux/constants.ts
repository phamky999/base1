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
  ACCOUNT_LIST: 'ACCOUNT_LIST',
  ACCOUNT_DETAIL: 'ACCOUNT_DETAIL',
  MERCHANT_LIST: 'MERCHANT_LIST',
  MERCHANT_DETAIL: 'MERCHANT_DETAIL',
  MERCHANT_CREDENTIALS: 'MERCHANT_CREDENTIALS',
  EMAIL_CONFIG: 'EMAIL_CONFIG',
} as const;
