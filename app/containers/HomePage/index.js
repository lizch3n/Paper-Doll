/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect, memo} from 'react';
import { FormattedMessage } from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';

import messages from './messages';

import H3 from './H3';
import H1 from './H1';
import P from './P';
import Saved from './Saved';
import Saver from './Saver';
import Dragger from './Dragger';
import Mixer from './Mixer';
import Footer from './Footer';
import Img from "./Img";

import bg from './bg/wp.jpg';
import bg1 from './bg/_0010_doll.png';


function importAll(r) {
  return r.keys().map(r);
}
const images = importAll(require.context('./mix', false, /\.(png|jpe?g|svg)$/));

export function HomePage({
}) {
  
  setTimeout(function(){
    $('.dragger').draggable();
  },100)

  return (
    <div>
    <header>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
    </header>    
    <Saver id="save" onClick={save} data-html2canvas-ignore>
      <button>Save</button>
    </Saver>

      <Mixer id="mixer" style={{ "display": "flex", 'height': "auto", }}>        
        <div style={{ "float": "left", 
          "width": "50%",
          'textAlign':"center", 
          'padding': "2vw 0",
          "backgroundColor": "#fff",
          // "backgroundImage": `url(${bg})`,
          // "backgroundSize":"cover"
          // "border": "1px solid teal"
        }} 
        id="doll">
          <img src={bg1} style={{"width": "45%", margin: "2em 0"}}/>
        </div>
        <div className="drag-items" style={{ "float": "right", "width": "50%", 'paddingBottom': '4em'}}>
          <P>drag & drop items onto the doll</P>
          {
            images.map(function(img,i){
              return (<Dragger className="dragger" key={i}><img src={img} style={{}}/></Dragger>);
            })
          }    
        </div>  
      </Mixer>
      <Saved>
        <h3>Saved Paper Dolls</h3>
        <div id="saved"></div>
      </Saved>
        <Footer><a href="//www.elizabethchen.com">&copy; Elizabeth Chen</a></Footer>
    </div>
  );
}

const save = function(evt){
  window.scrollTo(0,0);
  html2canvas(document.querySelector("#mixer"), {
    width:$('#mixer').width()/2, 
    height:$('#doll img').height()+80,
    // x: $(window).width()/4
  }).then(canvas => {
    // document.body.appendChild(canvas)
    // document.querySelector('#saved').appendChild(canvas);
    $('#saved').prepend(canvas);
    $('body, html').animate({scrollTop: $('#saved').offset().top})
});
}
const mapStateToProps = createStructuredSelector({
});
export function mapDispatchToProps(dispatch) {
  return {      
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);