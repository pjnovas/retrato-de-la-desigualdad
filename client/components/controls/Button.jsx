
import { Link } from "react-router";

export default class Button extends React.Component {

  render() {

    var {
      className,
      children,
      ...others,
    } = this.props;

    className = "button " + (className || "");

    if (this.props.to){
      return (
        <Link className={className} {...others}>
          {children}
        </Link>
      );
    }

    return (
      <button className={className} {...others}>
        {children}
      </button>
    );
  }

};

Button.displayName = "Button";
