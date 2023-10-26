import { store } from "../../firebase/config";
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { Documents } from "../../constants/documents";

export const GetUserEnterpriseInformation = (userId) => {
    return new Promise( async (resolve, reject) => {
        try{

            const queryDocument = query(collection(store, Documents.Enterprises), where('Users', 'array-contains', userId));

            const enterpriseInfo = await getDocs(queryDocument)

            if (enterpriseInfo && enterpriseInfo.size === 0)
            reject({
              status: 500,
              message: "Usuario no asignado a una empresa",
            });

            let enterprise = [];
            enterpriseInfo.forEach((doc) => { 
                enterprise.push({
                    Id: doc.id,
                    ...doc.data()
                })
            });

            resolve(enterprise);
        }
        catch(err){
            reject(err);
        }
    });
}