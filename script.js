document.getElementById('submit').addEventListener('click', submitForm);

function submitForm(e) {
    e.preventDefault();
    document.getElementById('formalized').textContent = "";
    document.getElementById('result').textContent = "";
    var tuple = document.getElementById('tuple');
    var definition = document.getElementById('definition');

    var array = string_to_array(tuple.value);
    console.log(array);
    //kuratowski(array);
    //reverse(array);
    //short(array);
    //zeroone(array);
    //console.log("kuratowski: " + kuratowski(array));
    //console.log("reverse: " + reverse(array));
    //console.log("short: " + short(array));
    //console.log("zeroone: " + zeroone(array));
    var string = array_to_string(array);
    //console.log(string_to_array(tuple.value));
    //console.log(tuple.value);
    console.log(definition.value);
    if (definition.value == 1) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = kuratowski(array);
    }
    else if (definition.value == 2) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = reverse(array);
    }
    else if (definition.value == 3) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = short(array);
    }
    else if (definition.value == 4) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = zeroone(array);
    }
    else if (definition.value == 5) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = hausdorff(array);
    }
    else if (definition.value == 6) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = wiener(array);
    }
    tuple.value = "";
    definition.value = "";
}

function processor(definition) {
    console.log(definition.value);
    if (definition.value == 1) {
        return kuratowski()
    }
}

function string_to_array(string) {
    var brackets = string.replaceAll('(','[').replaceAll(')',']');
    var array = JSON.parse(brackets);
    var formalized = formalize(array);
    return formalized;
}

function array_to_string(array) {
    var string = JSON.stringify(array);
    var tuple = string.replaceAll('[','(').replaceAll(']',')');
    return tuple;
}

/* 
Formalize takes a tuple and transforms it into an
ordered pair, of which each index is itself either an ordered pair
or a singleton, e.g., (1,2,3,4,5) -> ((((1,2),3),4),5). 
*/

function formalize(array) {
    if (array.length == 1) {
        console.log("Array length 1");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            var first = formalize(array[0]);
            var second = formalize(array[1]);
            var updated = [first, second];
            return updated;
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            array.splice(0,1, formalize(array[0]));
            return array;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            array.splice(1,1, formalize(array[1]));
            return array;
        }
        else {
            return array;
        }
    }
    else {
        var first = array.shift();
        var second = array.shift();
        var updated = formalize([first,second]);
        array.unshift(updated)
        return formalize(array);
    }
}

/* 
Kuratowski's definiton of an ordered pair is (x,y) := {{x},{x,y}}.
*/
function kuratowski(array) {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                var set = "{{" + kuratowski(array[0]) + "}}";
                return set;
            }
            else {
                var set = "{{" + kuratowski(array[0]) + "},{" + kuratowski(array[0]) + "," + kuratowski(array[1]) + "}}";
                return set;
            }
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            var set = "{{" + kuratowski(array[0]) + "},{" + kuratowski(array[0]) + "," + array[1] + "}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            var set = "{{" + array[0] + "},{" + array[0] + "," + kuratowski(array[1]) + "}}";
            return set;
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                var set = "{{" + array[0] + "}}";
                return set;
            }
            else {
                var set = "{{" + array[0] + "},{" + array[0] + "," + array[1] + "}}";
                return set;
            }
        }
    }
}

/* 
The 'reverse' definiton of an ordered pair is (x,y) := {{y},{y,x}} 
*/
function reverse(array) {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                var set = "{{" + reverse(array[1]) + "}}";
                return set;
            }
            else {
                var set = "{{" + reverse(array[1]) + "},{" + reverse(array[1]) + "," + reverse(array[0]) + "}}";
                return set;
            }
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            var set = "{{" + array[1] + "},{" + array[1] + "," + reverse(array[0]) + "}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            var set = "{{" + reverse(array[1]) + "},{" + reverse(array[1]) + "," + array[0] + "}}";
            return set;
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                var set = "{{" + array[1] + "}}";
                return set;
            }
            else {
                var set = "{{" + array[1] + "},{" + array[1] + "," + array[0] + "}}";
                return set;
            }
        }
    }
}

