import {
  AUTH_MANAGEMENT_TAGS,
  AUTH_MANAGEMENT_TAG_IDS,
} from './query.tags';

export const userDetailProvideTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: AUTH_MANAGEMENT_TAGS.USER,
          id: AUTH_MANAGEMENT_TAG_IDS.ME,
        },
      ];

export const userDetailInvalidateTags = (error: unknown) =>
  error
    ? []
    : [
        {
          type: AUTH_MANAGEMENT_TAGS.USER,
          id: AUTH_MANAGEMENT_TAG_IDS.ME,
        },
      ];
