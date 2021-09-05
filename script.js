const submitForm = (e) => {
    e.preventDefault();
    document.getElementById('formalized').textContent = "";
    document.getElementById('result').textContent = "";
    const tuple = document.getElementById('tuple');
    const definition = document.getElementById('definition');
    let array = string_to_array(tuple.value);
    let string = array_to_string(array);
    if (definition.value == 1) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = kuratowski(array);
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('hidden2').style.display = 'block';
    }
    else if (definition.value == 2) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = reverse(array);
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('hidden2').style.display = 'block';
    }
    else if (definition.value == 3) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = short(array);
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('hidden2').style.display = 'block';
    }
    else if (definition.value == 4) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = zeroone(array);
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('hidden2').style.display = 'block';
    }
    else if (definition.value == 5) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = hausdorff(array);
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('hidden2').style.display = 'block';
    }
    else if (definition.value == 6) {
        document.getElementById('formalized').textContent = string;
        document.getElementById('result').textContent = wiener(array);
        document.getElementById('hidden').style.display = 'block';
        document.getElementById('hidden2').style.display = 'block';
    }
    tuple.value = "";
    definition.value = "";
}

document.getElementById('submit').addEventListener('click', submitForm);

const string_to_array = string => {
    let brackets = string.replaceAll('(','[').replaceAll(')',']');
    let array = JSON.parse(brackets);
    let formalized = formalize(array);
    return formalized;
}

const array_to_string = array => {
    let string = JSON.stringify(array);
    let tuple = string.replaceAll('[','(').replaceAll(']',')');
    return tuple;
}

/* 
Formalize takes a tuple and transforms it into an
ordered pair, of which each index is itself either an ordered pair
or a singleton, e.g., (1,2,3,4,5) -> ((((1,2),3),4),5). 
*/

const formalize = array =>  {
    if (array.length == 1) {
        console.log("Array length 1");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            let first = formalize(array[0]);
            let second = formalize(array[1]);
            let updated = [first, second];
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
        let first = array.shift();
        let second = array.shift();
        let updated = formalize([first,second]);
        array.unshift(updated)
        return formalize(array);
    }
}

/* 
Kuratowski's definiton of an ordered pair is (x,y) := {{x},{x,y}}.
*/
const kuratowski = array => {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                let set = "{{" + kuratowski(array[0]) + "}}";
                return set;
            }
            else {
                let set = "{{" + kuratowski(array[0]) + "},{" + kuratowski(array[0]) + "," + kuratowski(array[1]) + "}}";
                return set;
            }
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            let set = "{{" + kuratowski(array[0]) + "},{" + kuratowski(array[0]) + "," + array[1] + "}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            let set = "{{" + array[0] + "},{" + array[0] + "," + kuratowski(array[1]) + "}}";
            return set;
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                let set = "{{" + array[0] + "}}";
                return set;
            }
            else {
                let set = "{{" + array[0] + "},{" + array[0] + "," + array[1] + "}}";
                return set;
            }
        }
    }
}

/* 
The 'reverse' definiton of an ordered pair is (x,y) := {{y},{y,x}} 
*/
const reverse = array => {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                let set = "{{" + reverse(array[1]) + "}}";
                return set;
            }
            else {
                let set = "{{" + reverse(array[1]) + "},{" + reverse(array[1]) + "," + reverse(array[0]) + "}}";
                return set;
            }
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            let set = "{{" + array[1] + "},{" + array[1] + "," + reverse(array[0]) + "}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            let set = "{{" + reverse(array[1]) + "},{" + reverse(array[1]) + "," + array[0] + "}}";
            return set;
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                let set = "{{" + array[1] + "}}";
                return set;
            }
            else {
                let set = "{{" + array[1] + "},{" + array[1] + "," + array[0] + "}}";
                return set;
            }
        }
    }
}

