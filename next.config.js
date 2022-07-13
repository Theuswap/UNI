module.exports = {
    trailingSlash: true,
    exportPathMap: function() {
        const paths = {
            "/": { page: "/" },
            "/about": { page: "/about" }
        };

        return paths;
    }
};