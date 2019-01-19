module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            one: {
                options: {
                    banner: "/*\n* grrd's Dice\n* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL License\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/dice.js': ['js/dice.js']
                }
            },
            two: {
                options: {
                    banner: "/*\n* grrd's Dice\n* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL License\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/sw.js': ['sw.js']
                }
            },
            three: {
                options: {
                    banner: "/*\n* Copyright (c) 2011-2013 Fabien Cazenave, Mozilla.\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/l10n.js': ['js/l10n.js']
                }
            },
            four: {
                options: {
                    banner: "/*\n* Loads a Wavefront .mtl file specifying materials\n* @author angelxuanchang\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/loaders/MTLLoader.js': ['js/loaders/MTLLoader.js']
                }
            },
            five: {
                options: {
                    banner: "/*\n* @author mrdoob / http://mrdoob.com/\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/loaders/OBJLoader.js': ['js/loaders/OBJLoader.js']
                }
            },
            six: {
                options: {
                    banner: "/*\n* Author: Alex Gibson \n* https://github.com/alexgibson/shake.js \n* License: MIT license \n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/shake.js': ['js/shake.js']
                }
            },
            seven: {
                options: {
                    banner: "/*\n* @author alteredq / http://alteredqualia.com/ \n* @author mr.doob / http://mrdoob.com/ \n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/Detector.js': ['js/Detector.js']
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
                    {'../../2_Build/Dice/images/4inarow.svg': 'images/4inarow.svg'},
                    {'../../2_Build/Dice/images/dice_1.svg': 'images/dice_1.svg'},
                    {'../../2_Build/Dice/images/dice_1w.svg': 'images/dice_1w.svg'},
                    {'../../2_Build/Dice/images/dice_2.svg': 'images/dice_2.svg'},
                    {'../../2_Build/Dice/images/dice_2w.svg': 'images/dice_2w.svg'},
                    {'../../2_Build/Dice/images/dice_3.svg': 'images/dice_3.svg'},
                    {'../../2_Build/Dice/images/dice_3kind.svg': 'images/dice_3kind.svg'},
                    {'../../2_Build/Dice/images/dice_3w.svg': 'images/dice_3w.svg'},
                    {'../../2_Build/Dice/images/dice_4.svg': 'images/dice_4.svg'},
                    {'../../2_Build/Dice/images/dice_4kind.svg': 'images/dice_4kind.svg'},
                    {'../../2_Build/Dice/images/dice_4w.svg': 'images/dice_4w.svg'},
                    {'../../2_Build/Dice/images/dice_5.svg': 'images/dice_5.svg'},
                    {'../../2_Build/Dice/images/dice_5w.svg': 'images/dice_5w.svg'},
                    {'../../2_Build/Dice/images/dice_6.svg': 'images/dice_6.svg'},
                    {'../../2_Build/Dice/images/dice_chance.svg': 'images/dice_chance.svg'},
                    {'../../2_Build/Dice/images/dice_full_h.svg': 'images/dice_full_h.svg'},
                    {'../../2_Build/Dice/images/dice_lg_str.svg': 'images/dice_lg_str.svg'},
                    {'../../2_Build/Dice/images/dice_plus.svg': 'images/dice_plus.svg'},
                    {'../../2_Build/Dice/images/dice_sm_str.svg': 'images/dice_sm_str.svg'},
                    {'../../2_Build/Dice/images/dice_sum.svg': 'images/dice_sum.svg'},
                    {'../../2_Build/Dice/images/dice_yahtzee.svg': 'images/dice_yahtzee.svg'},
                    {'../../2_Build/Dice/images/info.svg': 'images/info.svg'},
                    {'../../2_Build/Dice/images/lock.svg': 'images/lock.svg'},
                    {'../../2_Build/Dice/images/mail.svg': 'images/mail.svg'},
                    {'../../2_Build/Dice/images/puzzle.svg': 'images/puzzle.svg'},
                    {'../../2_Build/Dice/images/settings.svg': 'images/settings.svg'},
                    {'../../2_Build/Dice/images/tictactoe.svg': 'images/tictactoe.svg'}
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
                    cwd: 'images',
                    src: ['*.{png,jpg,gif}'],
                    dest: '../../2_Build/Dice/images/'
                }]
            },
            dist2: {
                options: {
                    optimizationLevel: 5
                },
                files: [{
                    expand: true,
                    cwd: 'js/images',
                    src: ['*.{png,jpg,gif}'],
                    dest: '../../2_Build/Dice/js/images/'
                }]
            }
        },
        cssmin: {
            dist: {
                options: {
                    banner: "/*\n* grrd's Dice\n* Copyright (c) 2015 Gerard Tyedmers, grrd@gmx.net\n* Licensed under the MPL License\n*/\n"
                },
                files: {
                    '../../2_Build/Dice/js/dice.css': ['js/dice.css']
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
                    dest: '../../2_Build/Dice'
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
                    {expand: true, flatten: true, src: ['../../2_Build/Dice/index.html'], dest: '../../2_Build/Dice/'}
                ]
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['locales/**'], dest: '../../2_Build/Dice/'},
                    {expand: true, flatten: true, src: ['manifest/*'], dest: '../../2_Build/Dice/manifest/'},
                    {expand: true, flatten: true, src: ['models/*'], dest: '../../2_Build/Dice/models/'},
                    {expand: true, flatten: true, src: ['images/*.ico'], dest: '../../2_Build/Dice/images/'},
                    {expand: true, flatten: true, src: ['js/jquery*.*'], dest: '../../2_Build/Dice/js/'},
                    {expand: true, flatten: true, src: ['js/build/*'], dest: '../../2_Build/Dice/js/build/'},
                    {expand: true, flatten: true, src: ['**.txt'], dest: '../../2_Build/Dice/'},
                    {expand: true, flatten: true, src: ['**.md'], dest: '../../2_Build/Dice/'}
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
        'uglify',
        'svgmin',
        'imagemin',
        'cssmin',
        'htmlmin',
        'replace',
        'copy'
    ]);


};