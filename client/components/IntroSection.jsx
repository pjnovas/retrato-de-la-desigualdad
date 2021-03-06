
import Social from "./Social.jsx";

const twBy = "@_ElFaro_";

class IntroSection extends React.Component {

  render() {
    let text = `Un retrato de desigualdad por ${twBy}`;

    return (
      <section className="intro-section">
        <div className="background"></div>
        <div className="overlay-1"></div>
        <div className="overlay-2"></div>
        <div className="overlay-3"></div>

        <a href="http://elfaro.net" target="_blank" className="logo-elfaro"></a>
        <div className="logo-retrato"></div>

        <Social name="Un retrato de desigualdad" path="/"
          FBCaption="El Salvador, para algunos, puede ser una gran prisión. Estos mapas interactivos son el resultado de un experimento con 24 jóvenes del Área Metropolitana de San Salvador, que accedieron a que se registrara su movilización 24 horas al día durante todo octubre de 2015"
          TWText={text}/>

        <div className="content-center" style={{ opacity: (1 - this.props.opacity) }}>
          <div className="narrow-content">
            <div className="title">
              <h1>Un retrato de desigualdad</h1>
            </div>
            <div className="body">
              El Salvador, para algunos, puede ser una gran prisión. Estos mapas interactivos son el resultado de un experimento con 24 jóvenes del Área Metropolitana de San Salvador, que accedieron a que se registrara su movilización 24 horas al día durante todo octubre de 2015. El resultado, que confirma que la expresión popular “del Salvador del Mundo para abajo” acierta al aludir a dos mundos determinados por el nivel de ingresos, da luz sobre el acceso al ocio y la cultura de los jóvenes salvadoreños, probablemente también condicionado por la inseguridad.
            </div>
            <p className="signed">Textos: Óscar Luna & Fátima Peña / Fotografía: Fred Ramos</p>
            <a className="continue" onClick={ () => this.props.onContinue() }>
              <i className="icon-down-open" />
            </a>
          </div>
        </div>
      </section>
    );
  }

};

IntroSection.displayName = "IntroSection";
export default IntroSection;
