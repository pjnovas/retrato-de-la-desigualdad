
import request from "superagent";
import { SectionActions } from "../actions";

class SectionAPI {

  constructor(){
    this.uri = "/api/sections";
    this.type = "Section";
  }

  getAll(){
    request
      .get(this.uri)
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }
        
        SectionActions.receive(res.body.items);
      });
  }

  errorHandler(err, type){
    if (err) {
      SectionActions.error({
        api: this.type,
        type,
        status: err.status,
        response: err.response,
        body: err.response.body,
        text: err.response.text,
      });

      return true;
    }
  }

}

const instance = new SectionAPI();
export default instance;

export const API = SectionAPI;
