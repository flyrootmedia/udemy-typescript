import axios, { AxiosPromise } from 'axios';

interface HasId {
  id?: number;
}

// use a generic constraint to make sure T has an ID
export class ApiSync<T extends HasId> {
  constructor(public rootUrl: string) {}

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }

  save(data: T): AxiosPromise {
    // added tsconfig to get strict mode (specifically "strictNullChecks"), 
    // which tells TS to annotate "id" as number | undefined rather than just number
    const { id } = data;

    if (id) {
      // update existing record
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      // create new record
      return axios.post(this.rootUrl, data);
    }
  }
}