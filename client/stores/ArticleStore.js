
import Immutable from "immutable";

import { convertPathToTitle, removeAccents } from "../utils";

import { AppDispatcher } from "../dispatcher";
import { ArticleConstants } from "../constants";
import { ArticleAPI } from "../api";

import { ReduceStore } from "flux/utils";

class ArticleStore extends ReduceStore {

  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    switch (action.type) {
      case ArticleConstants.FIND:
        ArticleAPI.getBySection(action.section);
        break;

      case ArticleConstants.RECEIVE:
        return Immutable.List(action.articles);

      case ArticleConstants.ERROR:
        console.error(action.data);
        return state;
    }

    return state;
  }

  getArray(){
    return this.getState().toArray();
  }

  getByNumber(number){
    let list = this.getArray();

    let article;
    list.some( _article => {
      if (_article.number === number) {
        article = _article;
        return true;
      }
      return false;
    });

    return article;
  }

  getNumberFromUrl(path){
    if (!isNaN(+path)) { // is the number
      return path;
    }

    let list = this.getArray();
    let title = convertPathToTitle(path);
    let result;
    list.some( article => {
      if (removeAccents(article.title) === title) {
        result = article.number;
        return true;
      }
      return false;
    });

    return result;
  }

}

export default new ArticleStore(AppDispatcher);
