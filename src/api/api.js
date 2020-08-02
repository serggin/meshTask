const baseURL = 'http://ergast.com/api/f1/';

export const loadDrivers = (limit = 10, offset = 0) => {
  const url = baseURL + `drivers.json?limit=${limit}&offset=${offset}`;
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
      return JSON.parse(text);
    })
    .catch((error) => {
      console.error('in api loadDrivers fetch(): ', error);
      throw error;
    });
};

export const loadDriverRacers = (driverId, limit = 5, offset = 0) => {
  const url =
    baseURL +
    `drivers/${driverId}/results.json?limit=${limit}&offset=${offset}`;
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
      return JSON.parse(text);
    })
    .catch((error) => {
      console.error('in api loadDriverRacers fetch(): ', error);
      throw error;
    });
};
