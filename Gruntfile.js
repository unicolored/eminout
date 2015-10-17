// matching one level down:
// 'test/spec/{,*/}*.js'
// recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function( grunt ) {
    'use strict';
    // Module qui affiche le temps d'éxécution de chaque tâche.
    // Utile pour détecter des anomalies et vérifier la performance des tâches.
    require( 'time-grunt' )( grunt );
    // Mozjpeg est un compresseur d'images
    // Il est utilisé par le plugin grunt-imagemin pour compresser les jpeg.
    //var mozjpeg = require( 'imagemin-mozjpeg' );
    // Config
    grunt.initConfig( {
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        //////////// Package settings
        assets: { /* ASSETS */
            jsAssets: [ '<%= paths.themepath %>js/*.js' ],
        },
        developper: grunt.file.readJSON( 'cfg_developper.json' ),
        paths: grunt.file.readJSON( 'cfg_paths.json' ),
        pkg: grunt.file.readJSON( 'package.json' ),
        wp: grunt.file.readJSON( 'cfg_wordpress.json' ),
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##       ######   ######   ######
        ##         ## ##      ##    ## ##    ## ##    ##
        ##       #########    ##       ##       ##
        ######     ## ##      ##        ######   ######
        ##       #########    ##             ##       ##
        ##         ## ##      ##    ## ##    ## ##    ##
        ########   ## ##       ######   ######   ######
        */
        /****************************/
        /*
        inlinecss: {
            main: {
                options: {},
                files: {
                    '<%= paths.assetspath %>templates/generic-mail/_.html': '<%= paths.assetspath %>templates/generic-mail/_.html'
                }
            }
        },*/
        /*
        prettify: {
            options: {
                'indent': 1,
                'indent_char': ' ',
                'indent_scripts': 'normal',
                'wrap_line_length': 0,
                'brace_style': 'end-expand',
                'preserve_newlines': false,
                'max_preserve_newlines': 0,
                'condense': true,
                'indent_inner_html': true,
                'unformatted': [
                  'a', 'sub', 'sup', 'b', 'i', 'u'
                ]
            },

            //files: {
                //'htdocs/assets/templates/generic-mail/_.html': [ 'htdocs/assets/templates/generic-mail/_.html' ]
            //},
            all: {
                expand: true,
                cwd: 'htdocs/assets/templates/generic-mail/',
                ext: '.html',
                src: [ '*.html' ],
                dest: 'htdocs/assets/templates/generic-mail/'
            },
        },*/
        // GENERATION DU CSS
        less: {
            options: {
                compress: false,
                yuicompress: false,
            },
            // COMPILATION des deux fichiers .less principaux : bootstrap et style
            devstyle: {
                files: {
                    '<%= paths.temppath %>style.dev.css': '<%= paths.devpath %>less/style.less',
                }
            },
            wordpress: {
                files: {
                    '<%= paths.assetspath %>css/styles-login.css': '<%= paths.devpath %>less/login-style.less'
                }
            }
        },
        // AUTOPREFIXER
        autoprefixer: {
            options: {
                browsers: [ 'last 2 versions', 'ie 8', 'ie 9' ]
            },
            theme: {
                src: '<%= paths.temppath %>style.dev.css',
                dest: '<%= paths.themepath %>style.css'
            },
        },
        // MINIFICATION
        cssmin: {
            dev2theme: {
                // COMPILATION CSS rapide pour le développement
                // Appellée par watch:lessedited après édition d'un fichier dev/less/*/*.less
                options: {
                    banner: '/*\nTheme Name: <%= wp.themename %>\nTheme URI: <%= wp.themeuri %>\nDescription: <%= pkg.description %>\nAuthor: <%= wp.themeauthor %>\nAuthorURI: <%= wp.themeauthoruri %>\nTemplate: <%= wp.themetemplate %>\nTemplate Version: <%= wp.themetemplateversion %>\nVersion: <%= pkg.version %>\nText Domain: <%= wp.themetextdomain %>\n*/'
                },
                files: {
                    '<%= paths.themepath %>css/style.<%= pkg.version %>.css': [ '<%= paths.themepath %>style.css' ]
                }
            }
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##            ##  ######
        ##         ## ##            ## ##    ##
        ##       #########          ## ##
        ######     ## ##            ##  ######
        ##       #########    ##    ##       ##
        ##         ## ##      ##    ## ##    ##
        ########   ## ##       ######   ######
        */
        /*************************************************************************************************************************************************/
        // NORMALISE le code pour un développement plus aisé
        jsbeautifier: {
            options: {
                js: {
                    spaceInParen: true,
                    wrapLineLength: 0,
                    preserveNewlines: false,
                    keepArrayIndentation: true,
                    keepFunctionIndentation: true,
                }
            },
            all: [ '<%= paths.devpath %>javascript/**/*.js' ],
            grunt: {
                src: [ 'Gruntfile.js' ]
            },
        },
        jshint: {
            options: {
                reporter: require( 'jshint-stylish' ),
            },
            all: [ '<%= paths.devpath %>javascript/**/*.js' ],
            grunt: [ 'Gruntfile.js' ]
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##       ######   #######  ##    ##  ######     ###    ########
        ##         ## ##      ##    ## ##     ## ###   ## ##    ##   ## ##      ##
        ##       #########    ##       ##     ## ####  ## ##        ##   ##     ##
        ######     ## ##      ##       ##     ## ## ## ## ##       ##     ##    ##
        ##       #########    ##       ##     ## ##  #### ##       #########    ##
        ##         ## ##      ##    ## ##     ## ##   ### ##    ## ##     ##    ##
        ########   ## ##       ######   #######  ##    ##  ######  ##     ##    ##
        */
        /*************************************************************************************************************************************************/
        // STATIC
        // Concaténation devant être appellée par sécurité avant un build
        'bower_concat': {
            options: {
                sourceMap: false
            },
            materialdesignlite: {
                dest: '<%= paths.temppath %>material-design-lite.js',
                cssDest: '<%= paths.themepath %>css/material-design-lite.css',
                include: [ 'material-design-lite' ],
                dependencies: {},
                bowerOptions: {
                    relative: false
                }
            },
            dev: {
                dest: '<%= paths.devpath %>tmp/bower_concat_dev.js',
                cssDest: '<%= paths.temppath %>bower_concat.css',
                //include: [ 'jquery', 'bootstrap', 'jquery-form-validator', 'mandrill-api' ],
                exclude: [ 'bootswatch' ],
                dependencies: {},
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    //'angular-local-storage': [ 'dist/angular-local-storage.min.js' ]
                }
            },
            prod: {
                dest: '<%= paths.devpath %>tmp/bower_concat_prod.js',
                cssDest: '<%= paths.temppath %>bower_concat.css',
                //include: [ 'jquery', 'bootstrap', 'jquery-form-validator', 'mandrill-api' ],
                exclude: [ 'bootswatch', 'jquery', 'angular' ],
                dependencies: {},
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    //'angular-local-storage': [ 'dist/angular-local-storage.min.js' ]
                }
            },
        },
        // CONCATENATION JS
        //concat: {
        //  options: {
        //    separator: ' ',
        //  stripBanners: true,
        //banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("dd-mm-yyyy") %> [FR] */',
        //process: function( src, filepath ) {
        //  return '\n//####' + filepath + '\n' + src;
        //},
        //nonull: true,
        //},
        //dist: {
        //  files: {
        //    '<%= paths.themepath %>js/scripts.js': [ '<%= paths.devpath %>javascript/script.js' ]
        //}
        //}
        //},
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            angular: {
                files: {
                    '<%= paths.devpath %>tmp/annotated.js': [
                      '<%= paths.devpath %>javascript/angular/totoro.js',
                      '<%= paths.devpath %>javascript/angular/*/*.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                preserveComments: 'some',
                compress: {
                    'drop_console': true
                },
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            prod: {
                files: {
                    '<%= paths.themepath %>js/scripts.<%= pkg.version %>.min.js': [ '<%= paths.devpath %>tmp/bower_concat_prod.js', '<%= paths.devpath %>tmp/annotated.js', '<%= paths.devpath %>javascript/scripts.js' ],
                }
            },
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##       ######  ##       ########    ###    ##    ##
        ##         ## ##      ##    ## ##       ##         ## ##   ###   ##
        ##       #########    ##       ##       ##        ##   ##  ####  ##
        ######     ## ##      ##       ##       ######   ##     ## ## ## ##
        ##       #########    ##       ##       ##       ######### ##  ####
        ##         ## ##      ##    ## ##       ##       ##     ## ##   ###
        ########   ## ##       ######  ######## ######## ##     ## ##    ##
        */
        /*************************************************************************************************************************************************/
        // Empties folders to start fresh
        clean: {
            fonts: {
                src: [ '<%= paths.fontspath %>*' ]
            },
            serve: {
                src: [ '<%= paths.temppath %>*', '<%= paths.libspath %>**/*.md', '<%= paths.libspath %>**/*LICENSE', '<%= paths.libspath %>**/*.txt', '<%= paths.libspath %>**/*.json', '<%= paths.libspath %>**/*.hbs', '<%= paths.libspath %>**/*.gzip', '<%= paths.libspath %>**/*.map', '<%= paths.libspath %>**/*.coffee', '<%= paths.libspath %>**/CHANGES', '<%= paths.libspath %>**/Makefile', ]
            },
            yesimlocal: {
                src: [ './dev/yesimlocal.php' ]
            }
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##      ########  ######## ########  ##        #######  ##    ##
        ##         ## ##      ##     ## ##       ##     ## ##       ##     ##  ##  ##
        ##       #########    ##     ## ##       ##     ## ##       ##     ##   ####
        ######     ## ##      ##     ## ######   ########  ##       ##     ##    ##
        ##       #########    ##     ## ##       ##        ##       ##     ##    ##
        ##         ## ##      ##     ## ##       ##        ##       ##     ##    ##
        ########   ## ##      ########  ######## ##        ########  #######     ##
        */
        /*************************************************************************************************************************************************/
        gitpush: {
            originmaster: {
                options: {
                    verbose: true,
                    remote: 'origin',
                    //cwd: 'ssh+git://133080@git.dc0.gpaas.net'
                }
            }
        },
        // DEPLOY
        sshconfig: {
            'myhost': grunt.file.readJSON( 'myhost.json' ),
        },
        sshexec: {
            deploy: {
                command: 'deploy <%= wp.themedomain %>.git',
                options: {
                    config: 'myhost'
                }
            }
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##      ##      ##    ###    ########  ######  ##     ##
        ##         ## ##      ##  ##  ##   ## ##      ##    ##    ## ##     ##
        ##       #########    ##  ##  ##  ##   ##     ##    ##       ##     ##
        ######     ## ##      ##  ##  ## ##     ##    ##    ##       #########
        ##       #########    ##  ##  ## #########    ##    ##       ##     ##
        ##         ## ##      ##  ##  ## ##     ##    ##    ##    ## ##     ##
        ########   ## ##       ###  ###  ##     ##    ##     ######  ##     ##
        */
        // SURVEILLANCE
        // WATCH : Cette tâche en appelle d'autres dès qu'elle détecte des changements sur les fichiers définis
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            options: {
                nospawn: true,
                livereload: true, // activation du reload
                port: 9002
            },
            // Gruntfile.js mise à jour, je reload
            mygruntfile: {
                options: {
                    livereload: false // activation du reload
                },
                files: [ 'Gruntfile.js' ],
                tasks: [ 'jshint:grunt', 'jsbeautifier:grunt' ],
            },
            // STYLES
            lessEdited: { // Au changement d'un fichier .less, on appelle la tâche de compilation
                files: [ '<%= paths.devpath %>less/{,*/,*/*/}*.less' ],
                tasks: [ 'reloadCss' ],
            },
            // SCRIPTS
            scriptsEdited: {
                options: {
                    nospawn: true,
                    livereload: true // activation du reload
                },
                files: [ '<%= paths.devpath %>javascript/**/*.js' ], // which files to watch
                tasks: [ 'reloadJs:dev' ],
            },
            // TEMPLATES MAILS
            /*
            mailTemplate: {
                options: {
                    nospawn: true,
                    livereload: true // activation du reload
                },
                files: [ '<%= paths.assetspath %>templates/example/example.html' ], // which files to watch
                tasks: [ 'prettify', 'inlinecss' ],
            },*/
            // LIVERELOAD : fichiers modifiés qui n'appellent pas d'autres tâches que le reload
            livereload: {
                files: [ '<%= paths.themepath %>{,*/,*/*/,*/*/*/}*.php', 'htdocs/.htaccess', 'htdocs/wp-content/themes/bodyrock/{,*/,*/*/,*/*/*/}*.php' ]
            },
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##       ######   #######  ##    ## ##    ## ########  ######  ########
        ##         ## ##      ##    ## ##     ## ###   ## ###   ## ##       ##    ##    ##
        ##       #########    ##       ##     ## ####  ## ####  ## ##       ##          ##
        ######     ## ##      ##       ##     ## ## ## ## ## ## ## ######   ##          ##
        ##       #########    ##       ##     ## ##  #### ##  #### ##       ##          ##
        ##         ## ##      ##    ## ##     ## ##   ### ##   ### ##       ##    ##    ##
        ########   ## ##       ######   #######  ##    ## ##    ## ########  ######     ##
        */
        /*************************************************************************************************************************************************/
        // SERVEUR : configuration de connect
        connect: {
            options: {
                protocol: 'http',
                port: 9002,
                hostname: '<%= wp.themedomain %>',
                livereload: 35729,
                base: ''
            },
            livereload: {
                options: {
                    open: '<%= wp.themeuri %>',
                    base: '<%= paths.mainsitepath %>',
                }
            }
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##       ######   #######  ########  ##    ##
        ##         ## ##      ##    ## ##     ## ##     ##  ##  ##
        ##       #########    ##       ##     ## ##     ##   ####
        ######     ## ##      ##       ##     ## ########     ##
        ##       #########    ##       ##     ## ##           ##
        ##         ## ##      ##    ## ##     ## ##           ##
        ########   ## ##       ######   #######  ##           ##
        */
        // BODYROCK
        copy: {
            libsFonts: {
                files: [
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.eot',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.eot'
                    },
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.woff',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.woff'
                    },
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.ttf',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.ttf'
                    },
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.svg',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.svg'
                    }, ],
            },
            versioning: {
                files: [
                  /*
                    {
                        src: '<%= paths.themepath %>style.css',
                        dest: '<%= paths.themepath %>css/style.<%= pkg.version %>.css'
                    }*/
                    /*,
                                        {
                                            src: '<%= paths.themepath %>script.js',
                                            dest: '<%= paths.themepath %>js/scripts.<%= pkg.version %>.min.js'
                                        },*/
                    ],
            },
            yesimlocal: {
                files: [
                    {
                        src: 'assets/yesimlocal.php',
                        dest: '<%= paths.devpath %>yesimlocal.php'
                    } ],
            }
        },
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*************************************************************************************************************************************************/
        /*
        ########   ## ##      ##     ## ##     ## ##     ##    ###    ##    ##  ######     ######## ##     ## ########
        ##         ## ##      ##     ## ##     ## ###   ###   ## ##   ###   ## ##    ##       ##     ##   ##     ##
        ##       #########    ##     ## ##     ## #### ####  ##   ##  ####  ## ##             ##      ## ##      ##
        ######     ## ##      ######### ##     ## ## ### ## ##     ## ## ## ##  ######        ##       ###       ##
        ##       #########    ##     ## ##     ## ##     ## ######### ##  ####       ##       ##      ## ##      ##
        ##         ## ##      ##     ## ##     ## ##     ## ##     ## ##   ### ##    ##       ##     ##   ##     ##
        ########   ## ##      ##     ##  #######  ##     ## ##     ## ##    ##  ######        ##    ##     ##    ##
        */
        'humans_txt': {
            'external_file': {
                options: {
                    intro: '<%= pkg.description %>',
                    commentStyle: 'u',
                    content: grunt.file.readJSON( 'cfg_humans.json' ),
                    includeUpdateIn: 'string',
                },
                dest: '<%= paths.mainsitepath %>humans.txt',
            },
        },
    } );
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*************************************************************************************************************************************************/
    /*
    ##         ## ##      ########    ###     ######  ##    ##  ######
    ##         ## ##         ##      ## ##   ##    ## ##   ##  ##    ##
    ##       #########       ##     ##   ##  ##       ##  ##   ##
    ##         ## ##         ##    ##     ##  ######  #####     ######
    ##       #########       ##    #########       ## ##  ##         ##
    ##         ## ##         ##    ##     ## ##    ## ##   ##  ##    ##
    ########   ## ##         ##    ##     ##  ######  ##    ##  ######
    /****************************/
    // Import des modules inclus dans package.json
    require( 'load-grunt-tasks' )( grunt );
    // TRANSITION dev/prod
    grunt.registerTask( 'dev', function( target ) {
        switch ( target ) {
            default:
            /*
            Preparation du mode développement
            - copie du fichier yesimlocal.php dans /dev/
            */
                grunt.task.run( [ 'copy:yesimlocal' ] );
            break;
            case 'prod':
                /*
                Préparation du mode production
                - suppression du fichier imlocal.php dans /dev/
                */
                    grunt.task.run( [ 'clean:yesimlocal' ] );
                break;
        }
    } );
    // MES TACHES
    grunt.registerTask( 'reloadFonts', function() {
        grunt.task.run( [ 'clean:fonts', 'copy:libsFonts' ] );
    } );
    grunt.registerTask( 'reloadCss', function() {
        grunt.task.run( [ 'less:devstyle', 'autoprefixer:theme', 'cssmin:dev2theme' ] );
    } );
    grunt.registerTask( 'reloadJs', function( target ) {
        if ( target === 'prod' ) {
            grunt.task.run( [ 'jsbeautifier', 'jshint', 'ngAnnotate', 'uglify' ] );
        } else if ( target === 'dev' ) {
            //grunt.task.run( [ 'jsbeautifier', 'jshint' ] );
            grunt.task.run( [ 'jsbeautifier', 'jshint', 'ngAnnotate' ] );
        }
    } );
    /*
    ##         ## ##      ########  ########   #######  ########
    ##         ## ##      ##     ## ##     ## ##     ## ##     ##
    ##       #########    ##     ## ##     ## ##     ## ##     ##
    ##         ## ##      ########  ########  ##     ## ##     ##
    ##       #########    ##        ##   ##   ##     ## ##     ##
    ##         ## ##      ##        ##    ##  ##     ## ##     ##
    ########   ## ##      ##        ##     ##  #######  ########
    /****************************/
    ///// ETAPE DE RELEASE
    grunt.registerTask( 'production', function() {
        grunt.task.run( [ 'humans_txt', 'copy:libsFonts', 'bower_concat', 'reloadCss', 'reloadJs:prod', 'copy:versioning', 'dev:prod' ] );
    } );
    // CLEAN, COMMIT, TAG, PUSH, DEPLOY
    grunt.registerTask( 'push', function() {
        grunt.log.warn( 'Preparation de l\'envoi...' );
        grunt.task.run( [ 'gitpush:originmaster', 'sshexec:deploy', 'dev' ] );
    } );
    /*
    ##         ## ##       ######   ########  ##     ## ##    ## ########
    ##         ## ##      ##    ##  ##     ## ##     ## ###   ##    ##
    ##       #########    ##        ##     ## ##     ## ####  ##    ##
    ##         ## ##      ##   #### ########  ##     ## ## ## ##    ##
    ##       #########    ##    ##  ##   ##   ##     ## ##  ####    ##
    ##         ## ##      ##    ##  ##    ##  ##     ## ##   ###    ##
    ########   ## ##       ######   ##     ##  #######  ##    ##    ##
    /****************************/
    // CREER UN SERVEUR persistant avec connect et livereload
    grunt.registerTask( 'serve', function() {
        grunt.task.run( [ 'connect:livereload', 'watch' ] );
    } );
    // TACHE PAR DEFAUT
    grunt.registerTask( 'default', [ 'serve' ] );
};
