<script>
  import { cubicInOut } from "svelte/easing"
  import Jay0 from "./jay0.svelte"
  import anime from "animejs/lib/anime.es.js"
  import { tweened } from "svelte/motion"

  const pausePaths = [
    "M212.13203,347.27573L280.82241,347.27573L280.82241,627.08798L212.13203,627.08798Z",
    "M393.9595,347.27573L462.64988,347.27573L462.64988,627.08798L393.9595,627.08798Z",
  ]
  const playPaths = [
    "M246.84631,381.58161L341.39093,434.38173L341.39093,539.98196L246.84631,592.7821Z",
    "M341.39093,434.38173L435.22131,487.18188L435.22131,487.18188L341.39093,539.98195Z",
  ]

  const pauseCoords = pathsToCoords(pausePaths)
  const playCoords = pathsToCoords(playPaths)

  const progress = tweened(pauseCoords, {
    duration: 400,
    easing: cubicInOut,
  })

  let isPlaying = true
  function onToggle() {
    isPlaying
      ? progress.set(playCoords)
      : progress.set(pauseCoords)
    isPlaying = !isPlaying
  }

  function pathsToCoords(paths) {
    return paths.map((d) =>
      // This works because M & L commands have 2 args..
      d
        .replace(/[LMZ]/g, ",")
        .split(",")
        .filter(String)
        .map((c) => Number(c)),
    )
  }

  function coordsToPath(coords) {
    const joinedInstructions = coords.reduce(
      // ..so then re-inserting the L can be done every 2 numbers/args
      (acc, cur, i) =>
        i % 2 !== 0
          ? acc + cur + "L"
          : acc + cur + ",",
      "",
    ) // Not my prettiest line of code :)
    return `M${joinedInstructions.substring(0, joinedInstructions.length - 1)}Z`
  }
</script>

<div class="container">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 250.51786 279.81226"
    width="33"
  >
    <g transform="translate(-212.13203,-347.27573)">
      <path d={coordsToPath($progress[0])} />
      <path d={coordsToPath($progress[1])} />
    </g>
  </svg>

  <button onclick={onToggle}>ani</button>

  <ul>
    <li>{pausePaths}</li>
    <li>{pauseCoords}</li>
    <li>{coordsToPath(pauseCoords)}</li>
    <li>{coordsToPath($progress[0])}</li>
  </ul>

  <Jay0 />
</div>

<style>
  .container {
    display: inline-flex;
    flex-direction: column;

    border: 2px orangered solid;
    padding: 4px 8px;
  }
</style>
