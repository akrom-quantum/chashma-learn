"use client";
import { useEffect, useState } from "react";
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, browserLocalPersistence, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyBD65CTP7Tx84l-qL-KT9pj3uMUOsLOCI4",
  authDomain:        "chashma-learn.firebaseapp.com",
  projectId:         "chashma-learn",
  storageBucket:     "chashma-learn.firebasestorage.app",
  messagingSenderId: "1059701555295",
  appId:             "1:1059701555295:web:104a64e41d60252a28dbea",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export default function DashboardPage() {
  const [status, setStatus] = useState("Initializing...");
  const [user, setUser]     = useState(null);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).then(() => {
      setStatus("Listening for auth state...");
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setStatus("Signed in!");
          setUser(firebaseUser);
        } else {
          setStatus("No user — not signed in");
          setUser(null);
        }
      });
      return () => unsubscribe();
    });
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>Auth Debug</h1>
      <p>Status: <strong>{status}</strong></p>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Name: {user.displayName}</p>
          <p>UID: {user.uid}</p>
        </div>
      )}
    </div>
  );
}
