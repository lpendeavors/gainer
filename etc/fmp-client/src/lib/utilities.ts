import axios from "axios";
import auth from "./auth";

const baseURL = 'https://financialmodelingprep.com/api/v3/';

interface Parameters {
  query?: any;
  path?: string | Array<string>;
  urlPath: string;
};

const url = (params: Parameters): string => {
  let queryParameters = params.query;
  let pathParameters = params.path;
  let urlPath = params.urlPath;
  let url = baseURL;
  let queryString = '';
  let apiKey = auth.key;

  url += urlPath;

  if (pathParameters) {
    if (pathParameters instanceof Array) {
      pathParameters = pathParameters.join(',');
    }
    pathParameters = pathParameters.toUpperCase();
    url += '/' + pathParameters;
  }

  if (queryParameters) {
    for (const key in queryParameters) {
      if (queryParameters[key] !== undefined) {
        queryString += `${key}=${queryParameters[key]}&`;
      }
    }

    if (queryString) {
      queryString = queryString.slice(0, -1);
      url += '?' + queryString;
    }
  }

  if (!queryString) {
    url += '?'
  } else {
    url += '&'
  }

  url += `apikey=${apiKey}`;

  return url;
}

export const generateJson = (pathParam: string | null, queryParam: object = {}) => {
  return {
    query: queryParam,
    path: pathParam
  }
}

export const makeRequest = (path: string, params: object = {}) => axios
  .get(url(Object.assign({}, params, { urlPath: path })))
  .then(response => response.data)
  .catch(err => err.response);