//handle setupevents as quickly as possible
const setupEvents = require('./installers/setupEvents')
if (setupEvents.handleSquirrelEvent()) {
   // squirrel event handled and app will exit in 1000ms, so don't do anything else
   return;
}

const electron=require('electron');
const url=require('url');
const path=require('path');
const ejs=require('ejs');

const {app, BrowserWindow, Menu}=electron;

const autoUpdater = require('./auto-updater');
if(require('electron-squirrel-startup')) return;

// SET ENV
process.env.NODE_ENV='production';

let mainWindow;

app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({width:1050, height: 800});
    // Load html into window
    
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    mainWindow.on('close', function(){
        app.quit();
    });

    // Build menu from temlate
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
    autoUpdater.checkForUpdates();
});


// Create menu template
const mainMenuTemplate=[
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                accelerator: process.platform == "darwin" ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

// Add developer tools item if not in prod
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == "darwin" ? 'Command+I' : 'Ctrl+I',
                click(item, focuseWindow){
                    focuseWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}