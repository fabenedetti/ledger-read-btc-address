import "./styles.css";
import { getWallet } from "./Ledger";
import React, { useEffect, useState } from 'react';

export default function App() {
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);
  const readAddress = async () => {
    const { address, error } = await getWallet();
    setAddress(address);
    setError(error);
  }

  return (
    <div className="App">
      <h1>Read BTC address</h1>
      <button onClick={() => readAddress()}>Read</button>
      { error &&
        <h2>Error {error}</h2>
      }
      { !error && address &&
        <h2>Address: {address}</h2>
      }
    </div>
  );
}
