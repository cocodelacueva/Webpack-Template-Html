# Webpack Template

Para trabajar con html sencillo, tipo landing pages. Permite la transpilación de js, transforma el sass al css con autoprefixer. Y además copia los html de la carpeta html.

## Pluggins dev incluídos

A grandes rasgos:  
WEBPACK: Archivo principal, trae el cli y el server para develop  
BABEL: Permite trasnspilar la nueva version de js a las viejas versiones para usarla sin problemas  
AUTOPREFIXER: Genera los prefixer de css necesarios para todos los navegadores indicados  
SASS LOADER, para manejar sass.  
FILE-LOADER, para manejar archivos, como imágenes, tipografías, etc.  
CSS LOADER, maneja los estilos  
COPYWEBPACKPLUGIN: Copia las todas las imagenes a la carpeta public  
HTMLWEBPACKPLUGIN: crea el archivo html y le agrega el link a estilos y el link de script  
MINICSSEXTRACTPLUGIN: extrae el css para colocarlo en un archivo style.css separado del js  

### Detalle:   
* @babel/core
* @babel/preset-env
* autoprefixer
* babel-loader 
* copy-webpack-plugin
* css-loader
* file-loader
* html-webpack-plugin
* mini-css-extract-plugin
* node-sass
* postcss-loader
* sass-loader
* style-loader
* webpack
* webpack-cli
* webpack-dev-server

## Otros pluggins para usar

### Json Loader

Importa un json como una variable y lo convierte en un objeto js.

* URL: https://github.com/webpack-contrib/json-loader
* INSTALAR: npm install --save-dev json-loader
* USO: 

```const json = require('./file.json');````

* webpack.config.js:

```
module.exports = {
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
```

### File Include Webpack pluggin

Este permite crear templates de html, por ejemplo navbar e incluirlo en cualquier lado del html cuando se construye con npm run build. Funciona como el include de php, pero lo incluye al construir el sitio.

* URL: https://github.com/Vishal0203/file-include-webpack-plugin
* INSTALAR: npm install --save-dev file-include-webpack-plugin
* USO: Crear otra carpeta junto a html que sea templates y allí poner los html que se van a tomar como template
* Incluir templates en un html: 

```@@include('../templates/header.html')```

* webpack.config.js (ponerlo debajo de HtmlWebpackPlugin): 

```
const FileIncludeWebpackPlugin = require('file-include-webpack-plugin')

module.exports = {
  plugins: [
    new FileIncludeWebpackPlugin(
      {
        source: './src/templates', // relative path to your templates
        replace: [{
          regex: /\[\[FILE_VERSION]]/, // additional things to replace
          to: 'v=1.0.0',
        }],
      },
    )
  ]
}

````
