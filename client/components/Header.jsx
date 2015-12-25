import Sections from "./Sections.jsx";

class Header extends React.Component {

  render() {
    return (
      <div className="header">
        <Sections
          sections={this.props.sections}
          selected={this.props.selected}/>
      </div>
    );
  }

};

Header.displayName = "Header";
export default Header;
