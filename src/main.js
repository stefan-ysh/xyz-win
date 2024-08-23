const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron')
const path = require('path')

// 在安装/卸载时，Windows 上创建/删除快捷方式。
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  // 创建浏览器窗口。
  const win = new BrowserWindow({
    // 窗口宽度
    width: 950,
    // 窗口高度
    height: 750,
    // 窗口最小宽度
    // minWidth: 850,
    // 窗口最小高度
    // minHeight: 650,
    // 窗口宽高不包含边框
    // useContentSize: true,
    // 窗口居中
    center: true,
    // 窗口边框
    // frame: false,
    // 窗口透明（在 Windows 上，仅在无边框窗口下起作用）
    // transparent: true,
    // 窗口背景颜色
    // backgroundColor: 'rgba(0, 0, 0, 0)',
    // 设置窗口图标
    icon: path.join(__dirname, './icon/xyz.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // 加载应用程序的 index.html。
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    win.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }

  // 打开开发者工具。
  win.webContents.openDevTools()

  // 禁用菜单
  win.setMenu(null)

  // 最小化窗口
  ipcMain.on('min-win', () => {
    win.minimize()
  })

  // 最大化窗口
  ipcMain.on('max-win', () => {
    win.maximize()
    // 禁止手动调整窗口大小
    win.setResizable(false)
  })

  // 恢复窗口大小
  ipcMain.on('restore-win', () => {
    win.unmaximize()
    // 禁止手动调整窗口大小
    win.setResizable(true)
  })

  // 关闭窗口
  ipcMain.on('close-win', () => {
    win.hide()
  })

  // 取消 win.close() 默认事件
  win.on('close', (event) => {
    event.preventDefault()
    win.hide()
  })

  // 初始化系统托盘
  const tray = new Tray(path.join(__dirname, `./icon/xyz.ico`))

  // 设置鼠标移入托盘显示文字
  tray.setToolTip('小宇宙')

  // 初始化托盘菜单
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开 小宇宙      ',
      click: () => {
        win.show()
      }
    },
    {
      label: '退出 小宇宙      ',
      click: () => {
        // 由于 win.close() 默认事件失效，使用 win.destroy() 强制关闭窗口
        win.destroy()
        app.quit()
      }
    }
  ])

  // 设置托盘菜单
  tray.setContextMenu(contextMenu)

  // 单击托盘显示窗口
  tray.on('click', () => {
    win.show()
  })
}

// 当 Electron 完成初始化并准备好创建浏览器窗口时，将调用此方法。
// 某些 API 只能在此事件发生后使用。
app.on('ready', createWindow)

// 当所有窗口都关闭时退出，macOS 除外。
// 在 macOS 中，应用程序及其菜单栏通常会保持活动状态，直到用户使用 Cmd + Q 显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在 maxOS 上，当单击停靠图标并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// 在此文件中，你可以包含应用程序特定主进程代码的其余部分。
// 你也可以将它们放在单独的文件中并在此处导入。