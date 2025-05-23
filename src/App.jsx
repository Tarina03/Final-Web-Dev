// import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import {db, auth, google} from '../firebase.ts';
// import { addDoc, collection, getDocs} from 'firebase/firestore';
// import { signInWithPopup, signOut } from 'firebase/auth';


// function App() {
//   const [count, setCount] = useState(0);
//   const[docs, setDocs] = useState(null);
//   const[user, setUser] = useState(null);

//   useEffect(() => {
//     const loadCollection = async () => { 
//     const collectionRef = collection(db, 'tset');
//     const snap = await getDocs(collectionRef);

//     if (snap.empty) {
//       console.log('No documents found');
//     }

//     if (snap.docs.length > 1) {
//       console.log('More than one document found');
//     }

//     const firstDoc = snap.docs[0];
//     setCount(firstDoc.data().count);
//     setDoc(firstDoc);

//     };
//     loadCollection();
//   }, []);

//   const handleAuthClick = () => {
//     if (user) {
//       signOut(auth).catch(console.error);
//       setUser(null);

//     } else {
//       signInWithPopup(auth, google)
//       .then((result) => setUser(result.user))
//       .catch(console.error);
//     }
//     }

//   // useEffect(() => { 
//   //   if (!doc){

//   //   addDoc(collection(db, 'tset'), {
//   //     uid: "test",
//   //     count: count,
//   //     createdAt: new Date(),
//   //   });
//   // }
//   // else {
//   //   const docRef = doc.ref;
//   //   docRef.update({
//   //     count,
//   //   });
//   // }

//   // }, [count])

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <button onClick={handleAuthClick}>{user ? "sign out" : "sign in"}</button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useEffect, useState } from 'react';
import './App.css';
import { db, auth, google } from '../firebase.ts';
import {
  addDoc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';

function App() {
  const [count, setCount] = useState(0);
  const [docId, setDocId] = useState(null);
  const [user, setUser] = useState(null);

  const loadData = async () => {
    const collectionRef = collection(db, 'tset');
    const snap = await getDocs(collectionRef);

    if (!snap.empty) {
      const docSnap = snap.docs[0];
      setCount(docSnap.data().count);
      setDocId(docSnap.id);
    } else {
      const newDoc = await addDoc(collectionRef, {
        count: 0,
        createdAt: new Date(),
      });
      setCount(0);
      setDocId(newDoc.id);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIncrement = async () => {
    if (!docId) {
      console.warn("No document ID to update");
      return;
    }

    const newCount = count + 1;
    setCount(newCount);

    const ref = doc(db, 'tset', docId);
    await updateDoc(ref, { count: newCount });
  };

  const handleDelete = async () => {
    if (!docId) {
      console.warn("No document to delete");
      return;
    }

    const ref = doc(db, 'tset', docId);
    await deleteDoc(ref);
    setCount(0);
    setDocId(null);
    console.log("Deleted successfully");
  };

  const handleAuthClick = () => {
    if (user) {
      signOut(auth)
        .then(() => setUser(null))
        .catch(console.error);
    } else {
      signInWithPopup(auth, google)
        .then((result) => {
          setUser(result.user);
          loadData(); // refresh data after login
        })
        .catch(console.error);
    }
  };

  return (
    <div className="container">
      <h1>🔄 Firebase CRUD Demo</h1>
      <p className="subtitle">
        {user ? `Signed in as ${user.displayName}` : "Sign in to get started"}
      </p>

      <div className="card">
        <p className="count-display">
          🔢 Count: <strong>{count}</strong>
        </p>

        <button className="btn" onClick={handleIncrement}>
          Increment
        </button>
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete Document
        </button>
        <button className="btn btn-auth" onClick={handleAuthClick}>
          {user ? "Sign Out" : "Sign In with Google"}
        </button>
      </div>
    </div>
  );
}

export default App;



