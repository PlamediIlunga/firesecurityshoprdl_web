
export default interface UserItem{
    "idUser":number,
    "email": string,
    "password": string,
    "points": number,
    "firstName": string,
    "lastName": string,
    "address": string,
    "city": string,
    "province": string,
    "country": string,
    "isAdministrator": boolean,
    "isArchived": boolean,
    "orders": []
  }