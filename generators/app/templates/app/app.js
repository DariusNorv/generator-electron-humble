'use strict';
const electron = require('electron');
const app = electron.app;
const ipcMain = electron.ipcMain;

const debug = true;

if(debug == true) {
	require('electron-debug')();
}

let mainWindow = null;

process.on('uncaughtException', (error) => {
	console.log(error);
});

function createWindow() {
	const win = new electron.BrowserWindow({
		height: 1024,
		width: 768

	});

	win.loadURL(`file://${__dirname}/res/index.html`);

	win.webContents.session.clearCache(() => {});

	win.on('closed', () => {
		mainWindow = null;
	});

	return win;
}

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createWindow();
		mainWindow.setMenu(null);
	}
});

app.on('ready', () => {
	mainWindow = createWindow();
	mainWindow.setMenu(null);
});