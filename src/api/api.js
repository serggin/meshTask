const baseURL = 'http://ergast.com/api/f1/';

export const loadDrivers = (limit = 10, offset = 0) => {
  const url = baseURL + `drivers.json?limit=${limit}&offset=${offset}`;
  console.log('loadDrivers url=', url);
  // eslint-disable-next-line no-undef
  const request = new Request(url);

  return fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          console.error('error response=', text);
          throw new Error(text);
        });
      }
    })
    .then((text) => {
      //console.log('loadSearchPageData ok response=', JSON.parse(text));
      return JSON.parse(text);
    })
    .catch((error) => {
      console.error('in api loadDrivers fetch(): ', error);
      throw error;
    });
};

/*export const loadDriver = (driverId) => {
  const url = baseURL +
}*/

//https://next.json-generator.com/api/json/get/Ny2nSJTeK

export const loadTestJson = () => {
  const url = 'https://next.json-generator.com/api/json/get/Ny2nSJTeK';
  console.log('loadTestJson + url=', url);
  var headers = new Headers();
  headers.append('Accept', 'application/json');
  const requestInit = {
    headers: headers,
  };

  // eslint-disable-next-line no-undef
  const request = new Request(url, requestInit);

  return fetch(request)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((text) => {
          console.error('error response=', text);
          throw new Error(text);
        });
      }
    })
    .then((text) => {
      //console.log('loadSearchPageData ok response=', JSON.parse(text));
      return JSON.parse(text);
    })
    .catch((error) => {
      console.error('in api loadTestJson fetch(): ', error);
      throw error;
    });
};
