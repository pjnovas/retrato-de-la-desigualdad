
const link = window.location.protocol + "//" + window.location.host;
const twBy = "@_ElFaro_";

class Social extends React.Component {

  onFBShare(lnk){
    window.open(lnk,'','scrollbars=no,width=620,height=425,location=no');
    /*
    window.FB.ui({
      method: 'feed',
      name: this.props.name,
      link: link + (this.props.path) || "",
      //picture: link + "/images/retrato.png",
      caption: this.props.FBCaption,
      redirect_uri: link + (this.props.path) || "",
    }, function( response ) {
      console.log(response);
    });
    */
  }

  render() {
    let text = encodeURI(this.props.TWText);
    let lnk =  encodeURIComponent(link + this.props.path);

    const twLink = `https://twitter.com/intent/tweet?url=${lnk}&text=${text}`;
    const fbLink = `https://www.facebook.com/sharer/sharer.php?u=${lnk}`;

    return (
      <div className="social">
        <a className="facebook" onClick={() => { this.onFBShare(fbLink) }}>
          <i className="icon-facebook"></i>
        </a>
        <a href={twLink} className="twitter"><i className="icon-twitter"></i></a>
      </div>
    );
  }

};

Social.displayName = "Social";
export default Social;
