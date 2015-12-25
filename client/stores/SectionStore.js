
import Immutable from "immutable";
import { convertPathToTitle, removeAccents } from "../utils";

import { AppDispatcher } from "../dispatcher";
import { SectionConstants } from "../constants";
import { SectionAPI } from "../api";

import { ReduceStore } from "flux/utils";

class SectionStore extends ReduceStore {

  getInitialState() {
    return Immutable.List();
  }

  reduce(state, action) {
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

  getByNumber(number){
    let list = this.getArray();

    let section;
    list.some( _section => {
      if (_section.number === number) {
        section = _section;
        return true;
      }
      return false;
    });

    return section;
  }

  getNumberFromUrl(path){
    if (!isNaN(+path)) { // is the number
      return path;
    }

    let list = this.getArray();
    let title = convertPathToTitle(path);
    let result;
    list.some( section => {
      if (removeAccents(section.title) === title) {
        result = section.number;
        return true;
      }
      return false;
    });

    return result;
  }

}

export default new SectionStore(AppDispatcher);
