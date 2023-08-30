import { Unsubscribe, orderBy, where } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore, limit, onSnapshot, query, setDoc } from "firebase/firestore";
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBS83B79w9TuFZ_ctVlkwDhRQCziIhVnjM',
    authDomain: 'prova-acb9b.firebaseapp.com',
    projectId: 'prova-acb9b',
    storageBucket: 'prova-acb9b.appspot.com',
    messagingSenderId: '283854503666',
    appId: '1:283854503666:web:2dc56339bfd9493d2f1a6b',
    measurementId: 'G-5YMXLG0R03',
  },
};
// Initialize Firebase
const app = initializeApp(environment.firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

const specialOftheday = doc(db, 'dailySpecial/2021-09-15');
//come dire dailySpecial/2021-09-14/orderHistory/totalSales
//const childDoc = doc(specialOftheday, 'orderHistory/totalSales');

export async function writeDailySpecial() {
  const docData = {
    description: 'a delicious vanilla latte11',
    price: 3.0,
    milk: 'Wholejkmuj',
    vegan: false,
  };
  try {
    await setDoc(specialOftheday, docData, { merge: true });
  } catch (error) {
    console.log(`abbiamo questo errore: ${error}`);
  }
}
export const ordersCollection = collection(db, 'orders');

export async function addNewDocument() {
  const newDoc = await addDoc(ordersCollection, {
    customer: 'Mario',
    drink: 'latte',
    total_cost: (100 + Math.floor(Math.random() * 400)) * 100,
  });
  console.log(`aggiunta doc ${JSON.stringify(newDoc)}`);
}

export async function readASingleDocument() {
  const mySnapshot = await getDoc(specialOftheday);
  if (mySnapshot.exists()) {
    const docData = mySnapshot.data();
    console.log(`My data is ${JSON.stringify(docData)}`);
  }
}
let dailSpecialUnsubscribe: Unsubscribe;
export async function listenToADocument() {
  dailSpecialUnsubscribe = onSnapshot(specialOftheday, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const docData = docSnapshot.data();
      console.log(`In reatime,docdata is ${JSON.stringify(docData)}`);
    }
  });
}

export async function cancelMyListenerAtTheAppropriateTime(){
  dailSpecialUnsubscribe();
}

// export async function queryForDocuments() {
//   const customerOrdersQuery = query(
//     collection(db, 'orders'),
//     where('drink', '==', 'latte'),
//     orderBy('price')
//   )
// }
export async function queryForDocuments() {
  const customerOrdersQuery = query(collection(db, 'orders'), where('drink', '==', 'latte'), limit(10));
}
