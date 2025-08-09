import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import Responses from "./pages/Responses";
import FillForm from "./pages/FillForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateForm />} />
        <Route path="/form/:id" element={<PreviewForm />} />
        <Route path="/responses/:id" element={<Responses />} />
        <Route path="/fill/:id" element={<FillForm />} />
      </Routes>
    </Router>
  );
}
