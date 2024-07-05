import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/firbaseContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const date = new Date();

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!category.trim()) newErrors.category = 'Category is required';
    if (!price) newErrors.price = 'Price is required';
    if (!image) newErrors.image = 'Image is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      firebase.storage().ref(`/images/${image.name}`).put(image).then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          console.log(url);
          firebase.firestore().collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createAt: date.toDateString(),
          });
          history.push('/');
        });
      });
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          {errors.category && <span className="error-message">{errors.category}</span>}
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          {errors.price && <span className="error-message">{errors.price}</span>}
          <br />
        </form>
        <br />
        {image && (
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={URL.createObjectURL(image)}
          />
        )}
        <form>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          {errors.image && <span className="error-message">{errors.image}</span>}
          <br />
          <button type="button" onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
