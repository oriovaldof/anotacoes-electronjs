const {app, BrowserWindow, Menu, Tray} = require('electron');

app.setAppUserModelId('br.com.oriweb.anotacoes');

function createWindow(){
    let mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        icon: __dirname+"/icon.png"
    });

    mainWindow.loadFile(`${__dirname}/src/index.html`);
    mainWindow.on('closed', ()=>{
        mainWindow = null
    });
    //tirar menu padrao
    mainWindow.setMenu(null);

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Mostrar Aplicativo",
            click: function(){
                mainWindow.show();
            }
        },
        {
            label: "Fechar",
            click: function(){
                app.isQuitting = true;
                app.quit();
            }
        }
    ]);

    const tray = new Tray(__dirname+"/icon.png");
    tray.setContextMenu(contextMenu);

    mainWindow.on('close', function(e){
        if(!app.isQuitting){
            e.preventDefault();
            mainWindow.hide();
        }
    });


}
app.on('ready',createWindow);