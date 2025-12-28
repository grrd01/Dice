module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        terser: {
            one: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    'dist/js/dice.js': ['js/dice.js']
                }
            },
            two: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    'dist/sw.js': ['sw.js']
                }
            },
            three: {
                options: {
                    compress: true,
                    mangle: true,
                    output: {
                        comments: 'some'
                    }
                },
                files: {
                    'dist/js/shake.js': ['js/shake.js']
                }
            }
        },
        uglify: {
            one: {
                options: {
                    banner: "/*\n* Loads a Wavefront .mtl file specifying materials\n* @author angelxuanchang\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    'dist/js/loaders/MTLLoader.js': ['js/loaders/MTLLoader.js']
                }
            },
            two: {
                options: {
                    banner: "/*\n* @author mrdoob / http://mrdoob.com/\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    'dist/js/loaders/OBJLoader.js': ['js/loaders/OBJLoader.js']
                }
            },
            three: {
                options: {
                    banner: "/*\n* @author alteredq / http://alteredqualia.com/ \n* @author mr.doob / http://mrdoob.com/ \n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    'dist/js/Detector.js': ['js/Detector.js']
                }
            }

        },
        svgmin: {
            options: {
                plugins: [
                    {removeUnknownsAndDefaults: false},
                    {removeViewBox: false}
                ]
            },
            dist: {
                files: [
                    {'dist/i/4inarow.svg': 'i/4inarow.svg'},
                    {'dist/i/dice_1.svg': 'i/dice_1.svg'},
                    {'dist/i/dice_2.svg': 'i/dice_2.svg'},
                    {'dist/i/dice_3.svg': 'i/dice_3.svg'},
                    {'dist/i/dice_3kind.svg': 'i/dice_3kind.svg'},
                    {'dist/i/dice_4.svg': 'i/dice_4.svg'},
                    {'dist/i/dice_4kind.svg': 'i/dice_4kind.svg'},
                    {'dist/i/dice_5.svg': 'i/dice_5.svg'},
                    {'dist/i/dice_6.svg': 'i/dice_6.svg'},
                    {'dist/i/dice_chance.svg': 'i/dice_chance.svg'},
                    {'dist/i/dice_full_h.svg': 'i/dice_full_h.svg'},
                    {'dist/i/dice_lg_str.svg': 'i/dice_lg_str.svg'},
                    {'dist/i/dice_plus.svg': 'i/dice_plus.svg'},
                    {'dist/i/dice_sm_str.svg': 'i/dice_sm_str.svg'},
                    {'dist/i/dice_sum.svg': 'i/dice_sum.svg'},
                    {'dist/i/dice_yahtzee.svg': 'i/dice_yahtzee.svg'},
                    {'dist/i/info.svg': 'i/info.svg'},
                    {'dist/i/list.svg': 'i/list.svg'},
                    {'dist/i/lock.svg': 'i/lock.svg'},
                    {'dist/i/mail.svg': 'i/mail.svg'},
                    {'dist/i/memo.svg': 'i/memo.svg'},
                    {'dist/i/ok.svg': 'i/ok.svg'},
                    {'dist/i/puzzle.svg': 'i/puzzle.svg'},
                    {'dist/i/reversi.svg': 'i/reversi.svg'},
                    {'dist/i/settings.svg': 'i/settings.svg'},
                    {'dist/i/tictactoe.svg': 'i/tictactoe.svg'},
                    {'dist/i/x.svg': 'i/x.svg'}
                ]
            }
        },
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'i',
                    src: ['*.{png,jpg,gif}'],
                    dest: 'dist/i/'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* grrd's Dice\n* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL License\n*/\n"
                },
                files: {
                    'dist/js/dice.css': ['js/dice.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    src: 'index.html',
                    dest: 'dist'
                }]
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /\<\!DOCTYPE html\>/g,
                            replacement: function () {
                                return "<!DOCTYPE html>\n<!-- \n* grrd's Dice \n* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net \n* Licensed under the MPL License\n-->\n";
                            }
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['dist/index.html'], dest: 'dist/'}
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['locales/**'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['manifest/*'], dest: 'dist/manifest/'},
                    {expand: true, flatten: true, src: ['models/*'], dest: 'dist/models/'},
                    {expand: true, flatten: true, src: ['i/*.ico'], dest: 'dist/i/'},
                    {expand: true, flatten: true, src: ['js/build/*'], dest: 'dist/js/build/'},
                    {expand: true, flatten: true, src: ['**.txt'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['**.md'], dest: 'dist/'},
                    {expand: true, flatten: true, src: ['CNAME'], dest: 'dist/'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [
        'terser',
        'uglify',
        'svgmin',
        'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        'copy'
    ]);


};