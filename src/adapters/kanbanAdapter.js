import api from "./api";

export function getRequest(URL) {
    return api.get(`/${URL}`).then(response => response);
  }
  
  export function postRequest(URL, payload) {
    return api.post(`/${URL}`, payload).then(response => response);
  }
  
  export function putRequest(URL, payload) {
    return api.put(`/${URL}`, payload).then(response => response);
  }
  
  export function deleteRequest(URL, id) {
    return api.delete(`/${URL}/${id}`).then(response => response);
  }