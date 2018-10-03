import React, {Component} from "react";
import "./Photo.css";

class Photo extends Component{

  constructor(props){
    super(props);
    this.state ={ //base css
      fading: false
    }
  }

  renderNavigation(){
    const {next, prev} = this.props;
    const fading = () => {
      this.setState({fading: true}, () => {
        setTimeout(_ => {
          this.setState({fading: false}); // fade back in
        }, 500);
      }); // fade out
    }

    return (
      <div>
        <div className="center-left" onClick={() => prev(() => {
          fading();
        })}>◀︎</div>
        <div className="center-right" onClick={() => next(() => {
          fading();
        })}>▶︎</div>
      </div>
    )
  }


  render(){
    const {photo = null, id, width = 400, height = 300, select, navigator = false} = this.props;
    const {fading = false} = this.state;
    return(
      <div className={`${this.state.fading ? 'container faded' : 'container'}`}>

        <img src={photo.url} width="100%" height="100%" onClick={() => select(id)} />
        {navigator ? this.renderNavigation() : null}
        <div className="bottom-right">{photo.caption}</div>
      </div>
    );
  }
}

export default Photo;
