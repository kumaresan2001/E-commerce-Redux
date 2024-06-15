import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useState } from "react";

const AddProductCart = () => {
  const [productCounts, setProductCounts] = useState({});

  const addedProducts = useSelector(
    (state) => state.uiThemesReducer.addedProducts
  );

  const products = useSelector((state) => state.productAPIReducer.value);

  const addQuantity = (productId) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max((prevCounts[productId] || 0) - 1, 0),
    }));
  };

  // Calculate total amount
  const total = products
    ? addedProducts.reduce((acc, productId) => {
        const product = products.find((p) => p._id === productId);
        const count = productCounts[productId] || 0;
        if (product) {
          return acc + product.price * count;
        }
        return acc;
      }, 0)
    : 0;

  return (
    <div>
      <div className="mt-5">
        <Table
          striped
          hover
          bordered
          className="text-center container table align-middle"
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {addedProducts.map((productId, index) => {
              const product = products
                ? products.find((p) => p._id === productId)
                : null;
              const count = productCounts[productId] || 0;

              if (product) {
                return (
                  <tr key={productId}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={product.image}
                        alt=""
                        width={"120px"}
                        height={"80px"}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.description}</td>
                    <td>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-plus-circle"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                        onClick={() => addQuantity(productId)}
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                      </svg>
                      <span>{count}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        className="bi bi-dash-circle"
                        viewBox="0 0 16 16"
                        style={{ cursor: "pointer" }}
                        onClick={() => removeFromCart(productId)}
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                      </svg>
                    </td>
                    <td>&#8377; {product.price}</td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </Table>
        {/* Display total amount */}
        <h2 className="text-end mx-5 px-5 text-nowrap">
          Total = &#8377; {total}
        </h2>
      </div>
    </div>
  );
};

export default AddProductCart;
