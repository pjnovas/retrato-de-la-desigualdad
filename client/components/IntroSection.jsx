
class IntroSection extends React.Component {

  render() {
    return (
      <section className="intro-section">
        <div className="background"></div>
        <div className="overlay-1"></div>
        <div className="overlay-2"></div>
        <div className="overlay-3"></div>
        <div className="logo-elfaro"></div>

        <div className="content-center" style={{ opacity: (1 - this.props.opacity) }}>
          <div className="narrow-content">
            <div className="logo-retrato"></div>
            <div className="body">
              El Salvador, para algunos, puede ser una gran prisión. Estos mapas interactivos son el resultado de un experimento con 24 jóvenes del Área Metropolitana de San Salvador, que accedieron a que se registrara su movilización 24 horas al día durante todo octubre de 2015. El resultado, que confirma que la expresión popular “del Salvador del Mundo para abajo” acierta al aludir a dos mundos determinados por el nivel de ingresos, da luz sobre el acceso al ocio y la cultura de los jóvenes salvadoreños, probablemente también condicionado por la inseguridad.
            </div>
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