/* 
The 'short' definiton of an ordered pair is (x,y) := {x,{x,y}}.
*/
function short(array) {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                var set = "{" + short(array[0]) + ",{" + short(array[0]) + "}}";
                return set;
            }
            else {
                var set = "{" + short(array[0]) + ",{" + short(array[0]) + "," + short(array[1]) + "}}";
                return set;
            }
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            var set = "{" + short(array[0]) + ",{" + short(array[0]) + "," + array[1] + "}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            var set = "{" + array[0] + ",{" + array[0] + "," + short(array[1]) + "}}";
            return set;
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                var set = "{" + array[0] + ",{" + array[0] + "}}";
                return set;
            }
            else {
                var set = "{" + array[0] + ",{" + array[0] + "," + array[1] + "}}";
                return set;
            }
        }
    }
}

/* 
The 01 definiton of an ordered pair is (x,y) := {{0,x},{1,y}}.
*/
function zeroone(array) {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            var set = "{{0," + zeroone(array[0]) + "},{1," + zeroone(array[1]) + "}}";
            return set;
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            if (JSON.stringify(array[1]) == 1) {
                var set = "{{0," + zeroone(array[0]) + "},{1}}";
                return set;
            }
            else {
                var set = "{{0," + zeroone(array[0]) + "},{1," + array[1] + "}}";
                return set;
            }
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == 0) {
                var set = "{{0},{1," + zeroone(array[0]) + "}}";
                return set;
            }
            else {
                var set = "{{0," + array[0] + "},{1," + zeroone(array[1]) + "}}";
                return set;
            }
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                if (JSON.stringify(array[0]) == 0) {
                    var set = "{{0},{1,0}}";
                    return set;
                }
                else if (JSON.stringify(array[1]) == 1) {
                    var set = "{{0,1},{1}}"
                    return set;
                }
                else {
                    var set = "{{0," + array[0] + "},{1," + array[1] + "}}";
                    return set;
                }
            }
        }
    }
}

/* 
Hausdorff's definiton of an ordered pair is (x,y) := {{x,1},{y,2}}.
*/
function hausdorff(array) {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            var set = "{{" + hausdorff(array[0]) + ",1},{" + hausdorff(array[1]) + ",2}}";
            return set;
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            if (JSON.stringify(array[1]) == 2) {
                var set = "{{" + hausdorff(array[0]) + ",1},{2}}";
                return set;
            }
            else {
                var set = "{{" + hausdorff(array[0]) + ",1},{" + array[1] + ",2}}";
                return set;
            }
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == 1) {
                var set = "{{1},{" + hausdorff(array[1]) + ",2}}";
                return set;
            }
            else {
                var set = "{{" + array[0] + ",1},{" + hausdorff(array[1]) + ",2}}";
                return set;
            }
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                if (JSON.stringify(array[0]) == 1) {
                    var set = "{{1},{1,2}}";
                    return set;
                }
                else if (JSON.stringify(array[1]) == 2) {
                    var set = "{{2,1},{2}}"
                    return set;
                }
                else {
                    var set = "{{" + array[0] + ",1},{" + array[1] + ",2}}";
                    return set;
                }
            }
        }
    }
}

/* 
Wiener's definiton of an ordered pair is (x,y) := {{{x},{}},{{y}}}.
*/
function wiener(array) {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            var set = "{{{" + wiener(array[0]) + "},{}},{{" + wiener(array[1]) + "}}}";
            return set;
        }
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            var set = "{{{" + wiener(array[0]) + "},{}},{{" + array[1] + "}}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            var set = "{{{" + array[0] + "},{}},{{" + wiener(array[1]) + "}}}";
            return set;
        }
        else {
            var set = "{{{" + array[0] + "},{}},{{" + array[1] + "}}}";
            return set;
        }
    }
}