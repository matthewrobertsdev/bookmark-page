import React from 'react';
import './app.css';
import ReactModal from 'react-modal';
import {setMode, appendBookmarks, setBookmarks} from './Actions'
import { connect } from 'react-redux';

const mapStateToProps = (state) => { return {mode: state.mode, bookmarks: state.bookmarks}};
const mapDispatchToProps = (dispatch) => {
 return { setMode: (mode) => { dispatch(setMode(mode)); },
 appendBookmarks: (bookmarks) => { dispatch(appendBookmarks(bookmarks)); },
 setBookmarks: (bookmarks) => { dispatch(setBookmarks(bookmarks)); }}}
 ReactModal.setAppElement('#root');
class UnconnectedMoreModal extends React.Component{

      render(){ return (<div>
        <ReactModal className="action-modal" isOpen={this.props.mode==='more'} >
          <h1 className='modal-text-size-2'>More</h1>
        <button href='' id='downloadButton' className='link-button action-button' onClick={()=>this.handleSaveClick()}>Download as JSON Text File</button>
        <br></br>
        <button className='link-button action-button' onClick={()=>this.handleLoadMoreClick()}>
        Load More from JSON Text</button><input id='loadMoreButton' type="file"/>
        <br></br>
        <button className='link-button action-button' onClick={()=>this.handleLoadAndReplaceClick()}>
        Load and Replace from JSON Text</button><input id='loadAndReplaceButton' type="file"/>
        <br></br>
        <button className='link-button action-button' onClick={()=>this.props.setMode('none')}>Done</button>
        <a href='save' id='downloadLink' style={{display: 'none'}}>No Show with CSS</a>
        </ReactModal></div>
    );};

    handleFileChosen(append, props){
      let reader = new FileReader();
      let file=null;
      if(append){
        file = document.getElementById('loadMoreButton').files[0];
      } else {
        file = document.getElementById('loadAndReplaceButton').files[0];
      }
      reader.addEventListener("loadend", function() {
        let bookmarks=JSON.parse(reader.result);
        if(append){
          props.appendBookmarks(bookmarks);
        } else {
          props.setBookmarks(bookmarks);
        }
      });
      reader.readAsText(file);
    }

    handleSaveClick(){
      let downloadLink=document.getElementById('downloadLink')
      let file = new Blob([JSON.stringify(this.props.bookmarks)], {type: 'text/plain'});
      downloadLink.download='bookmarks.txt';
      downloadLink.href=URL.createObjectURL(file);
      downloadLink.click();
    }

    handleLoadMoreClick(){
      document.getElementById('loadMoreButton').addEventListener('change', ()=>this.handleFileChosen(true, this.props));
      document.getElementById('loadMoreButton').click();
    }

    handleLoadAndReplaceClick(){
      document.getElementById('loadAndReplaceButton').addEventListener('change', ()=>this.handleFileChosen(false, this.props));
      document.getElementById('loadAndReplaceButton').click();
    }

}
const MoreModal = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMoreModal)
export default MoreModal