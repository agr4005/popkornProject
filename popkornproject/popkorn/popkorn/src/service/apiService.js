import { API_BASE_URL } from "./app-config";
import axios from "axios";

export async function apiCall(url, method, requestData, token) {

  let headers = '';
  if (url.indexOf('productSave') >= 0 || url.indexOf('eventSave') >= 0 || url.indexOf('celebSave') >= 0) {
    headers = { 'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + token  };
  } else if (token !== null) {
    headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    };
  } else {
    headers = { 'Content-Type': 'application/json' };
  }

  // 1.2) axios 전송 options
  let options = {
    url: API_BASE_URL + url,
    method: method,
    headers: headers,
  };

  // 1.3) 전송 Data(requestData) 있는 경우 data 속성 추가
  if (requestData) {
    options.data = requestData;
  }

  // 2. Axios 요청
  return axios(options)
    .then(response => {
      return response;
    }).catch(err => {
      console.error(`** apiCall Error status=${err.response}, message=${err.message}`);
      console.log(options)
      return Promise.reject(err.response.status);
    }); //catch
} //apiCall