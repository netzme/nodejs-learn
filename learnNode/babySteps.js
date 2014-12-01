/**
 * Created by untung on 19/09/14.
 */
var arguments = process.argv;
var length = arguments.length;
var i = 0;
var sum = Number(0);
for (i = 2; i < length; i++) {
    sum += Number(arguments[i]);
}
console.log(sum);