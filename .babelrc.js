module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    browsers: ["> 1%", "last 2 versions"],
                    node: "current",
                },
            },
        ],
        "@babel/preset-typescript",
    ],
};
