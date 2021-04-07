import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import { useForm } from "react-hook-form";
import "../../semantic-ui.custom.css";
import { updateProduct } from "../../firebase/product";

const EditProduct = (props) => {
  const [isLoading, setLoading] = useState(false);
  const { register, setValue, handleSubmit } = useForm();
  var product = "";

  product = props.location.state.product;

  useEffect(() => {
    const docRef = firestore.collection("products").doc(product);

    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        var productarray = doc.data();

        const formData = Object.entries(productarray).map((entry) => ({
          [entry[0]]: entry[1],
        }));
        setValue(formData);
      }
    });
    return unsubscribe;
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setLoading(true);
      data.uid = product;
      await updateProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      props.history.push(`/productsList`);
    }
  };

  const formClassname = `ui big form wide column ${isLoading ? "loading" : ""}`;

  return (
    <section>
      <div>
        <div className="ui grid stackable">
          <form className={formClassname} onSubmit={handleSubmit(onSubmit)}>
            <div className="eight wide field" style={{ margin: "auto" }}>
              <label>
                Name
                <input type="text" name="name" htmlFor="name" ref={register} />
              </label>
            </div>

            <div className="eight wide field" style={{ margin: "auto" }}>
              <label>
                Price
                <input
                  type="text"
                  name="price"
                  htmlFor="price"
                  ref={register}
                />
              </label>
            </div>

            <div className="eight wide field" style={{ margin: "auto" }}>
              <label>
                color
                <input
                  type="text"
                  name="color"
                  htmlFor="color"
                  ref={register}
                />
              </label>
            </div>

            <div className="eight wide field" style={{ margin: "auto" }}>
              <label>
                Stock
                <input
                  type="text"
                  name="stock"
                  htmlFor="stock"
                  ref={register}
                />
              </label>
            </div>

            <div className="eight wide field" style={{ margin: "auto" }}>
              <label>
                Description
                <textarea
                  name="description"
                  cols="40"
                  rows="5"
                  ref={register}
                />
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
              submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
