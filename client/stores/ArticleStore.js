
import Immutable from "immutable";

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

}

export default new ArticleStore(AppDispatcher);
