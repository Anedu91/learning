export const assignmentTask = (assigment, index) => {
  const {evaluatedScore, instructions , possibleScore, score, teacherGraded, section, task } = assignment

  
  const failureMessage = `<button class="btn btn-danger w-100 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#failure-message-${index}" aria-expanded="false" aria-controls="failure message">Failure Message</button>
          <div div class="collapse mt-2" id="failure-message-${index}">
            <div class="alert alert-danger" role="alert">
              ${assigment.failureMessage}
            </div>
          </div>
        `

  return `
        <li class="card ${assigment.teacherGraded && "graded"}" id=${assigment.id}>
        <button class="card__btn" type="button" data-bs-toggle="collapse" data-bs-target="#task${index}" aria-expanded="false" aria-controls="task${index}">
          <div class="card__info">
          <span class="card__score">${assigment.score}/${assigment.possibleScore}</span>
          <h5 class="card__title">Task ${assigment.section}/${assigment.task}</h5>
            <a class="btn btn-circle card__toggle">
              
            </a>
          </div>
          <div class="card-body card__description">
            <p>
              ${assigment.instructions}
            </p>
          </div>
        </button>
        <div class="collapse principal" id="task${index}">
          <div class="card-body">
            <div class="card__action">
              <div class="card__container">
                <button class="btn btn-outline btn-large btn-task" data-score="0" data-possible=${assigment.possibleScore}>0</button>
                <button class="btn btn-primary btn-large btn-task" data-score=${assigment.possibleScore} data-possible=${assigment.possibleScore}>${assigment.possibleScore}</button>
              </div>
              <div class="mt-3 card__container">
                <div class="input-group shadow">
                  <span class="input-group-text">1</span>
                  <input type="range" id="range-${index}" class="form-range" min="0" max="${assigment.possibleScore}" step="1" value="1"}>
                </div>
                <button class="btn btn-task btn-range" data-possible=${assigment.possibleScore} data-score="1">
                  <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-check"></use></svg>
                </button>
              </div>
              <div class="mt-3">
                  ${assigment.failureMessage ? failureMessage : ""}
              </div>
            </div>
          </div>
        </div>
      </li>
  `
}


