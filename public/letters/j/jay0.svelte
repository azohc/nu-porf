<script>
  // TWO options:
  /**
   * either we make our svgs out of L/M/Z commands, squarish and leverage the existing code from svelte with the n-1 substring to fix the console error (low effort other than creating the letters again with no beziers)
   *
   * or we find a way to convert to/from coords but handling bezier svg instructions
   */
  import { quintInOut } from "svelte/easing"
  import { tweened } from "svelte/motion"

  const scale = 2
  // width="35"
  let width = 35 * scale
  // height="44"
  let height = 44 * scale
  let strokeWidth = 2.2

  const initPath =
    "M20.3005,16.1681C18.4896,12.5463,17.4393,10.5641,17.4393,6.54726C17.4393,4.32342,18.9684,1.07973,22.9031,2.24556C24.8554,2.82403,27.0636,3.1672,28.2024,4.98929C28.7487,5.86341,28.0997,6.51848,27.9359,7.41946C27.7951,8.1937,27.9202,9.12992,27.9202,9.91234C27.9202,11.8732,29.4122,14.5555,30.5855,16.074C31.7451,17.5746,33,19.4153,33,21.3733C33,23.9878,32.9398,26.3024,32.2788,28.852C31.2754,32.7221,29.0102,37.0058,25.9447,39.5604C17.7657,46.3763,5.41895,37.6229,2.39571,29.1028C1.27257,25.9376,2.65204,23.2958,5.12376,21.3733C7.43283,19.5774,10.7849,17.5906,13.7469,17.7045C14.5151,17.7341,15.433,19.5858,15.8008,20.119C16.9247,21.7488,18.332,23.2882,19.6263,24.7912C21.0316,26.4232,21.6306,28.0024,23.4989,26.312C24.1227,25.7476,24.0989,24.5562,23.9535,23.7565C23.4846,21.1773,21.4647,18.4965,20.3005,16.1681Z"

  const quadrant1Path =
    "M21.4999 14.5C20.0235 10.8689 19.9999 11.3076 19.9999 7.29084C19.9999 5.067 21.4999 2 25.4637 2C28.4999 2 29.6242 2.92165 30.763 4.74374C31.3093 5.61785 30.6603 7.26206 30.4965 8.16304C30.3557 8.93727 30.4808 9.87349 30.4808 10.6559C30.4808 12.6168 33.1462 18.8176 33.1462 18.8176C33.1462 18.8176 34.2634 22.1529 34.4999 24.3736C34.9224 28.341 33.1462 32 33.1462 32C33.1462 32 31.2592 37.2085 27.4999 39.6651C13.3062 48.9404 4.89825 42.4605 1.87501 33.9404C0.867926 31.1022 1.87242 29.1275 3.49995 27.5C6 25 11.4225 21.9227 14.5 25C16.0001 26.5 16.5 28.5 16.5 28.5C16.5 28.5 17.0137 30.4473 18.1812 31.1022C19.1877 31.6667 21.6347 30.3904 22.4999 30C25.678 28.566 24.5877 25.9179 24.4999 22.5C24.4393 20.138 22.3898 16.6888 21.4999 14.5Z"

  const initCoords = pathToCoords(initPath)
  const quadrant1Coords = pathToCoords(quadrant1Path)
  const progress = tweened(initCoords, {
    duration: 200,
    easing: quintInOut,
  })

  let state = "init"
  function goToNextState() {
    // TODO depends on what quadrant mouse is in
    progress.set(quadrant1Coords)
  }

  /**
   * @param {string} path from svg d attribute
   */
  function pathToCoords(path) {
    // remember where C/L/M/Z occurred to re-insert a C/L/M/Z when going from coordsToPath?
    return path
      .replace(/[MZ]/g, "")
      .replace(/C/g, ",")
      .split(",")
      .filter(String)
      .map((c) => Number(c))
  }

  function coordsToPath(coords) {
    const joinedInstructions = coords.reduce(
      (acc, cur, i) =>
        i % 6 !== 0
          ? acc + cur + "C"
          : acc + cur + ",",
      "",
    )
    return `M${joinedInstructions.substring(0, joinedInstructions.length - 1)}Z`
  }
</script>

<svg
  class="jay0"
  {width}
  {height}
  viewBox="0 0 35 44"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d={initPath}
    stroke="white"
    stroke-width={strokeWidth}
    stroke-linecap="round"
  />
</svg>
<button onclick={goToNextState}>go next</button>

<ul>
  <li>{initPath}</li>
  <li>{pathToCoords(initPath)}</li>
  <!-- <li>{coordsToPath(initCoords)}</li> -->
</ul>

<style>
  svg {
    border: 1px pink solid;
  }
</style>
