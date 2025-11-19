import { BrowserRouter as Router, Route, Routes } from "react-router";

// Layouts
import DefaultLayout from "./layouts/DefaultLayout";
// Pages
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ActivityPage from "./pages/ActivityPage";
import PostDetailPage from "./pages/PostDetailPage";
import ProfilePage from "./pages/ProfilePage";
import FollowingPage from "./pages/FollowingPage";
import GhostPost from "./pages/GhostPost";
import paths from "./paths";

function App() {
  return (
    <>
      <Router basename="/thread-clone-react">
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<HomePage />} />
            <Route path={paths.searchPage} element={<SearchPage />} />
            <Route path={paths.activityPage} element={<ActivityPage />} />
            <Route path={paths.followingPage} element={<FollowingPage />} />
            <Route path={paths.ghostPost} element={<GhostPost />} />

            {/* Profile tab paths */}
            <Route path=":username" element={<ProfilePage />} />
            <Route path=":username/replies" element={<ProfilePage />} />
            <Route path=":username/media" element={<ProfilePage />} />
            <Route path=":username/reposts" element={<ProfilePage />} />

            {/* Post detail */}
            <Route path=":username/post-detail/:postId" element={<PostDetailPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;