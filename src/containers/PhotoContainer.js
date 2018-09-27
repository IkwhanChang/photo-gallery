import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {CardColumns, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from "reactstrap";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as PhotoActions from "../modules/photo";
import Photo from "../components/Photo";

class PhotoContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      selected: 0
    }
  }

  componentDidMount(){
    const {PhotoActions} = this.props;
    PhotoActions.getPhotos(10);
  }
  render(){
    const {photos} = this.props;
    const select = (id) => this.setState({selected: id});
    const next = (callback) => this.setState({selected: (this.state.selected + 1 >= photos.length ? 0 : this.state.selected + 1)}, () => callback());
    const prev = (callback) => this.setState({selected: (this.state.selected - 1 < 0 ? photos.length - 1 : this.state.selected - 1)}, () => callback());
    const {selected} = this.state;

    return(
      <div>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {photos[selected] ? <Photo photo={photos[selected]} navigator={true} next={next} prev={prev}  select={select} /> : <h3>Please select the photo</h3>}
        </ReactCSSTransitionGroup>
        
        

          <CardColumns>
          {photos.map((photo, idx) => <Photo photo={photo} key={idx} id={idx} select={select} />)}  
          </CardColumns>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  photos: state.photo.get("photos")
});

export default connect(
  mapStateToProps,
  dispatch => ({
    PhotoActions: bindActionCreators(PhotoActions, dispatch)
  })
)(PhotoContainer)