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
    var mozjpeg = require( 'imagemin-mozjpeg' );
    // Config
    grunt.initConfig( {
        //////////// Package settings
        developper: grunt.file.readJSON( 'cfg_developper.json' ),
        wp: grunt.file.readJSON( 'cfg_wordpress.json' ),
        /* VARIABLES DU PROJET */
        paths: grunt.file.readJSON( 'cfg_paths.json' ),
        /* PATHS */
        pkg: grunt.file.readJSON( 'package.json' ),
        assets: { /* ASSETS */
            htmlAssets: [ '<%= paths.themepath %>js/angular/*/*.html' ],
            /*
      cssFonts: [
      '<%= paths.temppath %>fonts/font1.css',
      '<%= paths.temppath %>fonts/font2.css',
      '<%= paths.temppath %>fonts/font3.css',
      '<%= paths.temppath %>fonts/font4.css'
    ],*/
            jsAssets: [
      //'<%= paths.themepath %>js/angular/totoro.js', '<%= paths.themepath %>js/angular/totoroConfig.js', '<%= paths.themepath %>js/angular/totoroRun.js', '<%= paths.themepath %>js/angular/*/*.js'
    ],
        },
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
        //////////// Package settings
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
        // GENERATION DU CSS
        less: {
            options: {
                compress: false,
                yuicompress: false,
            },
            // COMPILATION des deux fichiers .less principaux : bootstrap et style
            wordpress: {
                files: {
                    '<%= paths.assetspath %>css/styles-login.css': '<%= paths.devpath %>less/login-style.less'
                }
            },
            /*
    style: {
    files: {
    '<%= paths.assetspath %>css/style.css': '<%= paths.devpath %>less/style.less',
  }
}*/
            devstyle: {
                files: {
                    '<%= paths.themepath %>style.dev.css': '<%= paths.devpath %>less/style.less',
                }
            }
        },
        /*
        ########   ## ##       ######  ##     ## ########  ##
        ##         ## ##      ##    ## ##     ## ##     ## ##
        ##       #########    ##       ##     ## ##     ## ##
        ######     ## ##      ##       ##     ## ########  ##
        ##       #########    ##       ##     ## ##   ##   ##
        ##         ## ##      ##    ## ##     ## ##    ##  ##
        ########   ## ##       ######   #######  ##     ## ########
        */
        // DEBUG // BACKGROUND
        curl: {
            /*
  fonts1: {
  dest: '<%= paths.assetspath %>fonts/font1.css',
  src: 'https://fonts.googleapis.com/css?family=Share+Tech'
},
fonts2: {
dest: '<%= paths.assetspath %>fonts/font2.css',
src: 'https://fonts.googleapis.com/css?family=Merriweather:400,400italic,700,700italic'
},
fonts3: {
dest: '<%= paths.assetspath %>fonts/font3.css',
src: 'https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,700,400'
},
fonts4: {
dest: '<%= paths.assetspath %>fonts/font4.css',
src: 'https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700'
},*/
            gravatar: {
                dest: '<%= paths.devpath %>img/ico/gravatar.jpg',
                src: 'https://www.gravatar.com/avatar/9a424bfbb842ed0e00426d5470f09be3?s=120'
            }
            /*,
            ga: {
            dest: '<%= paths.themepath %>js/scripts/analytics_google.js',
            src: 'https://www.google-analytics.com/analytics.js'
            }*/
        },
        // AUTOPREFIXER
        autoprefixer: {
            options: {
                browsers: [ 'last 2 versions', 'ie 8', 'ie 9' ]
            },
            theme: {
                src: '<%= paths.themepath %>style.dev.css',
                dest: '<%= paths.themepath %>style.ap.css'
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
                    '<%= paths.themepath %>style.css': [ '<%= paths.themepath %>style.ap.css' ]
                }
            }
        },
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
            angular: {
                src: [ '<%= paths.themepath %>js/angular/{,*/}*.js' ],
            },
            grunt: {
                src: [ 'Gruntfile.js' ]
            },
            annotated: {
                src: [ '<%= paths.themepath %>js/tmp/annotated.js' ],
            }
        },
        jshint: {
            options: {
                reporter: require( 'jshint-stylish' ),
            },
            all: [ '<%= paths.themepath %>js/angular/{,*/}*.js' ],
            grunt: [ 'Gruntfile.js' ]
        },
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            angular: {
                files: {
                    '<%= paths.themepath %>js/tmp/annotated.js': [ '<%= paths.themepath %>js/angular/totoro.js', '<%= paths.themepath %>js/angular/totoroConfig.js', '<%= paths.themepath %>js/angular/totoroRun.js', '<%= paths.themepath %>js/angular/**/*.js' ]
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
            'my_target': {
                files: {
                    '<%= paths.themepath %>js/scripts.min.js': [ '<%= paths.themepath %>js/scripts.js' ],
                }
            },
        },
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
            all: {
                options: {
                    sourceMap: false,
                },
                dest: '<%= paths.themepath %>js/tmp/bower_concat.js',
                // Je ne charge pas les css de bower actuellement
                // mais la feuille est générée tout de même
                cssDest: '<%= paths.temppath %>bower_concat.css',
                //exclude: [ 'jquery', 'jquery-ui', 'angular-scenario', 'angular-mocks', 'core-shared-lib', 'core-component-page', 'webcomponentsjs', 'google-apis', 'google-map', 'polymer' ],
                include: [ /*'angular',*/ 'angular-local-storage', /*'jquery.nicescroll', 'bootstrap', 'typed.js',*/ 'json3', 'es5-shim', 'modernizr' /*, 'twemoji'*/ ],
                dependencies: {
                    //'angular': [ 'lodash', 'typed.js', 'modernizr', 'json3', 'bootstrap' ]
                    //'angular': [ 'lodash', 'typed.js', 'modernizr', 'json3', 'bootstrap' ]
                    //'angular': [ 'modernizr', 'json3', 'bootstrap' ]
                },
                bowerOptions: {
                    relative: false
                },
                mainFiles: {
                    'angular-local-storage': [ 'dist/angular-local-storage.min.js' ]
                        //'twemoji': [ 'twemoji.min.js' ]
                }
            },
        },
        // CONCATENATION JS
        concat: {
            options: {
                separator: ' ',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("dd-mm-yyyy") %> [FR] */',
                process: function( src, filepath ) {
                    return '\n//####' + filepath + '\n' + src;
                },
                nonull: true,
            },
            dist: {
                files: {
                    '<%= paths.themepath %>js/scripts.js': [ '<%= paths.themepath %>js/tmp/bower_concat.js', /*'<%= paths.themepath %>js/scripts/instantclick.js',*/ '<%= paths.themepath %>js/tmp/annotated.js' ]
                }
            },
            jqueryui: {
                options: {
                    separator: ' ',
                    stripBanners: true,
                    banner: '',
                    process: function( src, filepath ) {
                        return '\n//####' + filepath + '\n' + src;
                    },
                    nonull: true,
                },
                files: {
                    '<%= paths.themepath %>js/scripts/jquery-ui-custom.js': [ '<%= paths.libspath %>jquery-ui/ui/core.js', '<%= paths.libspath %>jquery-ui/ui/widget.js', '<%= paths.libspath %>jquery-ui/ui/mouse.js', '<%= paths.libspath %>jquery-ui/ui/draggable.js', '<%= paths.libspath %>jquery-ui/ui/droppable.js', '<%= paths.libspath %>jquery-ui/ui/resizable.js', '<%= paths.libspath %>jquery-ui/ui/selectable.js', '<%= paths.libspath %>jquery-ui/ui/sortable.js', '<%= paths.libspath %>jquery-ui/ui/datepicker.js', '<%= paths.libspath %>jquery-ui/ui/i18n/datepicker-fr.js' ]
                }
            }
        },
        /*
        ########   ## ##      #### ##     ##    ###     ######   ########  ######
        ##         ## ##       ##  ###   ###   ## ##   ##    ##  ##       ##    ##
        ##       #########     ##  #### ####  ##   ##  ##        ##       ##
        ######     ## ##       ##  ## ### ## ##     ## ##   #### ######    ######
        ##       #########     ##  ##     ## ######### ##    ##  ##             ##
        ##         ## ##       ##  ##     ## ##     ## ##    ##  ##       ##    ##
        ########   ## ##      #### ##     ## ##     ##  ######   ########  ######
        */
        /*************************************************************************************************************************************************/
        // OPTIMISATION D'IMAGES
        imagemin: { // Task
            dynamic: { // Another target
                options: {
                    optimizationLevel: 3,
                    svgoPlugins: [ {
                        removeViewBox: false
      } ],
                    use: [ mozjpeg() ]
                },
                files: [ {
                    expand: true, // Enable dynamic expansion
                    cwd: '<%= paths.devpath %>img/', // Src matches are relative to this path
                    src: [ '**/*.{png,jpg,gif,ico,svg}' ], // Actual patterns to match
                    dest: '<%= paths.themepath %>img/' // Destination path prefix
    } ]
            }
        },
        /*
        ########   ## ##      ##     ## ######## ##     ## ##
        ##         ## ##      ##     ##    ##    ###   ### ##
        ##       #########    ##     ##    ##    #### #### ##
        ######     ## ##      #########    ##    ## ### ## ##
        ##       #########    ##     ##    ##    ##     ## ##
        ##         ## ##      ##     ##    ##    ##     ## ##
        ########   ## ##      ##     ##    ##    ##     ## ########
        */
        /*************************************************************************************************************************************************/
        ngtemplates: {
            app: {
                src: '<%= paths.themepath %>js/angular/*/**.html',
                dest: '<%= paths.themepath %>js/angular/totoroTemplates.js',
                options: {
                    url: function( url ) {
                        return url.replace( 'htdocs', '' );
                    },
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives!
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        },
        prettify: {
            options: {
                indent: 4,
                'indent_char': ' ',
                'wrap_line_length': 78,
                'brace_style': 'expand',
                //unformatted: [ 'a', 'sub', 'sup', 'b', 'i', 'u' ]
                unformatted: [ 'php' ]
            },
            // -------------- Views
            views: {
                expand: true,
                cwd: '<%= paths.themepath %>js/angular/',
                ext: '.html',
                src: [ '*/*.html' ],
                dest: '<%= paths.themepath %>js/angular/'
            },
            webapp: {
                expand: true,
                cwd: '<%= paths.mainsitepath %>',
                ext: '.html',
                src: [ 'webapp-<%= pkg.vversion %>{,*}.html' ],
                dest: '<%= paths.mainsitepath %>'
            },
            // -------------- Tpl
            index: {
                src: '<%= paths.mainsitepath %>index.html',
                dest: '<%= paths.mainsitepath %>index.html',
            }
        },
        htmlhint: {
            options: {
                'tag-pair': true, // Tag must be paired.
                'tagname-lowercase': true, //Tagname must be lowercase.
                'attr-lowercase': true,
                'attr-value-double-quotes': true,
                'attr-value-not-empty': true,
                'attr-no-duplication': true,
                'doctype-first': false,
                'doctype-html5': true,
                'tag-self-close': true,
                'spec-char-escape': true,
                'id-unique': true,
                'src-not-empty': true,
                //Perfomance
                'head-script-disabled': true,
                'img-alt-require': true,
                'id-class-value': true,
                'style-disabled': false,
                'space-tab-mixed-disabled': true,
                'id-class-ad-disabled': true, // Id and class can not use ad keyword, it will blocked by adblock software.
                'href-abs-or-rel': false,
                'attr-unsafe-chars': true,
            },
            html1: {
                src: '<%= paths.themepath %>js/angular/*/*.html'
            },
            webapp: {
                src: [ 'webapp-<%= pkg.vversion %>{,*}.html' ]
            }
        },
        php2html: {
            options: {
                // Task-specific options go here.
                processLinks: false,
                haltOnError: false,
                docroot: 'htdocs/'
            },
            your_target: {
                src: 'htdocs/index.php',
                dest: '<%= paths.mainsitepath %>',
            },
        },
        /*
        ########   ## ##      ##     ##    ###    ##       #### ########     ###    ######## ####  #######  ##    ##
        ##         ## ##      ##     ##   ## ##   ##        ##  ##     ##   ## ##      ##     ##  ##     ## ###   ##
        ##       #########    ##     ##  ##   ##  ##        ##  ##     ##  ##   ##     ##     ##  ##     ## ####  ##
        ######     ## ##      ##     ## ##     ## ##        ##  ##     ## ##     ##    ##     ##  ##     ## ## ## ##
        ##       #########     ##   ##  ######### ##        ##  ##     ## #########    ##     ##  ##     ## ##  ####
        ##         ## ##        ## ##   ##     ## ##        ##  ##     ## ##     ##    ##     ##  ##     ## ##   ###
        ########   ## ##         ###    ##     ## ######## #### ########  ##     ##    ##    ####  #######  ##    ##
        */
        /*************************************************************************************************************************************************/
        validation: {
            options: {
                reset: grunt.option( 'reset' ) || false,
                stoponerror: true,
                doctype: 'HTML5',
                charset: 'utf-8',
                //remotePath: 'http://decodize.com/',
                //remoteFiles: [ 'html/moving-from-wordpress-to-octopress/', 'css/site-preloading-methods/' ], //or
                //remoteFiles: 'validation-files.json', // JSON file contains array of page paths.
                //relaxerror: [ 'Bad value X-UA-Compatible for attribute http-equiv on element meta.' ] //ignores these errors
                //serverUrl: 'http://validator.gh.com/'
            },
            files: {
                src: '<%= paths.mainsitepath %>webapp.html'
            }
        },
        pagespeed: {
            options: {
                nokey: true,
                //key : "AIzaSyBa68iLR7ludZoab6Wf9xYt0cPbKhsUgus",
                url: '<%= wp.themeuri %>'
            },
            gh: {
                options: {
                    //paths: ["/"],
                    //key : "AIzaSyBa68iLR7ludZoab6Wf9xYt0cPbKhsUgus",
                    url: '<%= wp.themeuri %>',
                    locale: 'fr_FR',
                    strategy: 'desktop',
                    threshold: 80
                }
            }
        },
        /*
        ########   ## ##      ######## ########  ######  ########  ######
        ##         ## ##         ##    ##       ##    ##    ##    ##    ##
        ##       #########       ##    ##       ##          ##    ##
        ######     ## ##         ##    ######    ######     ##     ######
        ##       #########       ##    ##             ##    ##          ##
        ##         ## ##         ##    ##       ##    ##    ##    ##    ##
        ########   ## ##         ##    ########  ######     ##     ######
        */
        /*************************************************************************************************************************************************/
        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        },
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
            serve: {
                src: [ '<%= paths.temppath %>*', '<%= paths.libspath %>**/*.md', '<%= paths.libspath %>**/*LICENSE', '<%= paths.libspath %>**/*.txt', '<%= paths.libspath %>**/*.json', '<%= paths.libspath %>**/*.hbs', '<%= paths.libspath %>**/*.gzip', '<%= paths.libspath %>**/*.map', '<%= paths.libspath %>**/*.coffee', '<%= paths.libspath %>**/CHANGES', '<%= paths.libspath %>**/Makefile', ]
            },
            images: {
                src: [ '<%= paths.themepath %>img/**/*.jpg', '<%= paths.themepath %>img/**/*.png', '<%= paths.themepath %>img/**/*.gif', '<%= paths.themepath %>img/**/*.ico', '<%= paths.themepath %>img/**/*.webp' ]
            },
            changelog: {
                src: [ './CHANGELOG.md' ]
            },
            screenshots: {
                src: [ './dev/screenshots/**/*.png' ]
            },
            bodyRock: {
                src: [ './bodyRock/**/*' ]
            },
            yesimlocal: {
                src: [ './dev/yesimlocal.php' ]
            },
            webapp: {
                src: [ './htdocs/manifest.webapp', './htdocs/offline.appcache' ]
            }
        },
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
        sftp: {
            test: {
                files: {
                    './': '*json'
                },
                options: {
                    path: '/tmp/',
                    config: 'myhost',
                    showProgress: true
                }
            }
        },
        // DIST
        changelog: {
            options: {
                // Task-specific options go here.
            }
        },
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
                command: 'deploy www.unicolored.com.git',
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
            // VIEWS
            views: {
                files: [ '<%= paths.themepath %>js/angular/*/*.html' ],
                tasks: [ 'prettify:views' ],
            },
            // SCRIPTS
            scriptsEdited: {
                options: {
                    nospawn: true,
                    livereload: true // activation du reload
                },
                // Au changement d'un fichier .less, on appelle la tâche de compilation
                files: [ '<%= paths.themepath %>js/{angular/,angular/*/}*.js', 'test/spec/{,*/}*.js' ], // which files to watch
                tasks: [ 'reloadJs:dev' ],
            },
            // LIVERELOAD : fichiers modifiés qui n'appellent pas d'autres tâches que le reload
            livereload: {
                files: [ '<%= paths.themepath %>{,*/,*/*/,*/*/*/}*.php', 'htdocs/.htaccess' ]
                    //files: [ '<%= paths.themepath %>{,*/}*.php', 'htdocs/.htaccess' ]
            },
        },
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
                hostname: 'www.unicolored.com',
                livereload: 35729,
                base: '',
                //key: grunt.file.read( 'ssl/gh/ca.key' ).toString(),
                //cert: grunt.file.read( 'ssl/gh/ca.crt' ).toString()
            },
            livereload: {
                options: {
                    open: '<%= wp.themeuri %>',
                    //open:true,
                    //protocol: 'http',
                    base: '<%= paths.mainsitepath %>',
                    //key: grunt.file.read( 'ssl/gh/ca.key' ).toString(),
                    //cert: grunt.file.read( 'ssl/gh/ca.crt' ).toString()
                }
            }
        },
        phantom: {
            options: {
                port: 4444
            },
            'your_target': {
                src: '<%= wp.themeuri %>'
            }
        },
        /*
        ########   ## ##         ###    ##     ## ########  #######   ######  ##     ##  #######  ########
        ##         ## ##        ## ##   ##     ##    ##    ##     ## ##    ## ##     ## ##     ##    ##
        ##       #########     ##   ##  ##     ##    ##    ##     ## ##       ##     ## ##     ##    ##
        ######     ## ##      ##     ## ##     ##    ##    ##     ##  ######  ######### ##     ##    ##
        ##       #########    ######### ##     ##    ##    ##     ##       ## ##     ## ##     ##    ##
        ##         ## ##      ##     ## ##     ##    ##    ##     ## ##    ## ##     ## ##     ##    ##
        ########   ## ##      ##     ##  #######     ##     #######   ######  ##     ##  #######     ##
        */
        /*************************************************************************************************************************************************/
        autoshot: {
            'default_options': {
                options: {
                    // necessary config
                    path: '<%= paths.devpath %>screenshots/',
                    // optional config, must set either remote or local
                    remote: {
                        files: [ {
                            src: 'http://www.unicolored.com/',
                            dest: 'front-page.png'
        }, {
                            src: 'http://www.unicolored.com/a-propos',
                            dest: 'services.png'
        }, {
                            src: 'http://www.unicolored.com/projets',
                            dest: 'portfolio.png'
        }, {
                            src: 'http://www.unicolored.com/contact',
                            dest: 'contact.png'
        }, {
                            src: 'http://www.unicolored.com/creation-3d-champagne-clerambault/',
                            dest: 'single.png'
        } ],
                    },
                    local: {
                        path: './tmp/html/', // path to directory of the webpage
                        port: 8080, // port of startup http server
                        files: [ // local filename and screenshot filename
                            {
                                src: 'front-page.html',
                                dest: 'test.jpg',
                                delay: 3000
          }
        ]
                    },
                    viewport: [ '320x480', '1366x768', '1922x1200' /*, '480x854', '768x1024', '992x992', '1600x1200', '1922x1200'*/ ]
                },
            },
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
            bodyRock: {
                files: [
      // makes all src relative to cwd
                    {
                        expand: true,
                        cwd: 'htdocs/wp-content/themes/bodyrock/',
                        src: [ '**' ],
                        dest: './bodyRock/'
      },
    ],
            },
            libsFonts: {
                files: [
      // makes all src relative to cwd
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.eot',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.eot',
      },
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.woff',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.woff',
      },
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.ttf',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.ttf',
      },
                    {
                        src: '<%= paths.devpath %>fonts/icomoon.svg',
                        dest: '<%= paths.themepath %>fonts/icomoon.<%= pkg.version %>.svg',
      },
    ],
            },
            changelog: {
                files: [
      // makes all src relative to cwd
                    {
                        src: 'CHANGELOG.md',
                        dest: 'changelogs/CHANGELOG-<%= pkg.version %>.md'
      },
    ],
            },
            versioning: {
                files: [
      // makes all src relative to cwd
                    {
                        src: '<%= paths.themepath %>style.css',
                        dest: '<%= paths.themepath %>style.<%= pkg.version %>.css',
      },
                    {
                        src: '<%= paths.themepath %>js/scripts.min.js',
                        dest: '<%= paths.themepath %>js/scripts.<%= pkg.version %>.min.js',
      },
    ],
            },
            versioningImg: {
                files: [
      // makes all src relative to cwd
                    {
                        src: '<%= paths.devpath %>img/ico/logo.svg',
                        dest: '<%= paths.devpath %>img/ico/logo.<%= pkg.version %>.svg',
      },
                    {
                        src: '<%= paths.devpath %>img/ico/gravatar.jpg',
                        dest: '<%= paths.devpath %>img/ico/gravatar.<%= pkg.version %>.jpg',
      },
                    {
                        src: '<%= paths.devpath %>img/ico/favicon.ico',
                        dest: '<%= paths.devpath %>img/ico/favicon.<%= pkg.version %>.ico',
      },
                    {
                        src: '<%= paths.devpath %>img/ico/144.png',
                        dest: '<%= paths.devpath %>img/ico/144.<%= pkg.version %>.png',
      },
                    {
                        src: '<%= paths.devpath %>img/ico/16.png',
                        dest: '<%= paths.devpath %>img/ico/16.<%= pkg.version %>.png',
      },
                    {
                        src: '<%= paths.devpath %>img/ico/48.png',
                        dest: '<%= paths.devpath %>img/ico/48.<%= pkg.version %>.png',
      },
                    {
                        src: '<%= paths.devpath %>img/ico/128.png',
                        dest: '<%= paths.devpath %>img/ico/128.<%= pkg.version %>.png',
      },
                    {
                        src: '<%= paths.devpath %>img/competences.jpg',
                        dest: '<%= paths.devpath %>img/competences.<%= pkg.version %>.jpg',
      },
                    {
                        src: '<%= paths.devpath %>img/services.png',
                        dest: '<%= paths.devpath %>img/services.<%= pkg.version %>.png',
      },
                    {
                        src: '<%= paths.devpath %>img/carousel/carousel-1.jpg',
                        dest: '<%= paths.devpath %>img/carousel/carousel-1.<%= pkg.version %>.jpg',
      },
                    {
                        src: '<%= paths.devpath %>img/carousel/carousel-2.jpg',
                        dest: '<%= paths.devpath %>img/carousel/carousel-2.<%= pkg.version %>.jpg',
      }
    ],
            },
            yesimlocal: {
                files: [
      // makes all src relative to cwd
                    {
                        src: 'assets/yesimlocal.php',
                        dest: '<%= paths.devpath %>yesimlocal.php',
      }
    ],
            },
            webapp: {
                files: [
      // makes all src relative to cwd
                    {
                        src: 'assets/manifest.webapp',
                        dest: 'htdocs/manifest.webapp',
      },
                    {
                        src: 'assets/offline.appcache',
                        dest: 'htdocs/offline.appcache',
      },
    ],
            },
        }
    } );
    /****************************/
    /****************************/
    /****************************/
    /****************************/
    /****************************/
    /****************************/
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
    // TESTS
    grunt.registerTask( 'test', [ 'connect:test', 'karma' ] );
    grunt.registerTask( 'mochatest', function() {
        grunt.task.run( [ 'phantom', 'mocha' ] );
    } );
    // TRANSITION dev/prod
    grunt.registerTask( 'dev', function( target ) {
        switch ( target ) {
            default:
            /*
            Preparation du mode développement
            - copie du fichier yesimlocal.php dans /dev/
            - suppression du manifest.xml et du .appcache dans /htdocs/
            */
                grunt.task.run( [ 'copy:yesimlocal', 'clean:webapp' ] );
            break;
            case 'prod':
                /*
                Préparation du mode production
                - suppression du fichier imlocal.php dans /dev/
                - copie des fichiers manifest.xml et .appcache dans /htdocs/
                */
                    grunt.task.run( [ 'clean:yesimlocal', 'copy:webapp' ] );
                break;
        }
    } );
    // MES TACHES
    grunt.registerTask( 'reloadFonts', function() {
        grunt.task.run( [ 'copy:libsFonts' ] );
    } );
    grunt.registerTask( 'reloadCss', function() {
        grunt.task.run( [ 'less:devstyle', 'autoprefixer:theme', 'cssmin:dev2theme' ] );
    } );
    grunt.registerTask( 'reloadJs', function( target ) {
        if ( target === 'prod' ) {
            grunt.task.run( [ 'jsbeautifier', 'jshint', 'ngAnnotate' /*, 'concat:jqueryui'*/ , 'concat:dist', 'bower_concat', 'uglify' ] );
        } else if ( target === 'dev' ) {
            grunt.task.run( [ 'jsbeautifier', 'jshint' ] );
        }
    } );
    grunt.registerTask( 'reloadImg', function() {
        grunt.task.run( [ 'curl:gravatar', 'clean:images', 'copy:versioningImg', 'imagemin:dynamic' /*, 'webp:images'*/ ] );
    } );
    grunt.registerTask( 'reloadHtml', function() {
        grunt.task.run( [ /*'exec', */ 'prettify', 'htmlhint', 'validation', 'pagespeed' ] );
    } );
    grunt.registerTask( 'responsive', function() {
        grunt.task.run( [ 'clean:screenshots', 'autoshot' ] );
    } );
    ///// ETAPE DE JS DEV:PROD
    grunt.registerTask( 'reloadJsProd', function() {
        grunt.task.run( [ 'humans_txt', 'reloadFonts', 'reloadCss', 'reloadJs:prod', 'copy:versioning' ] );
    } );
    // BODYROCK ************************
    grunt.registerTask( 'bodyRock', function() {
        grunt.task.run( [ 'clean:bodyRock', 'copy:bodyRock' ] );
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
        grunt.task.run( [ 'humans_txt', 'copy:libsFonts', 'reloadCss', /*'ngtemplates' ,*/ 'reloadJs:prod', 'copy:versioningImg', 'copy:changelog', 'clean:changelog', 'changelog', 'copy:versioning', /*'reloadHtml',*/ 'dev:prod', 'reloadImg' ] );
    } );
    grunt.registerTask( 'optimize', function() {
        grunt.option( 'force', true );
        grunt.task.run( [ 'newer:imagemin:uploads', 'newer:webp:uploads' ] );
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
