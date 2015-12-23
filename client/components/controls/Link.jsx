
import { Link as RouterLink } from "react-router";

export default class Link extends React.Component {

  render() {

    var {
      className,
      children,
      ...others,
    } = this.props;

    className = "link " + (className || "");

    return (
      <RouterLink className={className} {...others}>
        {children}
      </RouterLink>
    );
  }

};

Link.displayName = "Link";
