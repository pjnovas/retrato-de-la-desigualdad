import request from "superagent";
import { ArticleActions } from "../actions";

class ArticleAPI {

  constructor(){
    this.uri = "/api/sections/{section}/articles";
    this.type = "Article";
  }

  getBySection(section){
    request
      .get(this.uri.replace("{section}", section))
      .end( (err, res) => {
        if (this.errorHandler(err, "find")){
          return;
        }

        ArticleActions.receive(res.body);
      });
  }

  errorHandler(err, type){
    if (err) {
      ArticleActions.error({
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

const instance = new ArticleAPI();
export default instance;

export const API = ArticleAPI;
