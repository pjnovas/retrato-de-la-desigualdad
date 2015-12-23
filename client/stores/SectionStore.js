
import Immutable from "immutable";

import { AppDispatcher } from "../dispatcher";
import { SectionConstants } from "../constants";
import { SectionAPI } from "../api";

import { ReduceStore } from "flux/utils";

class SectionStore extends ReduceStore {

  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
    let t;

    switch (action.type) {
      case SectionConstants.FIND:
        SectionAPI.getAll();
        break;

      case SectionConstants.RECEIVE:
        return Immutable.List(action.sections);

      case SectionConstants.ERROR:
        console.error(action.data);
        return state;
    }

    return state;
  }

  getArray(){
    return this.getState().toArray();
  }

}

export default new SectionStore(AppDispatcher);
