
module.exports = {

    rootQuadraticEqua: function (param_abc) {
        var x1, x2;
        var report = "";
        var a = param_abc.a;
        var b = param_abc.b;
        var c = param_abc.c;

        var D = Math.pow(b, 2) - 4 * a * c;

        if (D > 0) {
            x1 = (-b + Math.sqrt(D)) / (2 * a);
            x2 = (-b - Math.sqrt(D)) / (2 * a);
        };

        if (D == 0) {
            x1 = (-b + Math.sqrt(D)) / (2 * a);
        };

        if (D < 0) {
            x1 = "the equation does not have solution";
        };
         
        report = `
            \\( \\text{1) Calculate the descriminant:}\\)
            \\[D=\\sqrt{b^{2}-4ac}=\\sqrt{`+ b + `^{2}-4·` + a + `·` + c + `}=` + D.toFixed(2) + `\\]
            \\( \\text{2) The roots of equation:}\\)
            \\[x_{1}=`+x1.toFixed(4)+`\\]
            \\[x_{2}=`+x2.toFixed(4)+`\\]
            `
        return { "x1": x1, "x2": x2, "report": report }
    }

}

