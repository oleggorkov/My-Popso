const SetInLocalstorage = (key, data) => {
  const ParsedData = JSON.stringify(data);

  localStorage.setItem(key, ParsedData);
};

const GetDataInLocalStorage = (key) => {
  const data = localStorage.getItem(key);

  if (data !== null && data !== undefined){
    return JSON.parse(data);
  } else {
    return false;
  }
};

const RemoveFromLocalstorage = (key) => {
  delete localStorage[key]
};

export {SetInLocalstorage, GetDataInLocalStorage, RemoveFromLocalstorage};
