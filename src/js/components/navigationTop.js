


export const navigationTop = (data) => {
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
        <li class="navigation__item">
          
        </li>

        <!-- GRADING ASSIGNMENT -->
        <li class="navigation__item btn-group">
          <button class="btn btn-custom teacherGraded" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Teacher graded">
            <svg class="btn-icon--wide"><use xlink:href="images/sprite.svg#icon-view-under"></use></svg>
          </button>
          <button class="btn btn-custom computerGraded" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Computer graded">
            <svg class="btn-icon--wide"><use xlink:href="images/sprite.svg#icon-evaluated"></use></svg>
          </button>
        </li>
        <!-- FILTER SHOW ASSIGNMENT BUTTONS -->
        <li class="navigation__item btn-group" role="group" aria-label="Basic example">

          <input type="radio" class="btn-check btn-filter" name="showfilter" id="showAll" checked>
          <label class="btn" for="showAll" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show all assignment">
            <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-cart"></use></svg>
          </label>  

          <input type="radio" class="btn-check btn-filter" name="showfilter" id="show0">
          <label class="btn" for="show0" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show assignment with 0 score">
            <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-cart"></use></svg>
          </label>    

          <input type="radio" class="btn-check btn-filter" name="showfilter" id="showUnder">
          <label class="btn" for="showUnder" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Show assignment less than 100">
            <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-cart"></use></svg>
          </label>
        </li>

        <!-- RUNNING SCORE INFO -->
        <li class="navigation__item d-flex">
          Running score
          <div id="running-score">
          
          </div>    
        </li>

        <!-- POSTING ASSIGNMENT -->
        <li class="navigation__item btn-group">
          <button class="btn btn-custom feedback" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Submit as a feedback">
            <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-feedback"></use></svg>
          </button>
          <button class="btn btn-custom finish" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Submit as complete">
            <svg class="btn-icon"><use xlink:href="images/sprite.svg#icon-cart"></use></svg>
          </button>
        </li>
      </ul>
    </div>
  `
}