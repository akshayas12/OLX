import React, { useContext, useEffect, useState } from 'react';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/firbaseContext';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (postDetails) {
      const { userId } = postDetails;
      console.log('Post details:', postDetails);
      console.log('User ID:', userId);
      
      firebase.firestore().collection('users').where('id', '==', userId).get()
        .then((res) => {
          if (!res.empty) {
            res.forEach(doc => {
              console.log('User data:', doc.data());
              setUserDetails(doc.data());
            });
          } else {
            console.log('No user found with this ID.');
          }
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    }
  }, [postDetails, firebase]);

  if (!postDetails) {
    return <div>Loading...</div>; // Or a more suitable loading state
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt={postDetails.name}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createAt}</span>
        </div>
        {userDetails && (
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default View;
