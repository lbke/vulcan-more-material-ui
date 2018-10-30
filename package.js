Package.describe({
  name: "vulcan:more-material-ui"
});

Package.onUse(api => {
  api.use(["vulcan:core", "vulcan:menu", "vulcan:more-helpers"]);

  api.addFiles(
    ["lib/stylesheets/roboto.css"], //, "lib/stylesheets/ReactToastify.min.css"],
    "client"
  );

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
