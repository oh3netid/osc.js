/*global module*/
/*jshint strict:false*/

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        jshint: {
            all: ["src/osc.js", "tests/**.*.js"],
            options: {
                jshintrc: true
            }
        },

        uglify: {
            options: {
                banner: "<%= oscjs.banners.short %>"
            },
            dist: {
                files: {
                    "dist/osc.min.js": ["src/osc.js"],
                    "dist/osc-chromeapp-transports.min.js": [
                        "bower_components/eventEmitter/EventEmitter.js",
                        "bower_components/slip.js/slip.js",
                        "src/osc-transports.js",
                        "src/platforms/chrome-app-transports.js"
                    ]
                }
            }
        },

        clean: {
            all: {
                src: ["dist/osc.min.js", "dist/osc-chromeapp-transports.min.js"]
            }
        },

        githooks: {
            all: {
                "pre-commit": "default",
            }
        },

        oscjs: {
            banners: {
                short: "/*! osc.js <%= pkg.version %>, Copyright <%= grunt.template.today('yyyy') %> Colin Clark | flockingjs.org */\n\n"
            }
        }
    });

    // Load relevant Grunt plugins.
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-githooks");

    grunt.registerTask("default", ["clean", "jshint", "uglify"]);
};
