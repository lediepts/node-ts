module.exports = {
  apps: [
    {
      name: "node-ts",
      script: "./libs/index.js",
      exec_mode: "cluster",
      out_file: "./pm2/out.log",
      error_file: "./pm2/error.log",
      env: {
        PORT: 8888,
        NODE_ENV: "production"
      },
    }
  ],
};
