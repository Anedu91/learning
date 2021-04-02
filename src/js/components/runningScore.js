export const runningScore = (score) => {
  console.log(score)
  return `
    <div class="circle" data-pct="100" data-bs-toggle="tooltip" data-bs-placement="bottom" title="20 / 20 pt">
      <svg class="circle__icon" width="50" height="50" viewPort="0 0 25 25" version="1.1">
        <circle class="circle__circle" r="20" cx="25" cy="25" fill="transparent" stroke-dasharray="125.664" stroke-dashoffset="0">

        </circle>
        <circle class="circle__bar" r="20" cx="25" cy="25" fill="transparent" stroke-dasharray="100.664" stroke-dashoffset="0">

        </circle>
      </svg>
    </div>
  
  `
}

