import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { note, updateNote } = props;
  const { deleteNote } = context;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-header">{note.title}</h5>
            <i className="fa-solid fa-trash mx-2" onClick={() => {
              deleteNote(note._id);
              props.showAlert("Notes Deleted", "success")
            }}></i>
            <i className="fa-regular fa-pen-to-square mx-2" onClick={() => { updateNote(note); }}></i>
          </div>
          <p className="card-body">{note.description}</p>
          <b className="card-footer text-muted">{note.tag}</b>
          <div className="my-4 mx-2">
            <p className="card-text"><a href={'http://localhost:5000/' + note.fileName.replace('uploadfiles\\', '')}rel='noreferrer' target="_blank" title={note.filePath}>{note.filePath}</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Noteitem