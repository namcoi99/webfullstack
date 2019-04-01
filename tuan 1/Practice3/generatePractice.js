'use strict'

function search(input, target) {
  for(let i = 0;i<input.length;i++){
    if(input[i]==target)
    return i;
  }
  return -1;
}

function sort(input) {
  for(let i=0;i<input.length-1;i++){
    for(let j=0;j<input.length-i-1;j++){
      if(input[j]>input[j+1]){
        let temp=input[j];
        input[j]=input[j+1];
        input[j+1]=temp;
      }
    }
  }
  return input;
}

function generate(testLengthArray){
  const array =[];
  for(let i = 0;i<testLengthArray.length;i++){
    let obj = {
      input: [],
      target: 0,
      output: -1
    }
    for(let j = 0; j<testLengthArray[i];j++){
      obj.input.push(Math.floor((Math.random()*20000)-10000));
    }
    sort(obj.input);
    if(i == 0){
      obj.target = 100001;
      obj.output = obj.input.indexOf(obj.target);
    }
    else if(i == 1){
      obj.target = obj.input[0];
      obj.output = 0;
    }
    else if(i == 2){
      obj.target = obj.input[obj.input.length-1];
      obj.output = obj.input.length-1;
    }
    else if(i == 3){
      obj.target = obj.input[2];
      obj.output = 2;
    }
    else{
      obj.target = Math.floor((Math.random()*20000)-10000);
      obj.output = search(obj.input,obj.target);
    }
    array.push(obj);
  }
  return array;
}

module.exports = generate
