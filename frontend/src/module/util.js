import axios from "axios";
import React from "react";
import { toast } from "react-toastify";


export const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      data: data ? data : new FormData(),
      url: url,
    }).then((response) => {
      resolve(response.data);
    }).catch(e => {
      console.log(e)
      reject(e);
    })
  });
}
export const sendAlert = (msg, status) => {
  const option = {
    position: "bottom-right",
    style: { direction: "rtl", 'text-align': 'right', fontFamily: "IRANSansX", 'white-space': 'pre-line' },
    theme: 'colored'
  };
  if (status === 'success')
    toast.success(msg, option);
  else
    toast.error(msg, option);
}