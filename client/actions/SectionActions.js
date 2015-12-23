
import { AppDispatcher } from "../dispatcher";
import { SectionConstants } from "../constants";

class SectionActions {

  constructor(){
    this.dispatcher = AppDispatcher;
    this.constants = SectionConstants;
  }

  find() {
    this.dispatcher.dispatch({
      type: this.constants.FIND
    });
  }

  findOne(id){
    this.dispatcher.dispatch({
      type: this.constants.FINDONE,
      id
    });
  }

  create(section) {
    this.dispatcher.dispatch({
      type: this.constants.CREATE,
      section
    });
  }

  receive(sections){
    this.dispatcher.dispatch({
      type: this.constants.RECEIVE,
      sections
    });
  }

  error(data){
    this.dispatcher.dispatch({
      type: this.constants.ERROR,
      data
    });
  }

}

const instance = new SectionActions();
export default instance;
