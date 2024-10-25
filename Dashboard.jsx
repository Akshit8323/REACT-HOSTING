import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, getDocs, collection, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './Dashboard.css';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [mobileCompany, setMobileCompany] = useState("");  // New state for company
  const [mobileModel, setMobileModel] = useState("");      // New state for model
  const [mobileColor, setMobileColor] = useState("");
  const [mobilePrice, setMobilePrice] = useState("");
  const [record, setRecord] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        console.log(userDoc.data());
      }
    };
    fetchUser();
  }, [user]);

  const fetchData = async () => {
    const data = await getDocs(collection(db, "Mobiles"));
    const newData = data.docs.map((item) => ({ docId: item.id, ...item.data() }));
    setRecord(newData);
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  const addData = async () => {
    if (editIndex === null) {
      await addDoc(collection(db, "Mobiles"), {
        mobileCompany,
        mobileModel,
        mobileColor,
        mobilePrice
      });
    } else {
      await updateDoc(doc(db, "Mobiles", editIndex), {
        mobileCompany,
        mobileModel,
        mobileColor,
        mobilePrice
      });
      setEditIndex(null); 
    }
    // Clear input fields
    setMobileCompany("");
    setMobileModel("");
    setMobileColor("");
    setMobilePrice("");
    fetchData(); 
  };

  const deleteData = async (docId) => {
    if (window.confirm("Are you sure you want to delete this mobile?")) {
      await deleteDoc(doc(db, "Mobiles", docId));
      fetchData(); 
    }
  };

  const editData = (docId) => {
    const singleData = record.find((item) => item.docId === docId);
    setMobileCompany(singleData.mobileCompany);
    setMobileModel(singleData.mobileModel);
    setMobileColor(singleData.mobileColor);
    setMobilePrice(singleData.mobilePrice);
    setEditIndex(docId);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-greeting">- - - MOBILE STORE - - -</h1>

      <input
        type="text"
        placeholder="Mobile Company"
        value={mobileCompany}
        onChange={(e) => setMobileCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Model"
        value={mobileModel}
        onChange={(e) => setMobileModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Color"
        value={mobileColor}
        onChange={(e) => setMobileColor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mobile Price"
        value={mobilePrice}
        onChange={(e) => setMobilePrice(e.target.value)}
      />
      
      <button onClick={addData}>{editIndex === null ? "Add" : "Update"}</button>

      <table className="mobile-table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Model</th>
            <th>Color</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {record.map((e) => (
            <tr key={e.docId}>
              <td>{e.mobileCompany}</td>
              <td>{e.mobileModel}</td>
              <td>{e.mobileColor}</td>
              <td>${e.mobilePrice}</td>
              <td>
                <button onClick={() => editData(e.docId)}>Edit</button>
                <button onClick={() => deleteData(e.docId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
