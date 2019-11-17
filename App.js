import React from 'react';
import './app.css';
import BookmarkGrid from './BookmarkGrid';
import ToolBar from './ToolBar';
import EntryModal from './EntryModal';
import MoreModal from './MoreModal';
import { connect } from 'react-redux';
 
const mapStateToProps = (state) => { return {bookmarks: state.bookmarks} };
class UnconnectedApp extends React.Component {
  
 
  render(){ return (<div><ToolBar/><EntryModal/><MoreModal/>
      <br></br><br></br><br></br><br></br>
      <h1 className='text-on-background'>Bookmarks</h1>
      <br></br>{this.getBookmarkContent()}<br></br><br></br><br></br></div>
  );};

  getBookmarkContent(){
    if (this.props.bookmarks!=null&&this.props.bookmarks.length>0){
      return <BookmarkGrid/>
    } else {
      return <h1 className='text-on-background'>Tap or click the "Add" button to add a bookmark</h1>
    }
  }

  
}
const App = connect(mapStateToProps, null)(UnconnectedApp)

export default App;