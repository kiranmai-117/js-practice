const requestHandler = (request)=>{
  console.log(request);
  return new Response(`<html>
  <head>
  <link rel="stylesheet" href="board_style.css">
  <style>
    .board{
height: 200px;
width : 200px;
padding: 20px;
background-color: hsl(205, 23%, 42%);
display: grid;
grid-template-columns: 1fr 1fr 1fr;
}

.cell{
height: 60px;
width: 60px;
background-color: aqua;
}
   </style>
  </head>
  <body>
    <div class="board">
      <a href="1" class="cell"></a>
      <a href="2" class="cell"></a>
      <a href="3" class="cell"></a>
      <a href="4" class="cell"></a>
      <a href="5" class="cell"></a>
      <a href="6" class="cell"></a>
      <a href="7" class="cell"></a>
      <a href="8" class="cell"></a>
      <a href="9" class="cell"></a>
    </div>    
  </body>
</html>`,{
  headers :{
    'content-type':'text/html'
  }
});
}

const main = ()=>{
  Deno.serve(requestHandler);
}

main();