let parsedDart;
let tileSize = 32;

function setup() {
  createCanvas(800, 600);
  fetch("roommaze.dart")
  .then((response) => response.text())
  .then((dartFile) => {
    parsedDart = parseDartFile(dartFile);
  });
}

function draw() {
  background(255);
  if (parsedDart) {
    let rules = parsedDart.rules;
    let gridWidth = width / tileSize;
    let gridHeight = height / tileSize;
    for (let i = 0; i < gridWidth; i++) {
      for (let j = 0; j < gridHeight; j++) {
        let tileType = rules[0].out; // Use the first rule's output as an example
        drawTile(tileType, i * tileSize, j * tileSize);
      }
    }
  }
}

function parseDartFile(dartFile) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(dartFile, "text/xml");
  let rules = xmlDoc.getElementsByTagName("rule");
  let parsedRules = [];
  for (let i = 0; i < rules.length; i++) {
    parsedRules.push({
      in: rules[i].getAttribute("in"),
      out: rules[i].getAttribute("out"),
    });
  }
  return {
    rules: parsedRules,
  };
}

function drawTile(type, x, y) {
  if (type === "Empty") {
    fill(255);
  } else if (type === "Line") {
    fill(0);
  } else {
    fill(200);
  }
  rect(x, y, tileSize, tileSize);
}
