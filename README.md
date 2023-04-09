### Como ejecutar
- Las dependencias se instalan con `yarn`, NO con npm i.
- Para ejecutar la aplicación, usar el comando `expo -c`. Siempre se recomienda
  ejecutar limipando el caché (con el flag -c).
- Usando la app Expo Go (de Playstore), escanear el QR para poder levantar la aplicación en el celular, o en un emulador, lo que sea más cómodo. En el caso de usar emulador, se recomienda usar el que viene con Android Studio. Expo Go debería tener hot reloading (igual que React y Nodemon).


#### Importante: para las pegadas a backend, tunelear el puerto en el que está levantado el servicio con ngrok:
ngrok http 4481

Recordar cambiar en el .env la url del backend por el túnel de ngrok.


### "Estructura"
- En App (en la definición de Authstack de la función DisplayApp) se agregan las pantallas previas al ingreso.
- En Homestack se agregan las pantallas para cuando el usuario ya ingresó.
- En Menu se agregan las entradas del menú.


### Notas
- Al igual que en React Native (con Create React App), todas las variables de ambiente 
  deben empezar con REACT_APP, y se requiere el reincio de la aplicación para que 
  las levante, excepto que se importen con "@env" en vez de con "react-native-dotenv".
- El equivalente del `<div>` de HTML o React es `<View>`, por lo que el style se puede definir ahí para contener componentes.
- En vez de usar react-router-dom se usa react-navigator (por ejemplo). En vez de rutas se utiliza un stack de pantallas.
- Para material design se usa paper o algunos componentes de react-navigator.

- Si se quiere tomar un color de una página web, puede usarse la extensión de Chrome Eye Dropper (para obtener el código de color).


### Para hacer un apk
- El apk no tira warning minimizados. Se tira por línea de comando `eas build --profile production --platform android`.

Recordar instalar eas-cli:
`npm install -g eas-cli`

(y usar Node 18, o uno reciente, `nvm use 18`)

Por cada nuevo secret en el .env o cambio en el mismo:
`eas secret:push --scope project --env-file .env --force`

NOTA: aunque se pusheen las credenciales nuevas a la nube de expo igual hay que generar un apk NUEVO para
probar

(las credenciales de Firebase se crean una sola vez con:
eas secret:create --scope project --name GOOGLE_SERVICES_JSON --type file --value google-services.json)

### Otras notas
- Usando scrcpy (desde la terminal) se puede usar el celular desde la computadora (teniendo el debugging por USB activado). Puede ser útil para grabar un video mostrando algo o para la demo. Otra opción es unirse al meet desde el celular.

Si hay múltiples dispositivos, usar: adb devices -l y después llamar a scrcpy con el dispositivo que corresponda. Ejemplo:

scrcpy -s ZY225BJ6FH


### Hooks
Para pasarse a Hooks si uno viene de clases
https://www.digitalocean.com/community/tutorials/five-ways-to-convert-react-class-components-to-functional-components-with-react-hooks

Para que ejecute algo cada vez que se renderice el componente
```    
    useEffect( () => {
            getQuestions().then();
        });
```

Para que se ejecute algo la primera vez que se renderiza el componente:
```
useEffect( () => {
    getQuestions().then();
}, [] );
```

Para que ejecute algo siempre que se renderice el componente si es una entra de un menú de navigator:
```    
    useFocusEffect( useCallback( () => {
            getQuestions().then(res => {
                    setQuestions(res);
                } );
        },
        [] ) );
```

### Firebase
- Luego de crear la app Android en firebase, poner el archivo google-services.json a la misma altura que el README.
  En la entrada "android" del ```app.json```, agregar:
```
  "googleServicesFile": "./google-services.json",
  "config": {
  "googleSignIn": {
  "apiKey": "valor que corresponda",
  "certificateHash": "valor que corresponda"
  }
```
y el package y los intent filters según corresponda.

- Manejo de tokens: https://firebase.google.com/docs/auth/admin/verify-id-tokens


### Errores comunes
- Packager is not running: asegurarse de que el celular y la computadora están en la misma red.
  Si igual no funciona, reiniciar la red del celular, la red de la computadora, el celular y 
  la computadora (ejemplo).
  
- Tarda mucho en cargar: puede ser por el meet o alguna aplicación así.

- Text strings must be rendered... Falto encerrar entre llaves un condicional del render

Network request Failed -- Falta mandar el request por ngrok

New Update, downloading… (y se queda trabado) -- Forze stop desde la configuración de Android
(fijarse si no empieza a cargar un porcentaje)

Synax Error: unexpected json input… -- hay un error que se está wrappeando mal después de un
fetch y por eso se muestra eso. Se puede debuggear con la consola de chrome y la versión web

Escaneas la app y no abre nada: abrirlo con expo -c, no con el IDE

- el navigation se inyecta solo a todas las pantallas del stack
  [*] En un useEffect no es hay que hacer un await de llamadas asincrónicas (es un caso
  excepcional).
  [*] En un useEffect, no hay que hacer un return de la función con async.
  
-Para bajar una app corriendo en un puerto (ejemplo: 4481)
kill $(lsof -i :4481 | cut -d ' ' -f5)

Para un nuevo proyecto, se recomienda copiar la configuración de index y metro.config (es molesta y hay que buscar cada cosa).

- Un console log devuelve: {"_h":0,"_i":0,"_j":null,"_k":null}
Es porque falta resolver la promesa.