import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomeComponent from "./pages/HomeComponent";
import MovieDetails from "./pages/MovieDetailsComponent";
import { NotesProvider } from "./context/NoteContext";
import HeaderComponent from "./components/HeaderComponent";
import SearchResults from "./components/SearchResultCompontent";

function App() {
  return (
    <NotesProvider>
      <Router>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<SearchResults />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </NotesProvider>
  );
}

export default App;
