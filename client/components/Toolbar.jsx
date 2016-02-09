
import Social from "./Social.jsx";

class Toolbar extends React.Component {

  render() {
    let opacity = this.props.opacity >= 0 ? this.props.opacity : 1;
    let social = this.props.social;

    let style = { opacity };
    if (opacity === 0){
      style.display = "none";
    }

    return (
      <div className="toolbar" style={style}>
        <a href="http://elfaro.net" target="_blank" className="logo-elfaro"></a>
        {this.props.title ?
          <h1>{this.props.title}</h1>
        : null }

        { social && opacity > 0.4 ?
        <Social name={social.name} path={social.path}
          FBCaption={social.FBCaption}
          TWText={social.TWText}/>
        : null }

        <a href="/" className="logo-retrato"></a>
      </div>
    );
  }

};

Toolbar.displayName = "Toolbar";
export default Toolbar;
