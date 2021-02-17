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

### html-loader

Lo que hace es cargar como string un html. Por lo que permite utilizarlo en js. Pero utilizándolo en el html permite crear templates parciales, por ejemplo navbar e incluirlo en cualquier lado del html cuando se construye con npm run build. Funciona como el include de php, pero lo incluye al construir el sitio.


* URL: https://webpack.js.org/loaders/html-loader/
* EJEMPLO: https://github.com/jantimon/html-webpack-plugin/tree/master/examples/custom-template
* INSTALAR: npm install --save-dev html-loader
* USO: en el html 
```
<%= require('html-loader!./partial.html') %>
````

### Localization with webpack

Para utilizar localization de las pagina es necesario utilizar el pluggin "webpack-static-i18n-plugin". El mismo funciona con la etiqueta data-t. y varios archivos .json que definen los lenguajes de estas etiquetas.

https://github.com/BenceSzalai/webpack-static-i18n-plugin

#### USO:

1 Instalamos pluggin:

```bash
yarn add -D webpack-static-i18n-plugin
```

```bash
npm install --save webpack-static-i18n-plugin
```

2 en la carpeta src, creamos una carpeta locales con los distintos .json con los lenguajes:

```json
{
    "head": {
      "title": "Dealership"
    },
    "component": {
      "heading": "For sale",
      "note": "Only the best",
      "link": {
        "url": "http://www.google.com",
        "title": "Google.com"
      }
    }
  }
```

3 En el archivo "webpack.config.js" le agregamos la configuración.

```js
const WebpackStaticI18NPlugin = require('webpack-static-i18n-plugin');
```

```js
pluggins: [
  //debajo de HtmlWebpackPlugin()
  new WebpackStaticI18NPlugin({
      locale : 'en', // The default locale
      locales: ['en', 'de'],
      outputDefault: '__file__', // default: '__file__'
      outputOther  : '__lng__-__file__', // default: '__lng__/__file__'
      localesPath  : path.join(__dirname, 'src/locales/'),
      files        : '*.html',
  })
]
```

4 Finalmente en el html definimos las etiquetas

```html
<title data-t="head.title"></title>
 <span data-t>component.heading</span>
 <span data-t>component.note</span>
 <p><a data-attr-t href-t="component.link.url" data-t="component.link.title"></a></p>
```


## Dividir codigo  

Esto permite dividir el bundle script si es muy grande. Hay muchísimas opciones y depende un poco el trabajo que se está haciendo.  

LEER: https://webpack.js.org/guides/code-splitting/  


### Webpack bundle analyzer

npm install --save-dev webpack-bundle-analyzer

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin(
      {
        analyzerMode:  'static', //para que lo haga sólo al momento de hacer el build
		    openAnalyzer:  true, //para que nos muestre el resultado inmediatamente
      }
    )
  ]
}

Cuando se ejecuta el npm run build te muestra el resultado en un html report.html en la carpeta public.

## Ramas de este repo:
* **breakpoint-containers**: Esta rama sirve para romper las media queries y utilizar el ancho del div contenedor en vez del viewport. De esta manera se puede insertar toda la pagina dentro de otro sitio, y aunque el sitio tenga barras laterales, no se rompera el diseño responsivo.



## Fallo en node 15

Si se tiene instalado node 15 en el sistema y tira un error al compilar. Hay que mirar los paquetes. Mirando el package.json chequear si css-loader es una version mayor 5, sass-loader es mayor a 10 y node-sass es mayor a 5. Si no es asi, hay que actualizar. Se puede con npm o yarn de acuerdo lo que estemos usando:
```bash
yarn add css-loader@5.0.1 sass-loader@10.1.0 node-sass@5.0.0
```

```bash
npm install css-loader@5.0.1 sass-loader@10.1.0 node-sass@5.0.0
```