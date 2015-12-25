
import { SectionStore } from "../stores";
import { SectionActions } from "../actions";

import Header from "./Header.jsx";
import Articles from "./Articles.jsx";

class SectionView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sections: []
    };
  }

  componentDidMount(){
    this.evChange = SectionStore.addListener(this.onChangeStore.bind(this));

    let sections = SectionStore.getArray();
    if (!sections || !sections.length){
      return SectionActions.find();
    }

    onChangeStore();
  }

  componentWillUnmount() {
    this.evChange.remove();
  }

  onChangeStore(){
    this.setState({
      sections: SectionStore.getArray()
    });
  }

  render() {
    let sections = this.state.sections || [];

    if (sections.length === 0){
      return (<div className="section-view">Cargando ...</div>);
    }

    let selected = SectionStore.getNumberFromUrl(this.props.params.section);

    return (
      <div className="section-view">
        <Header sections={sections} selected={selected}/>
        <Articles section={selected}/>
      </div>
    );
  }

};

SectionView.displayName = "SectionView";
export default SectionView;
