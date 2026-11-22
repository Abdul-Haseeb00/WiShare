import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Header from "../Components/Header";
import { Homepage } from "../Pages/Homepage";
import SharePage from "../Pages/SharePage";
import AboutPage from "../Pages/Aboutus";
import TermsPage from "../Pages/TermofUse";
import PrivacyPage from "../Pages/PrivacyPolicy";
import ContactPage from "../Pages/Contactus";
import HelpPage from "../Pages/HelpCenter";

const router = createBrowserRouter([
  // Layout with Header + Footer
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "about-us",
        element: <AboutPage />,
      },
      {
        path: "terms",
        element: <TermsPage />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
    ],
  },
  // Share page - Header only, no Footer (full screen)
  {
    path: "/share",
    element: (
      <>
        <Header />
        <SharePage />
      </>
    ),
  },
]);

export default router;