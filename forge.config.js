module.exports = {
  packagerConfig: {
    // 应用程序图标
    icon: 'public/icon/xyz.ico',
    // 将源代码打包为 asar 压缩包，防止源代码直接暴露
    asar: true
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // 安装程序图标
        setupIcon: 'public/icon/xyz.ico',
      },
    },
    {
      name: '@electron-forge/maker-zip',
      // 打包方式对应的平台
      platforms: ['darwin', 'linux'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // build 可以指定多个条目构建，可以是主进程、预加载脚本、辅助进程等。
        // 如果你熟悉 Vite 的配置，它看起来真的很熟悉。
        build: [
          {
            // entry 只是 config 对应文件中 build.lib.entry 的别名。
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
  ],
}