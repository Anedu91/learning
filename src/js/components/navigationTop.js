export const rendingScore = (actualScore, possibleScore, type) => {
  const percent = parseInt(actualScore*100/possibleScore);
  const STROKE_DASH = 106.76;
  const progressCircle = STROKE_DASH*actualScore/possibleScore

  return `
      <div class="score">
        ${type}
        <span class="score__number">${actualScore}/${possibleScore}</span>  
        <div class="score__progress" data-pct=${percent}>
          <svg class="score__icon" width="40" height="40" viewPort="0 0 20 20" version="1.1">
           <circle class="score__circle" r="17" cx="20" cy="20" fill="transparent"  stroke-dashoffset=${0} stroke-dasharray=${STROKE_DASH}></circle>
            <circle class="score__bar" r="17" cx="20" cy="20" fill="transparent" stroke-dashoffset=${STROKE_DASH - progressCircle} stroke-dasharray=${STROKE_DASH}></circle>
          </svg>
        </div>
      </div>
  `
}



export const navigationTop = (data, state) => {
  return 	`
    <div class="container">
      <!-- STUDENT INFORMATION -->
      <div class="navigation__student">
        <figure class="navigation__avatar"></figure>
        <p data-bs-toggle="tooltip" data-bs-placement="bottom" title="John Doe Jhonson">
          ${data.studentName}
        </p>
        <p data-bs-toggle="tooltip" data-bs-placement="bottom" title="English 101"> 
          ${data.className}
        </p>
        <p>
          Period <span>${data.period}</span>
        </p>
      </div>

      <ul class="navigation__nav">
        <!-- EVALUATION INFORMATION -->
        <li class="navigation__item dropdown">
            <button class="dropdown-toggle navigation__dropdown-button" type="button" id="evaluated-score" data-bs-toggle="dropdown" aria-expanded="false">
              ${rendingScore(state.evaluatedScore.scoreEarned, state.evaluatedScore.possibleScore, "Evaluated")}
            </button>
            <ul class="dropdown-menu" aria-labelledby="evaluated-score">
              <li class="dropdown-item navigation__dropdown-item">
              ${rendingScore(state.gradedScore.scoreEarned, state.gradedScore.possibleScore, "Graded")}
              </li>
            </ul>
          </li>

          <!-- EVALUATION INFORMATION -->
           <li class="navigation__item dropdown">
            <button class="dropdown-toggle navigation__dropdown-button lg" type="button" id="submitted-graded" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="score">
                Submitted graded <span class="score__number">2</span>  
                
              </div>
            </button>
            <ul class="dropdown-menu" aria-labelledby="submitted-graded">
              <li class="dropdown-item navigation__dropdown-item">
                <div class="score">
                ${rendingScore(state.averageScore.scoreEarned, state.averageScore.possibleScore, "Average")}
              </li>
            </ul>
          </li>

        <!-- GRADING ASSIGNMENT -->
        <li class="navigation__item btn-group">
            <button class="btn btn-custom teacherGraded" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Teacher graded">
              <svg class="btn-icon--wide"><use xlink:href="images/sprite.svg#icon-graded"></use></svg>
            </button>
            <button class="btn btn-custom computerGraded" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Computer graded">
              <svg class="btn-icon--wide"><use xlink:href="images/sprite.svg#icon-evaluated"></use></svg>
            </button>
          </li>
        <!-- FILTER SHOW ASSIGNMENT BUTTONS -->
        <li class="navigation__item dropdown">
            <button class="dropdown-toggle navigation__dropdown-button" type="button" id="evaluated-score" data-bs-toggle="dropdown" aria-expanded="false">
              <svg class="btn-icon--wide"><use xlink:href="images/sprite.svg#icon-view-dropdown"></use></svg>
            </button>
            <ul class="dropdown-menu navigaton__dropdown-filter" aria-labelledby="evaluated-score">
              <li class="dropdown-item navigation__dropdown-item btn-group">
                <input type="radio" class="btn-check btn-filter" name="showfilter" id="showAll" checked>
                <label class="btn" for="showAll" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show all assignment">
                  <svg class="btn-icon--wide md"><use xlink:href="images/sprite.svg#icon-view-all"></use></svg>
                </label>  
  
                <input type="radio" class="btn-check btn-filter" name="showfilter" id="show0">
                <label class="btn" for="show0" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show assignment with 0 score">
                  <svg class="btn-icon--wide sm"><use xlink:href="images/sprite.svg#icon-view-0"></use></svg>
                </label>    
  
                <input type="radio" class="btn-check btn-filter" name="showfilter" id="showUnder">
                <label class="btn" for="showUnder" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show assignment less than 100">
                  <svg class="btn-icon--wide lg"><use xlink:href="images/sprite.svg#icon-view-under"></use></svg>
                </label>
              </li>
            </ul>
          </li>

        <!-- RUNNING SCORE INFO -->
        <li class="navigation__item" id="running-score">            
          ${rendingScore(state.runningScore,state.possibleScore,"Running")}  
        </li>

        <!-- POSTING ASSIGNMENT -->
        <li class="navigation__item btn-group">
            <button class="btn btn-custom feedback" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Submit as a feedback">
              <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-feedback"></use></svg>
            </button>
            <button class="btn btn-custom finish" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Submit as complete">
              <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-complete"></use></svg>
            </button>
          </li>
      </ul>
    </div>
  `
}