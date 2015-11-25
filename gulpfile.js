
//default task performs the build. Just call gulp or gulp build
//cleans the dist folder. Sets the version in a number of files. Builds the dojo release

debug = true;
var gulp = require('gulp');
var exec = require('child_process').exec;

var dojoProfile = "profiles/app.profile.js";
var buildDir = "../dist";
var srcDir = "EAO";
var appName = "EAOnline-Resources";

///the main build task with all the extras in sequence///
//// default gulp task calls build
gulp.task('default', ['build'], function () { });
//// This will run in this order: 
var runSequence = require('run-sequence');
gulp.task('build', function (callback) {
    runSequence('cleanDist', //remove the old build
                'bump', //increases the version numbers
                'copyFiles', //copies all non dojo files
                'minify-html', //as it says
				'repoint-env', //points the project at local dojo/esri js
                'buildDojo', //the dojo build
                callback);
});
///the main build task with all the extras in sequence///


//task to perform the dojo build using node.js
gulp.task('buildDojo', function (cb) {
    var ex = 'node ' + srcDir + '/arcgis-js-api/dojo/dojo.js load=build --profile ' + dojoProfile + ' releaseDir=' + buildDir;
    console.log(ex);
    exec(ex, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});


////code to bump version
var fs = require('fs');
////for version
var bump = require('gulp-bump');
var semver = require('semver');
var replace = require('gulp-replace');

var getPackageJson = function () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};

// bump versions on package.json 
gulp.task('bump', function (cb) {
    // reget package 
    var pkg = getPackageJson();
    // increment version 
    var newVer = semver.inc(pkg.version, 'patch');
    console.log('New version being set to ' + newVer);
    //got our version now set all the files
    gulp.src('./package.json')
    .pipe(bump({ version: newVer }))
    .pipe(gulp.dest('./')).on('end', function () {

        //DW someone could better with regex could probably do a better job of these. Also I've had to nest all the stream calls. There must be a better way?
        //now the json files
        gulp.src(srcDir + '/*.json')
          .pipe(replace(/"version": "(\d+\.)(\d+\.)(\d+)"/gi, '"version": "' + newVer + '"'))
          .pipe(gulp.dest(srcDir)).on('end', function () {
              //The html files
              gulp.src(srcDir + '/*.html')
              .pipe(replace(/version\s*=\s*(\d+\.)(\d+\.)(\d+)/gi, 'version=' + newVer))
              .pipe(gulp.dest(srcDir)).on('end', function () {
                  //The js simpleLoader.js
                  gulp.src(srcDir + '/simpleLoader.js')
                  .pipe(replace(/version\s*=\s*[""'](\d+\.)(\d+\.)(\d+)["']/gi, "version='" + newVer + "'")) //regex ignores spaces between the = and looks for ' or "
                  .pipe(gulp.dest(srcDir)).on('end', function () {
                      //the app profle which sets the dojo version
                      gulp.src('profiles/app.profile.js')
                      .pipe(replace(/version\s*:\s*[""'](\d+\.)(\d+\.)(\d+)["']/gi, "version: '" + newVer + "'")) //regex ignores spaces between the : and looks for ' or "
                      .pipe(gulp.dest('profiles/')).on('end', function () {
                          return cb();
                      });
                  });
              });
          });
    });
});
//code to bump version


//Repoint the app at the local dojo
gulp.task('repoint-env', function () {
    gulp.src([srcDir + '/env.js'])
      .pipe(replace("apiUrl = '//js.arcgis.com/3.14';", "apiUrl = 'arcgis-js-api/';"))
      .pipe(gulp.dest('./dist'));
});

//code to copy files
gulp.task('copyFiles', function () {
    //json files
    gulp.src(srcDir + '/*.json')
    .pipe(gulp.dest('./dist'));
    //proxy
    gulp.src(srcDir + '/proxy*')
    .pipe(gulp.dest('./dist'));
    //root js
    gulp.src(srcDir + '/*.js')
    .pipe(gulp.dest('./dist'));
    //bin folder
    gulp.src(srcDir + '/bin/**/*')
    .pipe(gulp.dest('./dist/bin/'));
    //images folder
    gulp.src(srcDir + '/images/**/*')
    .pipe(gulp.dest('./dist/images/'));
});
//code to copy files


//minify html
var minifyHTML = require('gulp-minify-html');
gulp.task('minify-html', function () {
    var opts = {
        conditionals: true //keep conditional IE statements
    };
    return gulp.src(srcDir + '/*.html')
      .pipe(minifyHTML(opts))
      .pipe(gulp.dest('./dist/'));
});

////clean the build
var del = require('del');
gulp.task('cleanDist', function (cb) {
    del([
      // here we use a globbing pattern to match everything inside the `dist` folder
      'dist/**/*'
    ], cb);
});


//clean the unbuild files from release
gulp.task('cleanUnbuilt', function (cb) {
    del([
      // here we use a globbing pattern to match everything inside the `dist` folder
      'dist/**/*.uncompressed.js',
	  'dist/**/*.js.map',
	  'dist/**/*.consoleStripped.js'
    ], cb);
});


//////Copy to server. Open the url

//web server
var connect = require('gulp-connect');
gulp.task('webserver',  function() {
    connect.server({
        livereload: true
    });
});

//open the url
var open = require('gulp-open');
gulp.task('open-local', function () {
    gulp.src('./dist/index.html')
    .pipe(open({ uri: 'http://localhost:8080/dist/index.html' }));
})
gulp.task('open-release', function () {
    gulp.src('./dist/index.html')
    .pipe(open({ uri: 'http://vmagstenthree1.eclldn.local/' + appName }));
});


//code to copy files
gulp.task('copyFilesToServer', function () {
    //json files
    return gulp.src('./dist/**/*')
    .pipe(gulp.dest(destServerDir));
});
//code to copy files

gulp.task('copyRelease', function (callback) {
    runSequence('copyFilesToServer', //remove the old build
                'webserver', //increases the version numbers
                'open', //copies all non dojo files
                callback);
});
