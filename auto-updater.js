const { app, autoUpdater, dialog, BrowserWindow } = require('electron');

const isDevelopment = app.getPath('exe').indexOf('electron') !== -1;

const baseUrl = 'https://github.com/ipteamlab/squareroot';

const platform = process.platform;
console.log(platform)
const currentVersion = app.getVersion();
console.log(currentVersion)
const releaseFeed = `${baseUrl}/releases/tag/${currentVersion}`;
console.log(releaseFeed)
if (isDevelopment) {
  console.info('[AutoUpdater]', 'In Developement Mode. Skipping');
} else {
  console.info('[AutoUpdater]', `Setting release feed to ${releaseFeed}.`);
  autoUpdater.setFeedURL(releaseFeed);
}

autoUpdater.addListener('update-available', (event, releaseNotes, releaseName) => {
  console.log('UPDATED!', event, releaseNotes, releaseName);
  dialog.showMessageBox({
    type: 'question',
    buttons: ['Install & Relaunch', 'Not Now'],
    defaultId: 0,
    message: `${app.getName()} has been updated!`,
    detail: 'An update has been downloaded and can be installed now.'
  }, response => {
    if (response === 0) {
      setTimeout(() => {
        app.removeAllListeners('window-all-closed');
        BrowserWindow.getAllWindows().forEach(win => win.close());
        autoUpdater.quitAndInstall();
      }, 0);
    }
  });
});

module.exports = autoUpdater;
