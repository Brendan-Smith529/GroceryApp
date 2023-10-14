import { useGroceriesContext } from "../hooks/useGroceriesContext";
import { useState } from "react";

// Date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GroceryDetails = ({ grocery }) => {
  const { dispatch } = useGroceriesContext();

  // Determines whether edit form is shown
  const [showForm, setShowForm] = useState(false);

  // Properties for edit form
  const [name, setName] = useState(grocery.name);
  const [quantity, setQuantity] = useState(grocery.quantity);
  const [brand, setBrand] = useState(grocery.brand);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const changeWhetherShown = () => {
    setShowForm(!showForm);
  }

  const handleDeleteClick = async() => {
    const response = await fetch('/api/groceries/' + grocery._id, {
      method: 'DELETE'
    });

    const json = await response.json();

    if (response.ok)
      dispatch({type: 'DELETE_GROCERY', payload: json});
  };

  const ensureDelete = async() => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");

    if (confirmation)
      handleDeleteClick();
  };

  const editForm = () => {
    const handleSubmit = async(e) => {
      e.preventDefault();

      const newGrocery = { name, quantity, brand };

      const response = await fetch('/api/groceries/' + grocery._id, {
        method: 'PATCH',
        body: JSON.stringify(newGrocery),
        headers: {
          'Content-Type': 'application/JSON'
        }
      });

      const json = await response.json();

      if (!response.ok)
      {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }


      if (response.ok)
      {
        changeWhetherShown();
        const updatedGroceries = await fetch('/api/groceries');
        const updatedJson = await updatedGroceries.json();

        if (updatedGroceries.ok)
          dispatch({type: 'SET_GROCERIES', payload: updatedJson});
      }
    }

    return (
      <form className="create" onSubmit={handleSubmit}>
        <label>Item Name</label>
        <input
          type="text"
          value={name}
          className={emptyFields.includes('name') ? 'error' : ''}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Quantity</label>
        <input
          type="number"
          value={quantity}
          className={emptyFields.includes('quantity') ? 'error' : ''}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label>Brand</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={emptyFields.includes('brand') ? 'error' : ''}
        />

        {error && <div className="error">{error}</div>}
        <button>Done</button>
        <button id="cancel" onClick={changeWhetherShown}>Cancel</button>
      </form>
    )
  };

  return (
    <div className="grocery-details">
      <h4>{grocery.name}</h4>
      <p><strong>Quantity:&nbsp;&nbsp;</strong>{grocery.quantity}</p>
      <p><strong>Brand:&nbsp;&nbsp;</strong>{grocery.brand}</p>
      <p>Created {formatDistanceToNow(new Date(grocery.createdAt), { addSuffix: true })}</p>
      <span id="delete" className="material-symbols-outlined" onClick={ensureDelete}>Delete</span>
      <span id="update" className="material-symbols-outlined" onClick={changeWhetherShown}>Edit</span>
      {showForm && editForm()}
    </div>
  );
}

export default GroceryDetails;
