
import { SectionStore } from "../../stores";
import { SectionActions } from "../../actions";

import { Button } from "../controls";

class Home extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sections: []
    };
  }

  componentDidMount(){
    this.evChange = SectionStore.addListener(this.onChangeStore.bind(this));
    SectionActions.find();
  }

  componentWillUnmount() {
    this.evChange.remove();
  }

  onChangeStore(){
    this.setState({ sections: SectionStore.getArray() });
  }

  render() {
    return (
      <div>
        <h1>Retrato de la desigualdad</h1>
        { this.state.sections.map( s => {
          return (<Button key={s.number}>{s.title}</Button>);
        })}
      </div>
    );
  }

};

Home.displayName = "Home";
export default Home;
