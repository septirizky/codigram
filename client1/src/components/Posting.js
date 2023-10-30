import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPosting } from "../action/Actions";
import Swal from "sweetalert2";

const AddPosting = () => {
  const { addPostingResult, addPostingError } = useSelector(
    (state) => state.list
  );
  const dispatch = useDispatch();

  const [item, setItem] = useState({
    caption: "",
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    //const a = jwt_decode();
    //console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  const createHandler = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    //console.log(item);
  };
  const upload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", item.caption);
    // formData.append("userid", item.userid);
    try {
      dispatch(addPosting(formData, localStorage.getItem()));
    } catch (err) {
      console.log("gagaaaal");
    }
  };

  useEffect(() => {
    if (addPostingResult) {
      if (addPostingResult.status !== 200) {
        Swal.fire(
          `${addPostingResult.status}`,
          "Terjadi Kesalahan Pada Saat Input Data",
          "warning"
        );
      } else {
        Swal.fire(
          `Berhasil Memposting`,
          "Postingan Telah di Upload",
          "success"
        );
      }
    }
    if (addPostingError) {
      Swal.fire(
        "File Yang Diupload Salah!",
        "Ekstensi FIle salah Atau Ukuran File Melebihi 1 MB",
        "warning"
      );
    }
  }, [dispatch, addPostingError, addPostingResult]);

  return (
    <div>
      <Form encType="multipart/form-data" onSubmit={(e) => upload(e)}>
        <Form.Group className="mb-3" controlId="formBasicCaption">
          <Form.Label className="text-center">Caption</Form.Label>
          <Form.Control
            as="textarea"
            name="caption"
            placeholder="Caption"
            onChange={(e) => createHandler(e)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCaption">
          <Form.Label>
            Upload Profile Picture &nbsp;&nbsp;&nbsp;*(Ukuran File Maksimal 1
            MB)
          </Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload File"
            onChange={(e) => handleFileChange(e)}
          />
        </Form.Group>

        <hr></hr>

        <div className="d-grid">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AddPosting;