/* 
The 'short' definiton of an ordered pair is (x,y) := {x,{x,y}}.
*/
const short = array => {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                let set = "{" + short(array[0]) + ",{" + short(array[0]) + "}}";
                return set;
            }
            else {
                let set = "{" + short(array[0]) + ",{" + short(array[0]) + "," + short(array[1]) + "}}";
                return set;
            }
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            let set = "{" + short(array[0]) + ",{" + short(array[0]) + "," + array[1] + "}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            let set = "{" + array[0] + ",{" + array[0] + "," + short(array[1]) + "}}";
            return set;
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                let set = "{" + array[0] + ",{" + array[0] + "}}";
                return set;
            }
            else {
                let set = "{" + array[0] + ",{" + array[0] + "," + array[1] + "}}";
                return set;
            }
        }
    }
}

/* 
The 01 definiton of an ordered pair is (x,y) := {{0,x},{1,y}}.
*/
const zeroone = array => {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            let set = "{{0," + zeroone(array[0]) + "},{1," + zeroone(array[1]) + "}}";
            return set;
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            if (JSON.stringify(array[1]) == 1) {
                let set = "{{0," + zeroone(array[0]) + "},{1}}";
                return set;
            }
            else {
                let set = "{{0," + zeroone(array[0]) + "},{1," + array[1] + "}}";
                return set;
            }
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == 0) {
                let set = "{{0},{1," + zeroone(array[0]) + "}}";
                return set;
            }
            else {
                let set = "{{0," + array[0] + "},{1," + zeroone(array[1]) + "}}";
                return set;
            }
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                if (JSON.stringify(array[0]) == 0) {
                    let set = "{{0},{1,0}}";
                    return set;
                }
                else if (JSON.stringify(array[1]) == 1) {
                    let set = "{{0,1},{1}}"
                    return set;
                }
                else {
                    let set = "{{0," + array[0] + "},{1," + array[1] + "}}";
                    return set;
                }
            }
        }
    }
}

/* 
Hausdorff's definiton of an ordered pair is (x,y) := {{x,1},{y,2}}.
*/
const hausdorff = array => {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            let set = "{{" + hausdorff(array[0]) + ",1},{" + hausdorff(array[1]) + ",2}}";
            return set;
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            if (JSON.stringify(array[1]) == 2) {
                let set = "{{" + hausdorff(array[0]) + ",1},{2}}";
                return set;
            }
            else {
                let set = "{{" + hausdorff(array[0]) + ",1},{" + array[1] + ",2}}";
                return set;
            }
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            if (JSON.stringify(array[0]) == 1) {
                let set = "{{1},{" + hausdorff(array[1]) + ",2}}";
                return set;
            }
            else {
                let set = "{{" + array[0] + ",1},{" + hausdorff(array[1]) + ",2}}";
                return set;
            }
        }
        else {
            if (JSON.stringify(array[0]) == JSON.stringify(array[1])) {
                if (JSON.stringify(array[0]) == 1) {
                    let set = "{{1},{1,2}}";
                    return set;
                }
                else if (JSON.stringify(array[1]) == 2) {
                    let set = "{{2,1},{2}}"
                    return set;
                }
                else {
                    let set = "{{" + array[0] + ",1},{" + array[1] + ",2}}";
                    return set;
                }
            }
        }
    }
}

/* 
Wiener's definiton of an ordered pair is (x,y) := {{{x},{}},{{y}}}.
*/
const wiener = array => {
    if (array.length == 1) {
        console.log("Problematic: length 1.");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            let set = "{{{" + wiener(array[0]) + "},{}},{{" + wiener(array[1]) + "}}}";
            return set;
        }
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            let set = "{{{" + wiener(array[0]) + "},{}},{{" + array[1] + "}}}";
            return set;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            let set = "{{{" + array[0] + "},{}},{{" + wiener(array[1]) + "}}}";
            return set;
        }
        else {
            let set = "{{{" + array[0] + "},{}},{{" + array[1] + "}}}";
            return set;
        }
    }
}
