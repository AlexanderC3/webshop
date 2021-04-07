import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase/config";
import MaterialTable from "material-table";
import "../../semantic-ui.custom.css";
import CIcon from "@coreui/icons-react";
import { freeSet } from "@coreui/icons";
import EditProduct from "./EditProduct";
import { Link } from "react-router-dom";

const ProductsList = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const docRef = firestore.collection("products");

    docRef.onSnapshot((querySnapshot) => {
      const productarray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productarray);
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "5%" }}>
      <div className="db-table">
        <MaterialTable
          title="products overview"
          data={products}
          columns={[
            { title: "name", field: "name", defaultSort: "asc" },
            { title: "price", field: "price" },
            { title: "stock", field: "stock" },
            { title: "description", field: "description" },
            {
              title: "edit",
              field: "",
              className: "last-col",
              sorting: false,
              render: (rowData) => (
                <Link
                  to={{
                    pathname: "/editproduct",
                    state: { product: rowData.id },
                  }}
                >
                  <CIcon content={freeSet.cilPencil} />
                </Link>
              ),
            },
          ]}
          options={{
            search: true,
            filtering: true,
            exportButton: true,
            headerStyle: {
              backgroundColor: "#cecaca",
              color: "#FFF",
            },
            pageSizeOptions: [5, 10, 20, 25],
          }}
        />
      </div>
    </div>
  );
};

export default ProductsList;
