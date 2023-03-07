import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  try {
    const db = await openDB("jate", 1); 

    const transaction = db.transaction("jate", "readwrite"); // setting as read and write permissions

    const store = transaction.objectStore("jate");

    const req = store.put ({ id: 1, value: content});

    const res = await req;

    console.log("~~~Data saved to db success~~~", res.value);
  }
  catch(err){
    console.log("~~~something went wrong :(... Heres some info: \n", err);
  }
} 


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try  {
    const db = await openDB("pwaDB", 1);

    const transaction = jateDB.transaction("pwaDB", "readonly"); //opening context in read only, we wont need to write to this file yet
    
    const store = tx.objectStore("pwaaDB");

    const req = store.get(1);
    const res = await req;
    res 
      ? console.log("Data retrieved succeess", res.value)
      : console.log("could not retrieve data")

    return res?.value
  }

  catch(err){
    console.log("~~~ran into some error getting info from db: ~~~\n", err)
  }
}

initdb();
