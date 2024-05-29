//takes url string, method -> GET | POST | PUT | DELETE and optional body and returns a promise in format {data, error};
export const apiRequest = (url: string, method: string, body: any = null) => {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => ({ data, error: null }))
    .catch((error) => ({ data: null, error: error.message }));
};

//takes any string in any format 'name' and returns string in format 'Name'
export const startCase = (name: string): string => {
  if (!name || name === "") return "";
  const formattedName = name[0].toUpperCase() + name.substring(1).toLowerCase();
  return formattedName;
};

//takes any date of format Date and returns string of format 'DD-MM-YYYY'
export const formatDDMMYY = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

//takes date in string format 'DD-MM-YYYY' and returns Date format
export const formatDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

//generates uuidv4
export const uuidv4 = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

//validates email format and returns boolean
export const validateEmail = (email: string): boolean => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
};
