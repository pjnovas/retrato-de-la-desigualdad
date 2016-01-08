
import { SectionStore, ArticleStore } from "../stores";
import { SectionActions, ArticleActions } from "../actions";

import Header from "./Header.jsx";

import Article from "./Article.jsx";
import MapArticle from "./MapArticle.jsx";
import Gallery from "./Gallery.jsx";

class SectionView extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      sections: [],
      section: null,
      articles: [],
      article: null
    };
  }

  componentDidMount(){
    this.evChangeSections = SectionStore.addListener(this.onChangeStoreSections.bind(this));
    this.evChangeArticles = ArticleStore.addListener(this.onChangeStoreArticles.bind(this));

    let sections = SectionStore.getArray();
    if (!sections || !sections.length){
      return SectionActions.find();
    }

    onChangeStore();
  }

  componentWillUnmount() {
    this.evChangeSections.remove();
    this.evChangeArticles.remove();
  }

  componentWillReceiveProps(nextProps){
    this.setSelectedSection(
      nextProps.params.section,
      nextProps.params.article
    );
  }

  onChangeStoreSections(){
    this.setState({
      sections: SectionStore.getArray()
    });

    this.setSelectedSection(
      this.props.params.section,
      this.props.params.article
    );
  }

  setSelectedSection(section, article) {
    let state = this.state;
    let sectionNbo = SectionStore.getNumberFromUrl(section);
    let lastSection = state.section && state.section.number || -1;

    this.setState({
      section: SectionStore.getByNumber(sectionNbo)
    });

    if (!state.articles.length || sectionNbo !== lastSection){
      setTimeout(() => ArticleActions.find(sectionNbo), 1);
    }
    else {
      this.setSelectedArticle(article);
    }
  }

  onChangeStoreArticles(){
    let articles = ArticleStore.getArray();
    this.setState({ articles });

    if (this.props.params.article){
      this.setSelectedArticle(this.props.params.article);
    }
    else {
      this.setState({ article: articles[0] });
    }
  }

  setSelectedArticle(articlePath){
    if (!articlePath){
      this.setState({ article: ArticleStore.getArray()[0] });
      return;
    }

    let articleNbo = ArticleStore.getNumberFromUrl(articlePath);
    this.setState({
      article: ArticleStore.getByNumber(articleNbo)
    });
  }

  render() {
    let state = this.state;
    let sections = state.sections || [];

    if (sections.length === 0 || !state.section){
      return (<div className="section-view">Cargando Secciones ...</div>);
    }

    if (state.articles.length === 0 || !state.article){
      return (<div className="section-view">Cargando Articulos ...</div>);
    }

    let article;

    if (state.section.gallery){
      article = (
        <Gallery
          section={state.section}
          article={state.article}
          articles={state.articles}/>
      );
    }
    else if (state.article && state.article.hasMap){
      article = (
        <MapArticle article={state.article}/>
      );
    }
    else {
      article = (
        <Article article={state.article}/>
      );
    }

    return (
      <div className="section-view">
        <Header
          sections={sections}
          section={state.section}
          articles={state.articles}
          article={state.article} />

        {article}
      </div>
    );
  }

};

SectionView.displayName = "SectionView";
export default SectionView;
