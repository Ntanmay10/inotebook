import React, { useContext, useState, } from 'react';
import noteContext from "../context/notes/noteContext";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const AddNote = (props) => {
    const context = useContext(noteContext);

    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "", fileName: "", filePath: "" })

    const [show, setShow] = useState(false);

    const [uploadedFile, setUploadedFile] = useState({});

    const formData = new FormData();

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag, note.fileName, note.filePath);
        setNote({ title: "", description: "", tag: "", fileName: "", filePath: "" })
        props.showAlert("Note Added", "success")
    }

    const handleClose = (e) => {
        formData.append("file", uploadedFile);
        fetch('http://localhost:5000/api/notes/upload', {
            method: 'POST',
            body: formData
        }).then((res) => res.json())
            .then((data) => {
                setNote({ ...note, fileName: data.name, filePath: data.path });
                setShow(false);
            }).catch((err) => {
                console.error(err)
            });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const removeFile = (e) => {
        setNote({ ...note, fileName: "", filePath: "" });
    }

    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        setUploadedFile(fileUploaded);
    };

    const openDialogue = (e) => {
        setShow(true);
    }

    return (
        <div>
            <h2>Add Your Notes</h2>
            <div className="container my-3">
                <div>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input value={note.title} required minLength={5} type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea value={note.description} required minLength={5} cols={30} className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div>
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input value={note.tag} required minLength={5} type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Uplaod File</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <input type="file" onChange={handleChange} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleClose}>
                                Upload File
                            </Button>
                        </Modal.Footer>
                    </Modal>
                <div>
                    <div className="mb-1">
                        <button className="btn btn-primary mx-1 my-2" data-toggle="modal" onClick={openDialogue}>Attach File to Note</button>
                        {note.fileName}
                        {note.fileName !== '' ? <button className="btn btn-close" onClick={removeFile}></button> : ''}
                    </div>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary mx-1" onClick={handleClick}>ADD NOTE</button>
            </div>
        </div>
    )
}

export default AddNote