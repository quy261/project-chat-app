import React, { useState } from 'react';
import { db } from '../firebase/config';

const useFirestore = (collection, condition, check) => {
  const [documents, setDocuments] = useState([]);
  React.useEffect(() => {
    var collectionRef = check? db.collection(collection).orderBy('createdAt'): db.collection(collection).orderBy('createdAt', 'desc');
    if (condition) {
      if (!condition.compareValue || !condition.compareValue.length) {
        // reset documents data
        setDocuments([]);
        return;
      }

      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue
      );
    }
    
    // 
    const unsubscribe = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(documents);
    });

    return unsubscribe;
  }, [collection, condition, check]);

  return documents;
};

export default useFirestore;
