const ROOT_URL = 'http://localhost:9090/api';

const PARAMS = {
  ID: ':id',
};

export const API_ROUTES = {
  SOLUTIONS: {
    GET: `${ROOT_URL}/solutions`,
    GET_BY_ID: `${ROOT_URL}/solutions/${PARAMS.ID}`,
    POST: `${ROOT_URL}/solutions`,
    PUT: `${ROOT_URL}/solutions`,
    DELETE: `${ROOT_URL}/solutions`,
    DELETE_BY_ID: `${ROOT_URL}/solutions/${PARAMS.ID}`,
  },
  ALGORITHMS: {
    GET: `${ROOT_URL}/solutions/algorithm`,
  },
};
