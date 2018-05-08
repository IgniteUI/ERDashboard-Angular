/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'https://unpkg.com/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core@5.0.1/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common@5.0.1/bundles/common.umd.js',
	  '@angular/compiler': 'npm:@angular/compiler@5.0.1/bundles/compiler.umd.js',
	  '@angular/common/http': 'npm:@angular/common@5.0.1/bundles/common-http.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser@5.0.1/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@5.0.1/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http@5.0.1/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router@5.0.1/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms@5.0.1/bundles/forms.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs@5.0.1',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api@0.3.0',
      'igniteui-angular-wrappers': 'npm:igniteui-angular-wrappers@5.0.7'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'igniteui-angular-wrappers': {
          main: './bundles/igniteui-angular-wrappers.umd.js'
      },
      api: {
        defaultExtension: 'ts'
      }
    },
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true}
  });
})(this);
