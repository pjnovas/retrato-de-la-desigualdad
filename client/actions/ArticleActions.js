
import { AppDispatcher } from "../dispatcher";
import { ArticleConstants } from "../constants";

class ArticleActions {

  constructor(){
    this.dispatcher = AppDispatcher;
    this.constants = ArticleConstants;
  }

  find(section) {
    this.dispatcher.dispatch({
      type: this.constants.FIND,
      section
    });
  }

  receive(articles){
    this.dispatcher.dispatch({
      type: this.constants.RECEIVE,
      articles
    });
  }

  error(data){
    this.dispatcher.dispatch({
      type: this.constants.ERROR,
      data
    });
  }

}

const instance = new ArticleActions();
export default instance;
