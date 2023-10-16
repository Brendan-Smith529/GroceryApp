import { useState } from "react"
import { useGroceriesContext } from "../hooks/useGroceriesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GroceryForm = () => {
  const { dispatch } = useGroceriesContext();
  const { user } = useAuthContext();

  // States
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [brand, setBrand] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async(e)  => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const grocery = {name, quantity, brand};

    const response = await fetch('/api/groceries', {
      method: 'POST',
      body: JSON.stringify(grocery),
      headers: {
        'Content-Type': 'application/JSON',
        'Authorization' : `Bearer ${user.token}` // Template
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
      setName('');
      setQuantity('');
      setBrand('');
      setError(null);
      setEmptyFields([]);
 
      const updatedGroceries = await fetch('/api/groceries', {
        headers: {'Authorization': `Bearer ${user.token}`},
      });

      const updatedJson = await updatedGroceries.json();
        
      if (updatedGroceries.ok)
        dispatch({type: 'SET_GROCERIES', payload: updatedJson});
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add Item(s) To Your List</h3>

      <label>Item Name</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Quantity</label>
      <input
        type="number"
        onChange={(e) => setQuantity(e.target.value)}
        value={quantity}
        className={emptyFields.includes('quantity') ? 'error' : ''}
      />

      <label>Brand:</label>
      <input
        type="text"
        onChange={(e) => setBrand(e.target.value)}
        value={brand}
        className={emptyFields.includes('brand') ? 'error' : ''}
      />
      
      <button>Add item(s)</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default GroceryForm;
