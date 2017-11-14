module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //合并文件
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'dist/built.js',
            }
        },
        //压缩文件
        uglify: {
            output: {
                mangle:{
                	properties:true
                },
                compress:true
            },
            build: {
                src: ['dist/built.js'],
                dest: 'dist/<%=pkg.name%>.min.js'
            }
        },
        //sass处理
        sass: {
            output: {
                style: 'sassStyle'
            },
            files: {
                'dest/css/style.css': 'src/css/.scss'
            }
        },
        //监听
        watch: {
           
            	 options: {
            		livereload: '<%= connect.options.livereload %>'
            	},
            	scripts: {
                files: ['./src/css/*','./src/html/*.html'],
                tasks: ['sass']
            }
            	
            
        },
        connect: {
        		options: {
        		    port:8000,
        			hostname: 'localhost',
        			keepalive:true,
        			base: ['src/html'],
        			livereload:35355
        	},
        	server: {
        		options:{
        			open:true
        		}
        		
        	}
        	
        	
        }
    });
    //加载插件
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-contrib-jshint');   
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    //	注册任务
    grunt.registerTask('default', ['sass', 'concat', 'uglify']);
    grunt.registerTask('run', ['connect:server','watch']); 
}