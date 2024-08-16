const BreadcrumbsProvider = ({ route }) => {
    const breadcrumbs = routes
        .filter(route => route.path !== '/')
        .map(route => ({
            label: route.breadcrumb,
            path: route.path,
        }));

    return <Breadcrumb items={breadcrumbs} />;
};