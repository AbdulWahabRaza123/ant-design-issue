import { useEffect, useState } from "react";
import axiosInstance from "../../services/interceptors/axiosInstance";
import Swal from 'sweetalert2';
import { useTranslation } from "@/app/i18n/index";
import i18n from "@/app/i18n/index";
import i18nConfig from "../../../../../i18next.config";
import i18nIndex from "@/app/i18n/index";
import Cookies from "js-cookie";

let getLang;

export const fetchData = (url, optionalParams = {}) => {
  getLang = getCurrentlang();
  return axiosInstance.get(getLang !== "en" ? url + '?locale=' + getLang : url, { params: optionalParams })
    .then(response => {
      return response;
    })
    .catch(error => {
    });

};

const getCurrentlang = () => {
  return Cookies.get('lng');
};

export const postData = (url, data, file, optionalParams = {}, is_object = false, object_name = '', showalert = true) => {
  const { files = {}, ...restParams } = optionalParams;
  const formData = new FormData();

  let providers = [];

  Object.keys(data).forEach((key) => {
    if (is_object === true) {
      let providerObject = {};

      Object.keys(data[key]).forEach((k) => {
        providerObject[k] = data[key][k];
      });

      providers.push(providerObject);
      formData.append(object_name, JSON.stringify(providers));
    }
    else {
      formData.append(key, data[key]);
    }
  });

  getLang = getCurrentlang();
  let localeUrl = `${url}?locale=${getLang}`

  if (getLang != "en") {
    return axiosInstance.post(localeUrl, formData, { params: restParams }, { headers: { "Content-Type": "multipart/form-data" } })
      .then(response => {
        if (showalert)
          successAlert("Saved", response.data.message);
        return response;
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          return error.response.data;   // Throw the validation error message
        }
        else {
          throw error;
        }
      });
  };

  if (getLang == "en") {
    return axiosInstance.post(url, formData, { params: restParams }, { headers: { "Content-Type": "multipart/form-data" } })
      .then(response => {
        if (showalert)
        successAlert("Saved", response.data.message);
      return response;
        
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          return error.response.data;   // Throw the validation error message
        }
        else {
          throw error;
        }
      });
  }
}

export const successAlert = (title, msg) => {
  Swal.fire({
    title: title,
    text: msg,
  })
};

export const validationAlert = (title, msg) => {
  Swal.fire({
    title: title,
    text: msg,
  })
};

export const useFormState = (initialState) => {
  const removeElement = (data, name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: prevData[name].filter((item) => item !== value)
    }));
  };

  const handleChange = (e) => {
    const { name, value, type = null, checked = null, options = null } = e.target;

    setFormData((prevData) => {
      if (type === 'select-multiple') {
        // Check if the name already exists in the formData and convert it to an array
        const updatedValue = Array.isArray(prevData[name])
          ? value
          : [value];

        return {
          ...prevData,
          [name]: [updatedValue],
        };
      }
      else if (type === 'radio') {
        return {
          ...prevData,
          [name]: value,
        };

      } else {
        return {
          ...prevData,
          [name]: value,

        };


      }
    });
    // if (type === 'select-multiple') {
    //   setFormData((prevData) =>
    //   ({
    //     ...prevData,
    //     [name]: [value]
    //   }))

    // } else {
    //   const newValue = type === 'radio' ? checked : value;
    //   setFormData((prevData) =>
    //   ({
    //     ...prevData,
    //     [name]: value
    //   }))
    // }
  };

  const [formData, setFormData] = useState(initialState);
  return { formData, handleChange };
};



