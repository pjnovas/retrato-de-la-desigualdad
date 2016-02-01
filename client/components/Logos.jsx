
class Logos extends React.Component {

  render() {
    let logos = [{
      name: "HacksLabs",
      class: "hackslabs",
      url: "http://hackslabs.org"
    }, {
      name: "ICFJ",
      class: "icfj",
      url: "http://www.icfj.org"
    }, {
      name: "HIVOS",
      class: "hivos",
      url: "http://www.hivos.org"
    }, {
      name: "Avina Americas",
      class: "avina",
      url: "http://www.avinaamericas.org/"
    }, {
      name: "Ana Carolina",
      class: "anacarolina",
      url: ""
    }];

    return (
      <section className="logos">

        <p className="legend">
          Contribuyeron para realizar <strong>Un retrato de la desigualdad</strong>:
        </p>

        { logos.map( l => {
          return (
            <a key={l.class} title={l.name} className={l.class}
              href={l.url} target="__blank"></a>
          );
        }) }

      </section>
    );
  }

};

Logos.displayName = "Logos";
export default Logos;
