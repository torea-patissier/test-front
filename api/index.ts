import { Platform } from 'react-native';

const ROOT_URL =
  Platform.select({
    ios: 'http://localhost:8086/api',
    android: 'http://10.0.2.2:8086/api',
  }) ?? 'http://localhost:8086/api';

const PARAMS = {
  ID: ':id',
  IS_ALGO_GENERATED: ':isAlgoGenerated',
};

export const API_ROUTES = {
  SOLUTIONS: {
    GET: `${ROOT_URL}/solutions`,
    GET_BY_ID: `${ROOT_URL}/solutions/${PARAMS.ID}`,
    FILTER: `${ROOT_URL}/solutions/filter?isAlgoGenerated=${PARAMS.IS_ALGO_GENERATED}`,
    POST: `${ROOT_URL}/solutions`,
    PUT: `${ROOT_URL}/solutions`,
    DELETE: `${ROOT_URL}/solutions`,
    DELETE_BY_ID: `${ROOT_URL}/solutions/${PARAMS.ID}`,
  },
  ALGORITHMS: {
    GET: `${ROOT_URL}/solutions/algorithm`,
  },
};
