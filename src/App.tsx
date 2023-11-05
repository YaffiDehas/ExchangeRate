
import React from "react";
import { Routes, Route, useParams } from "react-router-dom";
import { Home } from './components/Home';

function App() {
  let { countryName } = useParams();
  return (
      <div>
        <Routes>
          <Route
              path={'/'}
              element={<Home/>}
          />
        </Routes>
      </div>
  );
}

export default App;
