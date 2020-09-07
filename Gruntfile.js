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
                    '../../2_Build/Dice/js/dice.js': ['js/dice.js']
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
                    '../../2_Build/Dice/sw.js': ['sw.js']
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
                    '../../2_Build/Dice/js/shake.js': ['js/shake.js']
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
                    '../../2_Build/Dice/js/loaders/MTLLoader.js': ['js/loaders/MTLLoader.js']
                }
            },
            two: {
                options: {
                    banner: "/*\n* @author mrdoob / http://mrdoob.com/\n*/\n",
                    mangle: true,
                    compress: true
                },
                files: {
                    '../../2_Build/Dice/js/loaders/OBJLoader.js': ['js/loaders/OBJLoader.js']
                }
            },
            three: {
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
                    {'../../2_Build/Dice/i/4inarow.svg': 'i/4inarow.svg'},
                    {'../../2_Build/Dice/i/dice_1.svg': 'i/dice_1.svg'},
                    {'../../2_Build/Dice/i/dice_2.svg': 'i/dice_2.svg'},
                    {'../../2_Build/Dice/i/dice_3.svg': 'i/dice_3.svg'},
                    {'../../2_Build/Dice/i/dice_3kind.svg': 'i/dice_3kind.svg'},
                    {'../../2_Build/Dice/i/dice_4.svg': 'i/dice_4.svg'},
                    {'../../2_Build/Dice/i/dice_4kind.svg': 'i/dice_4kind.svg'},
                    {'../../2_Build/Dice/i/dice_5.svg': 'i/dice_5.svg'},
                    {'../../2_Build/Dice/i/dice_6.svg': 'i/dice_6.svg'},
                    {'../../2_Build/Dice/i/dice_chance.svg': 'i/dice_chance.svg'},
                    {'../../2_Build/Dice/i/dice_full_h.svg': 'i/dice_full_h.svg'},
                    {'../../2_Build/Dice/i/dice_lg_str.svg': 'i/dice_lg_str.svg'},
                    {'../../2_Build/Dice/i/dice_plus.svg': 'i/dice_plus.svg'},
                    {'../../2_Build/Dice/i/dice_sm_str.svg': 'i/dice_sm_str.svg'},
                    {'../../2_Build/Dice/i/dice_sum.svg': 'i/dice_sum.svg'},
                    {'../../2_Build/Dice/i/dice_yahtzee.svg': 'i/dice_yahtzee.svg'},
                    {'../../2_Build/Dice/i/info.svg': 'i/info.svg'},
                    {'../../2_Build/Dice/i/list.svg': 'i/list.svg'},
                    {'../../2_Build/Dice/i/lock.svg': 'i/lock.svg'},
                    {'../../2_Build/Dice/i/mail.svg': 'i/mail.svg'},
                    {'../../2_Build/Dice/i/memo.svg': 'i/memo.svg'},
                    {'../../2_Build/Dice/i/ok.svg': 'i/ok.svg'},
                    {'../../2_Build/Dice/i/puzzle.svg': 'i/puzzle.svg'},
                    {'../../2_Build/Dice/i/settings.svg': 'i/settings.svg'},
                    {'../../2_Build/Dice/i/tictactoe.svg': 'i/tictactoe.svg'},
                    {'../../2_Build/Dice/i/x.svg': 'i/x.svg'}
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
                    dest: '../../2_Build/Dice/i/'
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
                    {expand: true, flatten: true, src: ['i/*.ico'], dest: '../../2_Build/Dice/i/'},
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