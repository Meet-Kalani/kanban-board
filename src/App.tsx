import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";
import Form from "./components/Form";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="add-ticket" element={<Form />} />
      <Route path="tickets/:id" element={<Form />} />
    </Routes>
  );
}

export default App;
