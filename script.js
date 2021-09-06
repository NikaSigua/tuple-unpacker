// TODO: clean up this submitForm function...
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

const string_to_array = string => formalize(JSON.parse(string.replaceAll('(','[').replaceAll(')',']')));
const array_to_string = array => JSON.stringify(array).replaceAll('[','(').replaceAll(']',')');

/* Formalize takes a tuple and transforms it into an
   ordered pair, of which each index is itself either an ordered pair
   or a singleton, e.g., (1,2,3,4,5) -> ((((1,2),3),4),5). */

const formalize = array =>  {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);

    if (array.length == 1) return console.log("Error: Tuple of length 1 (should be greater than 1)");
    if (array.length == 2 && x_is_array && y_is_array) return [formalize(x),formalize(y)];
    if (array.length == 2 && x_is_array && !y_is_array) {array.splice(0,1, formalize(x)); return array;}
    if (array.length == 2 && !x_is_array && y_is_array) {array.splice(1,1, formalize(y)); return array;}
    if (array.length == 2 && !x_is_array && !y_is_array) return array;
    if (array.length > 2) {
        let first = array.shift();
        let second = array.shift();
        let updated = formalize([first,second]);
        array.unshift(updated)
        return formalize(array);}}

/* Kuratowski's definiton of an ordered pair is (x,y) := {{x},{x,y}}. */
const kuratowski = array => {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);
    let x_and_y_are_identical = (JSON.stringify(x) == JSON.stringify(y));

    if (array.length != 2) return console.log("Error: Tuple is not an ordered pair.");
    if (x_is_array && y_is_array && x_and_y_are_identical) return `{{${kuratowski(x)}}}`;
    if (x_is_array && y_is_array && !x_and_y_are_identical) return `{{${kuratowski(x)}},{${kuratowski(x)},${kuratowski(y)}}}`;
    if (x_is_array && !y_is_array) return `{{${kuratowski(x)}},{${kuratowski(x)},${y}}}`;
    if (!x_is_array && y_is_array) return `{{${x}},{${x},${kuratowski(y)}}}`;
    if (!x_is_array && !y_is_array && x_and_y_are_identical) return `{{${x}}}`;
    if (!x_is_array && !y_is_array && !x_and_y_are_identical) return `{{${x}},{${x},${y}}}`;}

/* The 'reverse' definiton of an ordered pair is (x,y) := {{y},{y,x}} */
const reverse = array => {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);
    let x_and_y_are_identical = (JSON.stringify(x) == JSON.stringify(y));

    if (array.length != 2) return console.log("Error: Tuple is not an ordered pair.");
    if (x_is_array && y_is_array && x_and_y_are_identical) return `{{${reverse(y)}}}`;
    if (x_is_array && y_is_array && !x_and_y_are_identical) return `{{${reverse(y)}},{${reverse(y)},${reverse(x)}}}`;
    if (x_is_array && !y_is_array) return `{{${y}},{${y},${reverse(x)}}}`;
    if (!x_is_array && y_is_array) return `{{${reverse(y)}},{${reverse(y)},${x}}}`;
    if (!x_is_array && !y_is_array && x_and_y_are_identical) return `{{${y}}}`;
    if (!x_is_array && !y_is_array && !x_and_y_are_identical) return `{{${y}},{${y},${x}}}`;}

/* The 'short' definiton of an ordered pair is (x,y) := {x,{x,y}}. */
const short = array => {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);
    let x_and_y_are_identical = (JSON.stringify(x) == JSON.stringify(y));

    if (array.length != 2) return console.log("Error: Tuple is not an ordered pair.");
    if (x_is_array && y_is_array && x_and_y_are_identical) return `{${short(x)},{${short(x)}}}`;
    if (x_is_array && y_is_array && !x_and_y_are_identical) return `{${short(x)},{${short(x)},${short(y)}}}`;
    if (x_is_array && !y_is_array) return `{${short(x)},{${short(x)},${y}}}`;
    if (!x_is_array && y_is_array) return `{${x},{${x},${short(y)}}}`;
    if (!x_is_array && !y_is_array && x_and_y_are_identical) return `{${x},{${x}}}`;
    if (!x_is_array && !y_is_array && !x_and_y_are_identical) return `{${x},{${x},${y}}}`;}

