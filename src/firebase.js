import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

let app = null;
let db = null;

export const getFirebaseConfig = () => {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
  };
};

export const initFirebase = () => {
  const config = getFirebaseConfig();

  if (!config.apiKey || !config.projectId) {
    return { success: false, error: "Chưa cấu hình Firebase Project ID hoặc API Key trong .env" };
  }

  try {
    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    db = getFirestore(app);
    return { success: true, db, app };
  } catch (err) {
    console.error("Firebase init error:", err);
    return { success: false, error: err.message };
  }
};

// Listen to real-time portfolio updates from Firestore
export const subscribeToPortfolioDoc = (onData, onAuthData) => {
  const { success, db: database } = initFirebase();
  if (!success || !database) return () => {};

  try {
    const contentRef = doc(database, "portfolio", "content");
    const unsubContent = onSnapshot(
      contentRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onData(docSnap.data());
        } else {
          onData(null);
        }
      },
      (err) => {
        console.error("Firestore content subscription error:", err);
      }
    );

    let unsubAuth = () => {};
    if (onAuthData) {
      const authRef = doc(database, "portfolio", "auth");
      unsubAuth = onSnapshot(
        authRef,
        (docSnap) => {
          if (docSnap.exists()) {
            onAuthData(docSnap.data());
          }
        },
        (err) => {
          console.error("Firestore auth subscription error:", err);
        }
      );
    }

    return () => {
      unsubContent();
      unsubAuth();
    };
  } catch (err) {
    console.error("Error setting up Firestore subscription:", err);
    return () => {};
  }
};

// Save portfolio content directly to Firestore
export const savePortfolioToFirestore = async (data) => {
  const { success, db: database, error } = initFirebase();
  if (!success || !database) {
    return { success: false, error: error || "Firebase chưa được khởi tạo" };
  }

  try {
    const docRef = doc(database, "portfolio", "content");
    await setDoc(
      docRef,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (err) {
    console.error("Firestore write error:", err);
    return { success: false, error: err.message };
  }
};

// Save admin credentials directly to Firestore
export const saveAdminAuthToFirestore = async (authData) => {
  const { success, db: database, error } = initFirebase();
  if (!success || !database) {
    return { success: false, error: error || "Firebase chưa được khởi tạo" };
  }

  try {
    const docRef = doc(database, "portfolio", "auth");
    await setDoc(docRef, authData, { merge: true });
    return { success: true };
  } catch (err) {
    console.error("Firestore auth write error:", err);
    return { success: false, error: err.message };
  }
};

// Fetch initial data once
export const fetchPortfolioFromFirestore = async () => {
  const { success, db: database } = initFirebase();
  if (!success || !database) return null;

  try {
    const docRef = doc(database, "portfolio", "content");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.error("Firestore read error:", err);
  }
  return null;
};
