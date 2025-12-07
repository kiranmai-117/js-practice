const makeScreen = (width, height) => 
  Array.from({length : height}, y => Array.from({length : width}, x => " "));


const displayScreen = (screen) => console.log(screen.map((x) => x.join("")).join("\n"));



const main = () => {
const width = 30;
const height = 10;
const screen = makeScreen(width, height);

drawOnScreen(screen, 0, 6, "hello");
drawOnScreen(screen, 0, 2, "laptop");
displayScreen(screen);
setInterval(() => {
  console.clear();
  verticalMarque(screen, 6, height);
  verticalMarque(screen, 2, height)
  displayScreen(screen);
}, 300);
}

main();