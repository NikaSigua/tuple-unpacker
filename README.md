# tuple-unpacker

This is a program which takes in an *n*-tuple (sequence) of the form (*x₁ , x₂ , ... , xₙ*), transforms it into a nested ordered pair, and then translates the ordered pair into a set under some user-selected definition of an ordered pair.

For the input, make sure that each element (each *xᵢ*) is a number.

The currently available definitions are as follows: 
- Kuratowski: (*x*,*y*) := {{*x*},{*x*,*y*}}
- Reverse: (*x*,*y*) := {{*y*},{*y*,*x*}}
- Short: (*x*,*y*) := {*x*,{*x*,*y*}}
- 01: (*x*,*y*) := {{0,*x*},{1,*y*}}
- Hausdorff: (*x*,*y*) := {{*x*,1},{*y*,2}}
- Wiener: (*x*,*y*) := {{{*x*},{}},{{*y*}}}

Example:
If the input string is (1,2,3) and the definition chosen is 'Kuratowski', the program will first formalize the tuple by turning it into an ordered pair whose components are either themselves ordered pairs, or otherwise numbers:<br><br>
(1,2,3) -> ((1,2),3)<br><br>
Now, this ordered pair has its first component as '(1,2)' and its second component '3'.
Since the Kuratowski definition of an ordered pair is (*x*,*y*) := {{*x*},{*x*,*y*}}, the program will check to see if either one of '(1,2)' and '3' are themselves ordered pairs (which of course is the case). 
The program will then map the '1' and '2' in '(1,2)' to the *x* and *y* (respectively) in {{*x*},{*x*,*y*}}, giving {{1},{1,2}}, which will then replace (1,2) in ((1,2),3):<br><br>
((1,2),3) -> ({{1},{1,2}},3)<br><br>
But since ({{1},{1,2}},3) itself is an ordered pair, the same function will map '{{1},{1,2}}' to *x* and '3' to *y* in a new instance of {{*x*},{*x*,*y*}}, giving 
{{{{1},{1,2}}},{{{1},{1,2}},3}}:<br><br>
({{1},{1,2}},3) -> {{{{1},{1,2}}},{{{1},{1,2}},3}}<br><br>

Since repetition is ignored in sets, the program also has the feature of replacing any instance of {*x*,*x*} with simply {*x*} (to see this, use (1,1) as the input).

---

Features for the future:
- Add functionality to let the user write their own definition.
- Reintroduce the ability to use characters other than numerals.
- Reintroduce the ability to unpack numbers themselves (with von Neumann ordinals and other options).
- Reintroduce the ability encode '{' as '1' and '}' as '0' (to allow for binary plot visualization options).
