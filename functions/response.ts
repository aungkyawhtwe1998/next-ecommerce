export const handleResponse = (res: any) => {
    if (res.results) {
      return res.results;
    }
    if (res.data) {
      return res.data;
    }
  };
  
  export const handleError = (error: any) => {
    if (error.response.data.message) {
      return error.response.data.message;
    }
    if (error.message) {
      return error.message;
    }
    if (error.data) {
      return error.data;
    }
  };