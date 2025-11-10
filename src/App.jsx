import { BrowserRouter as Router, Route, Routes } from "react-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout.";
// Pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ActivityPage from "./pages/ActivityPage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import paths from "./paths";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path={paths.searchPage} element={<SearchPage />} />
            <Route path={paths.activityPage} element={<ActivityPage />} />
            <Route path={paths.profilePage} element={<ProfilePage />} />
            <Route path="post-detail/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;