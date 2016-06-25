module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        ts: {
            build: {
                src: ["src/**/*.ts", "typings/**/*.ts", "!node_modules/**/*.ts"],
                // Avoid compiling TypeScript files in node_modules
                options: {
                    module: 'commonjs',
                    // To compile TypeScript using external modules like NodeJS
                    fast: 'never',
                    // You'll need to recompile all the files each time for NodeJS

                    target: "es5",
                    moduleResolution: "node",
                    sourceMap: true,
                    emitDecoratorMetadata: true,
                    experimentalDecorators: true,
                    removeComments: false,
                    noImplicitAny: false
                },
                outDir: "dist"
            }
        },

        tslint: {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            all: {
                src: ["src/**/*.ts", "!node_modules/**/*.ts", "!obj/**/*.ts", "!typings/**/*.ts", "!dist/**/*.ts"]
                // avoid linting typings files and node_modules files
            }
        },

        watch: {
            scripts: {
                files: ['**/*.ts', 'styles/**/*.less', '!node_modules/**/*.ts'], // the watched files
                tasks: ["newer:tslint:all", "ts:build", 'less:build', 'cssmin:build'], // the task to run
                options: {
                    spawn: false // makes the watch task faster
                }
            }
        },

        less: {
            build: {
                files: {
                    'dist/styles.css': 'styles/style.less'
                }
            }
        },

        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/styles.min.css': 'dist/styles.css'
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-tslint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-newer");
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default tasks.
    grunt.registerTask('default', ['tslint:all', 'ts:build', 'less:build', 'cssmin:build']);
};
