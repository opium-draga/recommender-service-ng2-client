
export interface ResponseModel {
  success: boolean;
  data: any[];
  error: any;
}

export class APIResponse {

  constructor(private response: ResponseModel) {
  }

  getData() {
    return this.response.data;
  }

  setData(data: any[]) {
    this.response.data = data;
  }

  getFirst() {
    return this.response.data[0];
  }

  isSuccess() {
    return this.response.success;
  }

  getError() {
    if(typeof this.response.error === "string") {
      return this.response.error
    } else {
      return this.response.error[Object.keys(this.response.error)[0]];
    }
  }
}