/* The 01 definiton of an ordered pair is (x,y) := {{0,x},{1,y}}. */
const zeroone = array => {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);
    let x_equals_0 = JSON.stringify(x) == 0;
    let y_equals_0 = JSON.stringify(y) == 0;
    let x_equals_1 = JSON.stringify(x) == 1;
    let y_equals_1 = JSON.stringify(y) == 1;
    let x_and_y_are_identical = (JSON.stringify(x) == JSON.stringify(y));

    if (array.length != 2) return console.log("Error: Tuple is not an ordered pair.");
    if (x_is_array && y_is_array) return `{{0,${zeroone(x)}},{1,${zeroone(y)}}}`;
    if (x_is_array && !y_is_array && y_equals_1) return `{{0,${zeroone(x)}},{1}}`;
    if (x_is_array && !y_is_array && !y_equals_1) return `{{0,${zeroone(x)}},{1,${y}}}`;
    if (!x_is_array && y_is_array && x_equals_0) return `{{0},{1,${zeroone(y)}}}`;
    if (!x_is_array && y_is_array && !x_equals_0) return `{{0,${x}},{1,${zeroone(y)}}}`;
    if (!x_is_array && !y_is_array && x_equals_0 && y_equals_0) return `{{0},{1,0}}`;
    if (!x_is_array && !y_is_array && x_equals_0 && y_equals_1) return `{{0},{1}}`;
    // ! ISSUE: on input (1,0), the result is {{0,1},{1,0}}, which is not reduced.
    // TODO: figure out how to reduce {{0,1},{1,0}}. Currently it is set to {{0,1}}.
    if (!x_is_array && !y_is_array && x_equals_1 && y_equals_0) return `{{0,1}}`;
    if (!x_is_array && !y_is_array && x_equals_1 && y_equals_1) return `{{0,1},{1}}`;
    if (!x_is_array && !y_is_array && !x_and_y_are_identical) return `{{0,${x}},{1,${y}}}`;  }

/* Hausdorff's definiton of an ordered pair is (x,y) := {{x,1},{y,2}}. */
const hausdorff = array => {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);
    let x_equals_1 = JSON.stringify(x) == 1;
    let y_equals_1 = JSON.stringify(y) == 1;
    let x_equals_2 = JSON.stringify(x) == 2;
    let y_equals_2 = JSON.stringify(y) == 2;
    let x_and_y_are_identical = (JSON.stringify(x) == JSON.stringify(y));

    if (array.length != 2) return console.log("Error: Tuple is not an ordered pair.");
    if (x_is_array && y_is_array) return `{{${hausdorff(x)},1},{${hausdorff(y)},2}}`;
    if (x_is_array && !y_is_array && y_equals_2) return `{{${hausdorff(x)},1},{2}}`;
    if (x_is_array && !y_is_array && !y_equals_2) return `{{${hausdorff(x)},1},{${y},2}}`;
    if (!x_is_array && y_is_array && x_equals_1) return `{{1},{${hausdorff(y)},2}}`;
    if (!x_is_array && y_is_array && !x_equals_1) return `{{${x},1},{${hausdorff(y)},2}}`;
    if (!x_is_array && !y_is_array && x_equals_1 && y_equals_1) return `{{1},{1,2}}`;
    if (!x_is_array && !y_is_array && x_equals_1 && y_equals_2) return `{{1},{2}}`;
    // ! ISSUE: on input (2,1), the result is {{2,1},{1,2}}, which is not reduced.
    // TODO: figure out how to reduce {{2,1},{1,2}}. Currently it is set to {{1,2}}.
    if (!x_is_array && !y_is_array && x_equals_2 && y_equals_1) return `{{1,2}}`;
    if (!x_is_array && !y_is_array && x_equals_2 && y_equals_2) return `{{2,1},{2}}`;
    if (!x_is_array && !y_is_array && !x_and_y_are_identical) return `{{${x},1},{${y},2}}`;}

/* Wiener's definiton of an ordered pair is (x,y) := {{{x},{}},{{y}}}. */
const wiener = array => {
    const x = array[0];
    const y = array[1];

    let x_is_array = Array.isArray(x);
    let y_is_array = Array.isArray(y);

    if (array.length != 2) return console.log("Error: Tuple is not an ordered pair.");
    if (x_is_array && y_is_array) return `{{{${wiener(x)}},{}},{{${wiener(y)}}}}`;
    if (x_is_array && !y_is_array) return `{{{${wiener(x)}},{}},{{${y}}}}`;
    if (!x_is_array && y_is_array) return `{{{${x}},{}},{{${wiener(y)}}}}`;
    if (!x_is_array && !y_is_array) return `{{{${x}},{}},{{${y}}}}`;}

// TODO: add functionality that unpacks the numbers themselves (via von Neumann definition).
// TODO: add functionality that returns the string of {s and }s into a binary string.