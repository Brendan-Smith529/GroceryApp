import { useGroceriesContext } from "../hooks/useGroceriesContext";

// Date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GroceryDetails = ({ grocery }) => {
  const { dispatch } = useGroceriesContext();

  const handleDeleteClick = async() => {
    const response = await fetch('/api/groceries/' + grocery._id, {
      method: 'DELETE'
    });

    const json = await response.json()

    if (response.ok)
      dispatch({type: 'DELETE_GROCERY', payload: json});
  };

  const ensureDelete = async() => {
    const confirmation = window.confirm("Are you sure you want to delete this item?");

    if (confirmation)
      handleDeleteClick();
  }

  return (
    <div className="grocery-details">
      <h4>{grocery.name}</h4>
      <p><strong>Quantity:&nbsp;&nbsp;</strong>{grocery.quantity}</p>
      <p><strong>Brand:&nbsp;&nbsp;</strong>{grocery.brand}</p>
      <p>Created {formatDistanceToNow(new Date(grocery.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={ensureDelete}>Delete</span>
    </div>
  );
}

export default GroceryDetails;
