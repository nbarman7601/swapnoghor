import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './breadcrumb.css';
const Breadcrumb = ({ routes }) => {
  const location = useLocation();
  
  // Extract the current path from the location object
  const currentPath = location.pathname;

  // Find the breadcrumb data for the current path
  const getBreadcrumbs = (routes) => {
    const breadcrumbs = [];
    let path = '';

    const findBreadcrumbs = (routes, basePath = '') => {
      for (const route of routes) {
        const fullPath = `${basePath}/${route.path}`.replace(/\/{2,}/g, '/');
        
        if (currentPath.startsWith(fullPath)) {
          breadcrumbs.push({
            path: fullPath,
            breadcrumb: route.breadcrumb,
          });

          if (route.children) {
            findBreadcrumbs(route.children, fullPath);
          }
        }
      }
    };

    findBreadcrumbs(routes);
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(routes);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="breadcrumb-item">
            {index < breadcrumbs.length - 1 ? (
              <Link to={crumb.path}>{crumb.breadcrumb}</Link>
            ) : (
              crumb.breadcrumb
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
