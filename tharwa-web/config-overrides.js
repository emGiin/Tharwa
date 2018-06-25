const { injectBabelPlugin } = require("react-app-rewired");
const rewireLess = require("react-app-rewire-less");

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ["import", { libraryName: "antd", style: true }],
    config
  );
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#30A7A3",
      "@layout-trigger-background": "#001a21",
      "@layout-sider-background" : "#000a0c",
      // "@component-background" : "@layout-sider-background",
      "@menu-dark-bg" : "@layout-sider-background"
    }
  })(config, env);

  return config;
};
