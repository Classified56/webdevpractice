//echo("Echo!!!", 10);
//echo("Tater Tots", 3); 

function echo(str, num){
    for(var i = 0; i < num; i++){
        console.log(str);
    }
}

var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

function average(arr){
    var sum = 0, count = 0;
    arr.forEach(function(num){
        sum += num;
        count++;
    });
    return Math.round(sum/count);
}

console.log(average(scores));
console.log(average(scores2));