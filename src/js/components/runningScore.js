export const runningScore = (score,posibleScore) => {
    


  return `
  <div class="score__progress" data-pct="35" data-bs-toggle="tooltip" data-bs-placement="bottom" title="${score} / ${posibleScore} pt">
    <svg class="score__icon" width="40" height="40" viewPort="0 0 20 20" version="1.1">
      <circle class="score__circle" r="17" cx="20" cy="20" fill="transparent" stroke-dasharray="106.76" stroke-dashoffset="0"></circle>
      <circle class="score__bar" r="17" cx="20" cy="20" fill="transparent" stroke-dasharray="88.664" stroke-dashoffset="0"></circle>
    </svg>
  </div>
  
  `
}

