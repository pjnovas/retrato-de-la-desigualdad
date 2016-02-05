
class Toolbar extends React.Component {

  render() {
    let opacity = this.props.opacity >= 0 ? this.props.opacity : 1;

    return (
      <div className="toolbar" style={ { opacity } }>
        <div className="logo-elfaro"></div>
        {this.props.title ?
          <h1>{this.props.title}</h1>
        : null }
        <div className="logo-retrato"></div>
      </div>
    );
  }

};

Toolbar.displayName = "Toolbar";
export default Toolbar;
