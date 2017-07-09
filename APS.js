function pairsSolve(inputArr){
  //global variables and arrays for program
  var pairsArr=[];
  var solArr=[];
  var testSolArr=[];
  var matchArr=[];
  var loop=0;

  //main loop of program
  //
  //generate all pairs needed for testing
  for (var i=0;i<inputArr.length;i++){
    for (var j=0;j<inputArr[i].length;j++){
      for (k=i+1;k<inputArr.length;k++){
        for (l=0;l<inputArr[k].length;l++){
          pairsArr.push([inputArr[i][j]]+[inputArr[k][l]])
        }
      }
    }
  }
  testSolArr = cartProd(inputArr);

  //loop over every potential solution and check to see if it matches what we should include
  while (pairsArr.length>0){  //stop program when we have removed all theoretical matches
    for (var arr in testSolArr){
      matchArr = getPairs(testSolArr[arr])
      if (matchTest(matchArr,loop)==true){
        solArr.push(testSolArr[arr]);
      }
    }
    loop++;
  }
  console.log("number of solutions " + solArr.length)
  console.log(solArr)
  //tests number of matches in array based on current loop, and remove matches when appropriate
  function matchTest(testArr,loop){
    if(pairsArr.length==0) return false;
    var count=0;
    var matchIndices=[];
    var index;
    for (var str in testArr){
      index = pairsArr.indexOf(testArr[str]);
      if(index>-1){
        count++
        matchIndices.push(index)
      }
    }
    if (count===(testArr.length-loop)){
      for (var i=matchIndices.length-1;i>-1;i--){
        pairsArr.splice(matchIndices[i],1)
      }
      return true;
    }
    else{
      return false;
    }
  }
  //generate pairs in individual test case
  function getPairs(pairArr){
    var retArr=[];
    for (var i=0;i<pairArr.length;i++){
      for (var j=i+1;j<pairArr.length;j++){
        retArr.push(pairArr[i] + pairArr[j]);
      }
    }
    return retArr;
  }

  function cartProd(paramArray) {

    function addTo(curr, args) {
      var i, copy,
          rest = args.slice(1),
          last = !rest.length,
          result = [];

      for (i = 0; i < args[0].length; i++) {

        copy = curr.slice();
        copy.push(args[0][i]);

        if (last) {
          result.push(copy);

        } else {
          result = result.concat(addTo(copy, rest));
        }
      }

      return result;
    }


    return addTo([], paramArray);
  }
}
pairsSolve([['0', '1'], ['A', 'B', 'C'], ['D', 'E', 'F', 'G']])
pairsSolve([['0', '1', '2', '3'], ['A', 'B', 'C', 'D'], ['E', 'F', 'G', 'H', 'I']])
pairsSolve([['0', '1', '2', '3', '4'], ['A', 'B', 'C', 'D', 'E'], ['F', 'G', 'H', 'I'], ['J', 'K', 'L']])
