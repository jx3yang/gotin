const jdenticon = require("jdenticon");
const fs = require("fs");

jdenticon.configure({
  lightness: {
    color: [0.40, 0.80],
    grayscale: [0.30, 0.90]
  },
  saturation: {
    color: 0.49,
    grayscale: 0.00
  },
  backColor: "#0000"
});

const users = Array(20).fill(0).map((_, index) => `user_${index}`);
users.push("theuser");
users.forEach(user => {
  fs.writeFileSync(`./src/assets/${user}.svg`, jdenticon.toSvg(user, 100));
});
