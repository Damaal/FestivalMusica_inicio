const { src, dest, watch } = require("gulp"); //Extraer funcionalidades de GULP en este archivo
const sass = require("gulp-sass")(require("sass")); //importo sass desde el plugin de gulp-sass

function css(done){
    //IDENTIFICAR EL ARCHIVO SASS

    //COMPILARLO

    //GUARDARLO

    src("src/scss/app.scss")
        .pipe( sass() )
        .pipe( dest("build/css") ); 

    done(); //callback para gulp, tarea finalizada.
}

function dev(done){
    watch("src/scss/app.scss", css); //qué archivo mirar y qué hacer cuando cambie.
    done(); ///callback para gulp, tarea finalizada.
}


exports.css = css;
exports.dev = dev;