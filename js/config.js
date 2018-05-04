requirejs.config({
    urlArgs: 'v=' + Math.random(),
    baseUrl: '.',
    waitSeconds: 200,
    paths: {
        //Bower_components
        'jquery': 'bower_components/jquery/dist/jquery.min',
        //Framework
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap.min',
        // Plugins
        'owl-carousel': 'bower_components/owl.carousel/dist/owl.carousel.min',
       
        'mmenu': 'bower_components/jQuery.mmenu/dist/jquery.mmenu.all',
        'bootstrap-datepicker': 'bower_components/bootstrap-datepicker/js/bootstrap-datepicker',
        
        // 'select2': 'js/plugins/select2',
        //App
        // 'helpers': 'js/helpers',
        'router': 'js/router',
        
        // 'jsExports': 'js/exports'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'router': ['jquery']
    }
});
requirejs(['router'], function (Router){
    Router.done();
});