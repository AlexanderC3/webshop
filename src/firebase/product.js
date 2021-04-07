import { firestore } from "./config";

export const createProduct = async (data) => {
  // get a reference to the firestore document
  const docRef = firestore.collection("products");

  // create product object
  const Product = {
    description: data.description,
    name: data.name,
    price: data.price,
    stock: Number(data.stock),
    color: data.color,
  };

  // writr to CLoud Firestore
  return docRef.add(Product);
};

export const updateProduct = async (product) => {
  product.stock = Number(product.stock);

  const docRef = firestore.doc(`/products/${product.uid}`);
  return docRef.update(product);
};
