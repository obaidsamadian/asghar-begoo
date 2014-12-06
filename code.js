/**
 * Created by worldskill on 11/29/2014.
 */
function $(sel,scp){
    return new Lib(sel,scp);
}

Lib = function (sel,scp){

    if(typeof sel == 'string'){
        if(scp){
            if(typeof scp == 'string'){
                scp = document.querySelector(scp);
            }
        }else{
            scp = document;
        }
        this.el = scp.querySelectorAll(sel);
    }else{
        this.el = [sel];
    }
};

Lib.prototype = {
    each: function (callback) {
        var arr = Array.prototype.slice.call(this.el);
        arr.forEach(callback);
    },
    css: function (css) {
        this.each(function(obj){
            for(prop in css){
                obj.style[prop] = css[prop];
            }
        });
    },
    on: function (e,callback) {
        this.each(function (obj) {
            obj.addEventListener(e,callback);
        });
    },
    get: function (num) {
        if(num != undefined){
            return this.el[num];
        }
        return this.el[0];
    }
};

/* this is the core app
*  core app goes here
*/

var quiz  = 'سلام اصغر لطفا به سوال من جواب بده';
var qArry = quiz.split('');
qArry.unshift('');
var answer = '';
var flag = 1;



var dotPress = 0 ;
$('.plz').on('keypress', function (e) {
    console.log(e);
    if(e.charCode == 46){

        flag = flag * -1;

        if(dotPress % 2){
            $('.plz').get().value += qArry[$('.plz').get().value.length+1];
        }
        dotPress++;
        e.preventDefault();

    }

    if(flag == -1){
        e.preventDefault();

        if(e.charCode != 46 && e.charCode != 8) {
            var cond = /[آ-ی]/.test(String.fromCharCode(e.charCode))
            if(cond){
                answer = answer + String.fromCharCode(e.charCode);
            }

        }else if(e.keyCode == 8){
            answer = answer.substr(0,answer.length -1);
        }

        if(qArry[$('.plz').get().value.length+1]){
            $('.plz').get().value +=qArry[$('.plz').get().value.length+1];
        }

    }
});

$('.submit').on('click', function () {
    if(answer == ''){

    }else{
       // $('.ans').get().value = answer;
        var div = document.createElement('div');
        div.classList.add('ans');
        div.innerHTML = answer;
        $('.box').get().appendChild(div);
        setTimeout(function () {
            div.classList.add('show-ans');
        },2000);

    }
});