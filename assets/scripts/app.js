const App = (() => {

    const events = {
        ajax: {
            html: 'app.ajax.html',
            complete: 'app.ajax.complete',
        },
    };

    return {
        events,
        onAjaxStream:[],
    };
})();