const { src, dest, watch } = require("gulp"); //Extraer funcionalidades de GULP en este archivo
const sass = require("gulp-sass")(require("sass")); //importo sass desde el plugin de gulp-sass
const plumber = require("gulp-plumber"); // Para no detener el workflow cada vez que tenga algun error de compilación.

function css(done){
    
    src("src/scss/**/*.scss")//IDENTIFICAR EL ARCHIVO SASS
        .pipe( plumber() ) // 
        .pipe( sass() )//COMPILARLO
        .pipe( dest("build/css") ); //GUARDARLO
    done(); //callback para gulp, tarea finalizada.
}

function dev(done){
    watch("src/scss/**/*.scss", css); //qué archivo mirar y qué hacer cuando cambie.
    done(); ///callback para gulp, tarea finalizada.
}
exports.css = css;
exports.dev = dev;