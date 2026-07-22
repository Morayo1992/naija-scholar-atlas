import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/layout/layout";
import { Loader2 } from "lucide-react";

const Home = lazy(() => import("@/pages/home"));
const SearchPage = lazy(() => import("@/pages/search"));
const Categories = lazy(() => import("@/pages/categories"));
const CategoryDetail = lazy(() => import("@/pages/category-detail"));
const ScholarshipDetail = lazy(() => import("@/pages/scholarship-detail"));
const Matcher = lazy(() => import("@/pages/matcher"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const Profile = lazy(() => import("@/pages/profile"));
const Deadlines = lazy(() => import("@/pages/deadlines"));
const Faq = lazy(() => import("@/pages/faq"));
const About = lazy(() => import("@/pages/about"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading page">
      <Loader2 className="size-6 animate-spin text-primary" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:slug" element={<CategoryDetail />} />
            <Route path="scholarships/:slug" element={<ScholarshipDetail />} />
            <Route path="matcher" element={<Matcher />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="deadlines" element={<Deadlines />} />
            <Route path="faq" element={<Faq />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
