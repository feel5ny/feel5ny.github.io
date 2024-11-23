const webp=require('webp-converter');

//pass input image(.gif) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//gwebp(input,output,option)

const result = webp.gwebp("./4.gif","./4.webp","-q 80");
result.then((response) => {
  console.log(response);
});