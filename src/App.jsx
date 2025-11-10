import { BrowserRouter as Router, Route, Routes } from "react-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout.";
// Pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ActivityPage from "./pages/ActivityPage";
import UserProfile from "./pages/UserProfile";
import PostDetailPage from "./pages/PostDetailPage";

function App() {
  return (
    <>
      <Router >
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="activity" element={<ActivityPage />} />
            <Route path="user-profile" element={<UserProfile />} />

            <Route path="post-detail" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;