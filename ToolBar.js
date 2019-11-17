import React from 'react';
import './app.css';
import {setMode, createUncheckedArray, deleteChecked} from './Actions'
import { connect } from 'react-redux';
const mapStateToProps = (state) => { return {mode: state.mode, bookmarks: state.bookmarks,
numChecked: state.numChecked} };
const mapDispatchToProps = (dispatch) => {
    return { setMode: (mode) => { dispatch(setMode(mode)); },
    createUncheckedArray: () => { dispatch(createUncheckedArray()); },
    deleteChecked: () => { dispatch(deleteChecked());} }};
class UnconnectedToolBar extends React.Component{

    render(){return (
        <ul className='tool-bar'>
        <li className={'tool-item '+this.getRearrangeButtonColorStyle()}
        onClick={()=>this.toggleRearrangeMode()}>Rearrange</li>
        <li className={'tool-item '+this.getDeleteButtonColorStyle()}
        onClick={()=>this.handleDeleteClick()}>{this.getDeleteString()}</li>
        {this.addCancelButton()}
        <li className={'tool-item '+this.getEditButtonColorStyle()} 
        onClick={()=>this.handleEditClicked()}>Edit</li>
        <li className={'tool-item '+this.getAddButtonColorStyle()} 
        onClick={()=>this.toggleAddMode()}>Add</li>
        <li className={'tool-item '+this.getMoreButtonColorStyle()} 
        onClick={()=>this.toggleMoreMode()}>More</li>
        </ul>);};

    getAddButtonColorStyle(){
        return this.props.mode==='add' ? 'tool-item-selected add-button-selected':'add-button';
    }

    getRearrangeButtonColorStyle(){
        return this.props.mode==='rearrange' ? 'tool-item-selected rearrange-button-selected':'rearrange-button';
    }

    getDeleteButtonColorStyle(){
        return this.props.mode==='delete' ? 'tool-item-selected delete-button-selected':'delete-button';
    }

    getEditButtonColorStyle(){
        return (this.props.mode==='edit'||this.props.mode==='update') ? 'tool-item-selected edit-button-selected':'edit-button';
    }

    getMoreButtonColorStyle(){
        return this.props.mode==='more' ? 'tool-item-selected more-button-selected':'more-button';
    }

    toggleAddMode(){
        if (this.props.mode==='add'){
            this.props.setMode('none')
        } else {
            this.props.setMode('add')
        }
    }

    toggleMoreMode(){
        if (this.props.mode==='more'){
            this.props.setMode('none')
        } else {
            this.props.setMode('more')
        }
    }

    toggleRearrangeMode(){
        if (this.props.mode==='rearrange'){
            this.props.setMode('none')
        } else {
            this.props.setMode('rearrange')
        }
    }

    changeEditMode(){
        if (this.props.mode==='edit'){
            this.props.setMode('none')
        } else if (this.props.mode==='update'){
            this.props.setMode('edit')
        } else if (this.props.mode==='none'){
            this.props.setMode('edit')
        } else{
            this.props.setMode('edit')
        }
    }

    addCancelButton(){
        if (this.props.mode==='delete'){
            return <li className='tool-item cancel-button' onClick={()=>{this.handleCancelClick()}}>Cancel</li>
        }
    }

    handleCancelClick(){
        this.props.setMode('none');
        this.props.createUncheckedArray();
    }

    handleDeleteClick(){
        if(this.props.mode!=='delete'){
            this.props.createUncheckedArray();
            this.props.setMode('delete');
        } else {
            if(this.props.numChecked>0){
                this.props.deleteChecked();
            }
            this.props.setMode('none');
        }
    }

    handleEditClicked(){
        this.changeEditMode()
    }

    getDeleteString(){
        if (this.props.numChecked===0){
            return 'Delete';
        } else {
            return 'Delete ('+this.props.numChecked.toString()+')'
        }
    }

}

const Toolbar = connect(mapStateToProps, mapDispatchToProps)(UnconnectedToolBar)
export default Toolbar;