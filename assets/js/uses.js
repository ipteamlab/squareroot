jQuery("#a, #b, #c").change(function() {
    var content;
    var a = +jQuery("#a").val();
    var b = +jQuery("#b").val();
    var c = +jQuery("#c").val();
    var signb;
    var signc;
    var b_x=Math.abs(-4*b/(2*a));
    var a_x=Math.abs(4*b*b*(1-2*a)/(4*a)+c);

    if (b_x==0) b_x=10;
    if (a_x==0) a_x=10;

    if(b<0){
        signb="-"
    } else {
        signb="+"
    }

    if(c<0){
        signc="-"
    } else {
        signc="+"
    }
    
    content =`<div id="equa">
        <p>
        \\(`+ a +`x^2 `+ signb + Math.abs(b) +`x`+ signc + Math.abs(c) + `=0\\)
        <div id="equa">
        </p>
    </div>
`
    jQuery("#equa").replaceWith(content);

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
})


jQuery("#button").click(function() {
    var content;
    var a = +jQuery("#a").val();
    var b = +jQuery("#b").val();
    var c = +jQuery("#c").val();
    var signb;
    var signc;
    var b_x=Math.abs(-4*b/(2*a));
    var a_x=Math.abs(4*b*b*(1-2*a)/(4*a)+c);

    if (b_x==0) b_x=10;
    if (a_x==0) a_x=10;

    if(b<0){
        signb="-"
    } else {
        signb="+"
    }

    if(c<0){
        signc="-"
    } else {
        signc="+"
    }

    $('#some_modal').replaceWith('<div id="some_modal" class="ui modal"></div>');

var content1=`
            <div id="some_modal" class="ui modal">
            <i class="close icon"></i>
            <div class="header">
                Graphical Solve
            </div>
            <div class="image content">
                <div class="ui medium image">
                <div id="box" class="jxgbox" style="width:800px; height:500px;"> </div>
                </div>
            </div>
            <div class="actions">
                <div class="ui positive right labeled icon button">
                OK, that's cool
                <i class="checkmark icon"></i>
                </div>
            </div>
            </div>
`
    jQuery("#some_modal").replaceWith(content1);
    jQuery('.ui.modal').modal('show');
    //jQuery("#reportsolve").append(`<div id="box" class="jxgbox" style="width:525px; height:500px;"> </div>`);

    
    var graph = JXG.JSXGraph.initBoard('box', {boundingbox: [-b_x, a_x, b_x, -a_x], axis: true});
    var graph_of_fun=graph.create('functiongraph', [function(x){return a*Math.pow(x,2)+b*x+c;},-8*b_x,8*b_x]);
    var line1=graph.create('line', [[0,0], [1,0]]);
    graph.create('intersection', [graph_of_fun,line1, 1]);
    graph.create('intersection', [graph_of_fun,line1, 0]);
})


jQuery('#button2').click(function() {

    var pdf = new jsPDF('p', 'pt', 'letter');
    source=$('#reportsolve')[0];
    var specialElementHandlers = {
        '#bypassme': function (element, renderer) {
            return true; 
        } 
    }

    margins={
        top: 50,
        left: 60,
        width: 545
    }

    pdf.fromHTML(
        source,
        margins.left,
        margins.top,
        {
            'width':margins.width,
            'elementHandlers': specialElementHandlers 
        },
        function(dispose) {
            pdf.save('file.pdf');
        }

    );
   
});




