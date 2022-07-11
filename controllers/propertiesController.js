const admin = (req, res) => {
    res.render('properties/admin', {
        page: 'My Properties',
        navbar: true,
    });
};

const create = (req, res) => {
    res.render('properties/create', {
        page: 'Create Property',
        navbar: true,
    });
};

export { admin, create };
