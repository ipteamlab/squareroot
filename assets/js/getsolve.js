var solver=require('./assets/js/module');

$('#paramEqua').submit(function (e) {
    e.preventDefault();
    
    var a = +jQuery("#a").val();
    var b = +jQuery("#b").val();
    var c = +jQuery("#c").val();
    var param={"a": a, "b": b, "c": c  }
    updateReport(param)
});

function updateReport(data) {
    var resOmj=solver.rootQuadraticEqua(data);
    var output = "";
    $('#reportsolve').replaceWith('<div id="reportsolve"> </div>');
    $('#btnpdf').replaceWith('<div id="btnpdf"> </div>');

    output = `
        <p>
            `+ resOmj.report + `
        </p>
        `
    $('#reportsolve').append(output);
    //$('#btnpdf').append('<br><input type="submit" value="PDF report" class="ui button" />');
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}
