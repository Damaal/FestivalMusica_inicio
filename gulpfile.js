const { src, dest, watch, parallel } = require("gulp"); //Extraer funcionalidades de GULP en este archivo

// CSS
const sass = require("gulp-sass")(require("sass")); //importo sass desde el plugin de gulp-sass
const plumber = require("gulp-plumber"); // Para no detener el workflow cada vez que tenga algun error de compilación.

// Imagenes
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(done){
    
    src("src/scss/**/*.scss")//IDENTIFICAR EL ARCHIVO SASS
        .pipe( plumber() ) // 
        .pipe( sass() )//COMPILARLO
        .pipe( dest("build/css") ); //GUARDARLO
    done(); //callback para gulp, tarea finalizada.
}

function versionWebp(done){ // Procesado de imágenes a formato WEBP

    const opciones = { // Opciones para webp()
        quality: 50
    };

    src("src/img/**/*.{jpg, png}") //Busca todas las imágenes en IMG
        .pipe( webp( opciones ) )
        .pipe( dest("build/img") );

    done();
}

function versionAvif(done){ // Procesado de imágenes a formato AVIF

    const opciones = { // Opciones para webp()
        quality: 50
    };

    src("src/img/**/*.{jpg, png}") //Busca todas las imágenes en IMG
        .pipe( avif( opciones ) )
        .pipe( dest("build/img") );

    done();
}

function imagenes(done){ // Procesado de imágenes a formato JPG
    const opciones = {
        optimizationLevel: 3
    };
    src("src/img/**/*.{jpg, png}")
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest( "build/img" )  );
    done();
}

function dev(done){ // Funcion de desarrollo
    watch("src/scss/**/*.scss", css); //qué archivo mirar y qué hacer cuando cambie.
    done(); ///callback para gulp, tarea finalizada.
}

// Exports de las funciones
exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, dev ) ;
