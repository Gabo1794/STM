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

export const GetUserInformation = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {

      const documentInfo = doc(store, Documents.Users, userId);
      const userInfo = await getDoc(documentInfo);

      if (userInfo && !userInfo.data())
        reject({
          status: 500,
          message: "Error al leer los datos del usuario",
        });

        resolve({
            Id: userId,
            ...userInfo.data()
        })

    } catch (err) {
      reject(err);
    }
  });
};
