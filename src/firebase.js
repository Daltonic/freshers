import { initializeApp } from 'firebase/app'
import { setAlert } from './store'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

import {
  getFirestore,
  query,
  getDocs,
  updateDoc,
  collection,
  collectionGroup,
  orderBy,
  deleteDoc,
  addDoc,
  doc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCRE8tDbLc15fHYowCQ_7fEUOHZ088CMc4',
  authDomain: 'fresher-a5113.firebaseapp.com',
  projectId: 'fresher-a5113',
  storageBucket: 'fresher-a5113.appspot.com',
  messagingSenderId: '443136794867',
  appId: '1:443136794867:web:d612d53b5a35bc73039786',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const logInWithEmailAndPassword = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password).then(
      (user) => user.user
    )
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const registerWithEmailAndPassword = async (
  email,
  password,
  fullname,
  phone,
  address
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    const userDocRef = doc(db, 'users', user.email)

    await setDoc(userDocRef, {
      uid: user.uid,
      fullname,
      email,
      phone,
      address,
    })

    return user
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const addToOrders = async (cart) => {
  try {
    const order = {
      order: Math.random().toString(36).substring(2, 9).toUpperCase(),
      timestamp: serverTimestamp(),
      cart,
    }

    await addDoc(
      collection(db, `users/${auth.currentUser.email}`, 'orders'),
      order
    )
    return order
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const addProduct = async (product) => {
  try {
    await addDoc(
      collection(db, `users/${auth.currentUser.email}`, 'products'),
      {
        name: product.name,
        uid: auth.currentUser.uid,
        email: auth.currentUser.email,
        price: product.price,
        description: product.description,
        imgURL: product.imgURL,
        stock: ((Math.random() * 10) | 0) + 1,
        timestamp: serverTimestamp(),
      }
    )
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const getProducts = async () => {
  try {
    const products = query(
      collectionGroup(db, 'products'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(products)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      price: Number(doc.data().price),
    }))
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const getProduct = async (id) => {
  try {
    const products = query(
      collectionGroup(db, 'products'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(products)

    const product = snapshot.docs.find((doc) => doc.id == id)
    return {
      id: product.id,
      ...product.data(),
      price: Number(product.data().price),
    }
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const updateProduct = async (product) => {
  const productRef = doc(db, `users/${product.email}/products`, product.id)
  try {
    await updateDoc(productRef, product)
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}

const deleteProduct = async (product) => {
  const productRef = doc(db, `users/${product.email}/products`, product.id)
  try {
    await deleteDoc(productRef)
  } catch (error) {
    setAlert(JSON.stringify(error), 'red')
  }
}


export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  onAuthStateChanged,
  addProduct,
  addToOrders,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
