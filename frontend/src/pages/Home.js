import { useEffect } from "react";
import { useGroceriesContext } from "../hooks/useGroceriesContext";

// Components
import GroceryDetails from '../components/GroceryDetails';
import GroceryForm from '../components/GroceryForm';

const Home = () => {
  const {groceries, dispatch} = useGroceriesContext()

  useEffect(() => {
    const fetchGroceries = async() => {
      const response = await fetch("/api/groceries");
      const json = await response.json();

      if (response.ok)
        dispatch({type: 'SET_GROCERIES', payload: json});
    }

    fetchGroceries();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="groceries">
        {groceries && groceries.map((grocery) => (
          <GroceryDetails key={grocery._id} grocery={grocery} />
        ))}
      </div>
      <GroceryForm />
    </div>
  );
}

export default Home;
