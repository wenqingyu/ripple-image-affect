var output = require('image-output')
var Array2d = require('array-2d')

// create chess pattern png from raw pixels data

let colorMap = {
  0: [0, 0, 0, 255], // black
  1: [255, 0, 0, 255], // red
  2: [0, 255, 0, 255], // green
  3: [255, 255, 0, 255], // yellow
  4: [0, 0, 255, 255], // blue
  5: [255, 0, 255, 255], // purple
  6: [0, 255, 255, 255], // cyan
  7: [255, 255, 255, 255] // white
}

let width = 100
let height = 100

let imgDir = 'image/'
let version = 'a'

let round = 1
let roundCeiling = 10

let current2DArray = new Array2d(width, height, 0)

let next2DArray

var main = async () => {
  await initiate()

  // initiate
  next2DArray = current2DArray
  // output
  await imgPrint(current2DArray, imgDir + version + '_0.jpg')

  while (round < roundCeiling) {
    // Step 1: start evolution
    await roundAdditionEvolution()

    // Step 2: Print evolution result
    await imgPrint(next2DArray, imgDir + version + '_' + round + '.jpg')

    // Step 3: update current2DArray
    current2DArray = next2DArray

    console.log('Round ' + round + ' print end!')

    // Step 4: go to next round
    round++
  }
}

var initiate = async () => {
//   console.log(current2DArray)
  current2DArray.set(0, 0, 1)
  console.log('initiated!')
}

/**
 * round addition algorithm
 * input: current2DArray
 * output: next2DArray
 */
var roundAdditionEvolution = async () => {
  for (let w = 0; w < current2DArray.m; w++) {
    // console.log(w)
    for (let h = 0; h < current2DArray.n; h++) {
      let newColor = await roundAddition(current2DArray, w, h) % Object.keys(colorMap).length
    //   console.log('newColor: ', newColor)
      next2DArray.set(w, h, newColor)
        //   console.log(w, h, chuck)
    }
  }
}

var roundAddition = async (twoDArray, posX, posY) => {
  let output = twoDArray.get(posX, posY)
  // up
  if (posY + 1 < height) {
    output += twoDArray.get(posX, posY + 1)
  }

  // down
  if (posY - 1 >= 0) {
    output += twoDArray.get(posX, posY - 1)
  }

  // left
  if (posX - 1 >= 0) {
    output += twoDArray.get(posX - 1, posY)
  }

  // right
  if (posX + 1 < width) {
    output += twoDArray.get(posX + 1, posY)
  }

  return output
}

/**
 * Print image
 * @param {*} twoDArray imgDestination
 * -------------- Print Image -------------
 */

var imgPrint = async (twoDArray, imgDestination) => {
  let output = []
  for (let w = 0; w < twoDArray.m; w++) {
    // console.log(w)
    for (let h = 0; h < twoDArray.n; h++) {
      let chuckColorNum = twoDArray.get(w, h)
      let chuck = colorMap[chuckColorNum]
    //   console.log(w, h, chuck)
      output = output.concat(chuck)
    }
  }
//   console.log(output)
  await imgWrite(output, twoDArray.m, twoDArray.n, imgDestination)
  return output
}

var imgWrite = async (data, width, height, imgDestination) => {
  output({
    data: data,
    width: width,
    height: height
  }, imgDestination)
}

/**
 * ------------ Print image end ------------
 */

main()
