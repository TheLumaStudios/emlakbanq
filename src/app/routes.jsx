import { createBrowserRouter } from 'react-router-dom'
import RootLayout from '../layouts/RootLayout'
import AdminLayout from '../layouts/AdminLayout'
import Home from '../pages/Home'
import Properties from '../pages/Properties'
import PropertyDetail from '../pages/PropertyDetail'
import Areas from '../pages/Areas'
import AreaDetail from '../pages/AreaDetail'
import About from '../pages/About'
import Contact from '../pages/Contact'
import GoldenVisa from '../pages/GoldenVisa'
import BuyerGuides from '../pages/BuyerGuides'
import BuyerGuideDetail from '../pages/BuyerGuideDetail'
import Insights from '../pages/Insights'
import Blog from '../pages/Blog'
import BlogPost from '../pages/BlogPost'
import Privacy from '../pages/Privacy'
import Terms from '../pages/Terms'
import NotFound from '../pages/NotFound'
import { ROUTES } from '../config/routes'

// Admin pages
import AdminLogin from '../pages/admin/Login'
import AdminDashboard from '../pages/admin/Dashboard'
import AdminProperties from '../pages/admin/Properties'
import AdminPropertyForm from '../pages/admin/PropertyForm'
import AdminAreas from '../pages/admin/Areas'
import AdminAreaForm from '../pages/admin/AreaForm'
import AdminBlog from '../pages/admin/Blog'
import AdminBlogForm from '../pages/admin/BlogForm'
import AdminBuyerGuides from '../pages/admin/BuyerGuides'
import AdminBuyerGuideForm from '../pages/admin/BuyerGuideForm'
import AdminGoldenVisa from '../pages/admin/GoldenVisa'
import AdminInsights from '../pages/admin/Insights'
import AdminContactSubmissions from '../pages/admin/ContactSubmissions'
import AdminSettings from '../pages/admin/Settings'

// Rental Management pages
import RentalDashboard from '../pages/admin/RentalDashboard'
import Tenants from '../pages/admin/Tenants'
import TenantForm from '../pages/admin/TenantForm'
import RentalContracts from '../pages/admin/RentalContracts'
import RentalContractForm from '../pages/admin/RentalContractForm'
import RentalPayments from '../pages/admin/RentalPayments'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.PROPERTIES, element: <Properties /> },
      { path: ROUTES.PROPERTY_DETAIL, element: <PropertyDetail /> },
      { path: ROUTES.AREAS, element: <Areas /> },
      { path: ROUTES.AREA_DETAIL, element: <AreaDetail /> },
      { path: ROUTES.ABOUT, element: <About /> },
      { path: ROUTES.CONTACT, element: <Contact /> },
      { path: ROUTES.GOLDEN_VISA, element: <GoldenVisa /> },
      { path: ROUTES.BUYER_GUIDES, element: <BuyerGuides /> },
      { path: ROUTES.BUYER_GUIDE_DETAIL, element: <BuyerGuideDetail /> },
      { path: ROUTES.INSIGHTS, element: <Insights /> },
      { path: ROUTES.BLOG, element: <Blog /> },
      { path: ROUTES.BLOG_POST, element: <BlogPost /> },
      { path: ROUTES.PRIVACY, element: <Privacy /> },
      { path: ROUTES.TERMS, element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'properties', element: <AdminProperties /> },
      { path: 'properties/new', element: <AdminPropertyForm /> },
      { path: 'properties/:id', element: <AdminPropertyForm /> },
      { path: 'areas', element: <AdminAreas /> },
      { path: 'areas/new', element: <AdminAreaForm /> },
      { path: 'areas/:id', element: <AdminAreaForm /> },
      { path: 'blog', element: <AdminBlog /> },
      { path: 'blog/new', element: <AdminBlogForm /> },
      { path: 'blog/:id', element: <AdminBlogForm /> },
      { path: 'buyer-guides', element: <AdminBuyerGuides /> },
      { path: 'buyer-guides/new', element: <AdminBuyerGuideForm /> },
      { path: 'buyer-guides/:id', element: <AdminBuyerGuideForm /> },
      { path: 'golden-visa', element: <AdminGoldenVisa /> },
      { path: 'insights', element: <AdminInsights /> },
      { path: 'contact', element: <AdminContactSubmissions /> },
      { path: 'settings', element: <AdminSettings /> },
      // Rental Management
      { path: 'rentals', element: <RentalDashboard /> },
      { path: 'tenants', element: <Tenants /> },
      { path: 'tenants/new', element: <TenantForm /> },
      { path: 'tenants/:id', element: <TenantForm /> },
      { path: 'contracts', element: <RentalContracts /> },
      { path: 'contracts/new', element: <RentalContractForm /> },
      { path: 'contracts/:id', element: <RentalContractForm /> },
      { path: 'payments', element: <RentalPayments /> },
    ],
  },
])
