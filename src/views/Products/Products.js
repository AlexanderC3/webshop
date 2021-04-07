import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { firestore } from "../../firebase/config";
import { createProduct } from "../../firebase/product";
import "../../semantic-ui.custom.css";

const Products = (props) => {
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    const docRef = firestore.collection("products");
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const productList = doc.data();
        setProducts(productList);
      }
    });
    return unsubscribe;
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await createProduct({ uid: params.id, ...data });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      props.history.push("/dashboard");
    }
  };

  const formClassname = `ui big form twelve wide column ${
    isLoading ? "loading" : ""
  }`;

  return (
    <div>
      <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
        <div className="eight wide field" style={{ margin: "auto" }}>
          <label>
            Name
            <input type="text" name="name" required ref={register} />
          </label>
        </div>
        <div className="eight wide field" style={{ margin: "auto" }}>
          <label>
            Description
            <input type="text" name="description" required ref={register} />
          </label>
        </div>
        <div className="eight wide field" style={{ margin: "auto" }}>
          <label>
            Color
            <input type="text" name="color" required ref={register} />
          </label>
        </div>

        <div className="eight wide field" style={{ margin: "auto" }}>
          <label>
            Price
            <input type="text" name="price" required ref={register} />
          </label>
        </div>
        <div className="eight wide field" style={{ margin: "auto" }}>
          <label>
            Stock
            <input type="number" name="stock" required ref={register} />
          </label>
        </div>

        <button
          type="submit"
          className="ui submit large grey button right floated"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%",
            marginTop: "20px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Products;
