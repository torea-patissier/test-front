// const ROOT_URL = 'http://localhost:8086/api'; // for simulator
const ROOT_URL = 'http://192.168.1.9:8086/api'; // for real device

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
