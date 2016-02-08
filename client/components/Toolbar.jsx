
class Toolbar extends React.Component {

  render() {
    let opacity = this.props.opacity >= 0 ? this.props.opacity : 1;

    return (
      <div className="toolbar" style={ { opacity } }>
        <a href="http://elfaro.net" target="_blank" className="logo-elfaro"></a>
        {this.props.title ?
          <h1>{this.props.title}</h1>
        : null }
        <a href="/" className="logo-retrato"></a>
      </div>
    );
  }

};

Toolbar.displayName = "Toolbar";
export default Toolbar;
