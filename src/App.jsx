import { BrowserRouter as Router, Route, Routes } from "react-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
// Pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ActivityPage from "./pages/ActivityPage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import paths from "./paths";
import FollowingPage from "./pages/FollowingPage";
import GhostPost from "./pages/GhostPost";

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
            <Route path={paths.followingPage} element={<FollowingPage />} />
            <Route path={paths.ghostPost} element={<GhostPost />} />

            <Route path="/:username/post-detail/:id" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;