
// 纯JS省市区三级联动
// 2011-11-30 by http://www.cnblogs.com/zjfree



$(function() {


function promptinfo()
{
    var address = document.getElementById('address');
    var s1 = document.getElementById('s1');
    var s2 = document.getElementById('s2');
    // var s3 = document.getElementById('s3');
    address.value = s1.value + s2.value ;

}

function Dsy() {
    this.Items = {};
}
Dsy.prototype.add = function (id, iArray) {
    this.Items[id] = iArray;
}
Dsy.prototype.Exists = function (id) {
    if (typeof(this.Items[id]) == "undefined") return false;
    return true;
}

function change(v) {
    var str = "0";

    for (i = 0; i < v; i++) {
        str += ("_" + (document.getElementById(s[i]).selectedIndex - 1));
    }

    ;
    var ss = document.getElementById(s[v]);

    with (ss) {
        length = 0;
        options[0] = new Option(opt0[v], opt0[v]);

        //console.log(opt0[v], opt0[v]);

        if (v && document.getElementById(s[v - 1]).selectedIndex > 0 || !v) {
            if (dsy.Exists(str)) {
                ar = dsy.Items[str];
                for (i = 0; i < ar.length; i++)options[length] = new Option(ar[i], ar[i]);
                if (v) {
                    options[0].selected = true;
                }
            }
        }

        if (++v < s.length) {
            change(v);
        }
    }
}
function preselect(p_key) {
    //alert(p_key);
    var index;

    var provinces = new Array("印尼","中国","巴西");
    var cnt = provinces.length;
    //alert(cnt);
    for (i = 0; i < cnt; i++) {
        if (p_key == provinces[i]) {
            index = i;
            break;
        }
    }
    if (index < provinces.length) {
        document.getElementById(s[0]).selectedIndex = index + 1;

        change(1);
    }
}

var dsy = new Dsy();

dsy.add("0",["印尼","中国","巴西"]);
dsy.add("0_0", ["印尼1", "印尼2", "印尼3"]);
dsy.add("0_1", ["北京","天津","杭州"]);
dsy.add("0_2", ["巴西1","巴西2","巴西3"]);
var s = ["s1", "s2"];
var opt0 = ["国家", "地区"];
function setup() {
    for (i = 0; i < s.length - 1; i++) {
        document.getElementById(s[i]).onchange = new Function("change(" + (i + 1) + ");promptinfo();");
    }
    change(0);
}
});