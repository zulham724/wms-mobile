module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@tabs": "./src/tabs",
            '@context': "./src/context",
            '@navigation': "./src/navigation",
            '@assets': "./src/assets",
            '@types': "./src/types",
            '@i18n': "./src/i18n",
          },
        },
      ],
    ],
  };
};
