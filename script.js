document.getElementById('submit').addEventListener('click', submitForm)

function submitForm(e) {
    e.preventDefault();
    document.getElementById('result').textContent = "";
    var tuple = document.getElementById('tuple');
    var definition = document.getElementById('definition');

    var array = string_to_array(tuple.value);
    var string = array_to_string(array);
    //console.log(string_to_array(tuple.value));
    //console.log(tuple.value);
    //console.log(definition.value);
    document.getElementById('result').textContent = string;
    tuple.value = "";
    definition.value = "";
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

function formalize(array) {
    if (array.length == 1) {
        console.log("Array length 1");
    }
    else if (array.length == 2) {
        if (Array.isArray(array[0]) && Array.isArray(array[1])) {
            console.log("Before:" + array_to_string(array));
            var first = formalize(array[0]);
            var second = formalize(array[1]);
            var updated = [first, second];
            console.log("After: " + array_to_string(updated));
            return updated;
        } 
        else if (Array.isArray(array[0]) && !(Array.isArray(array[1]))) {
            console.log("Before: " + array_to_string(array));
            array.splice(0,1, formalize(array[0]));
            console.log("After: " + array_to_string(array));
            return array;
        }
        else if (!(Array.isArray(array[0])) && Array.isArray(array[1])) {
            console.log("Before: " + array_to_string(array));
            array.splice(1,1, formalize(array[1]));
            console.log("After: " + array_to_string(array));
            return array;
        }
        else {
            console.log("Neither are arrays: " + array_to_string(array));
            return array;
        }
    }
    else {
        console.log("Before: " + array_to_string(array));
        var first = array.shift();
        var second = array.shift();
        var updated = formalize([first,second]);
        array.unshift(updated)
        console.log("After: " + array_to_string(array));
        return formalize(array);
    }
}


