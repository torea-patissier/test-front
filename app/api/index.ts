export const API_URL = `${process.env.LOCAL_API_URL}/api`;

export const PARAMS = {
  ID: ':id',
};

export const API_ROUTES = {
  SOLUTIONS: {
    GET: '/solutions',
    GET_BY_ID: `solutions/${PARAMS.ID}`,
    POST: '/solutions',
    PUT: '/solutions',
    DELETE: '/solutions',
    DELETE_BY_ID: `solutions/${PARAMS.ID}`,
  },
  ALGORITHMS: {
    POST: '/calculateSolutions',
  },
};
