// 有关如何使用预加载脚本的详细信息，请参阅 Electron 文档：
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  minWin: () => {
    ipcRenderer.send('min-win')
  },
  maxWin: () => {
    ipcRenderer.send('max-win')
  },
  restoreWin: () => {
    ipcRenderer.send('restore-win')
  },
  closeWin: () => {
    ipcRenderer.send('close-win')
  }
})