import {Tooltip} from 'bootstrap';
import "./scss/main.scss";
import "./images/sprite.svg";

import {getData} from './js/fetchingData';
/*UI COMPONENTS */
import {navigationTop} from './js/components/navigationTop';
import {runningScore} from './js/components/runningScore';
import {assignmentTask} from './js/components/assignmentTask';

const store = {
  templateSettings: {

  },
  scoreInfo:{},
  evaluations: []
}

document.addEventListener('DOMContentLoaded', async () => {
  // const firstAssignment = await getData("http://gradeflow.net/api/workitem/2");
  // console.log(firstAssignment)
  onPageLoad()
  setupClickHandlers()

  
})


async function onPageLoad() {
  try{
    getData("http://gradeflow.net/api/workitem/2")
      //Updating the data in the store state
    .then((data) => {
      console.log(data)      
      const {evaluations, evaluatedScore, gradedScore} = data      
      store.evaluations = evaluations;
      store.scoreInfo = {
        evaluatedScore,
        gradedScore
      }     
      return data
    })
    //Rendering the Navigation
    .then( (data) => {
      //renderAt("#topbar", navigationTop(data))
      //renderAt("#running-score", runningScore(store.scoreInfo))
    })
    // Rendering evaluations
    .then(() => {
        const evaluationTask = store.evaluations.map((task,index) => assignmentTask(task,index)).join("");        
        renderAt("#assignment", evaluationTask);
    })
    // Triggering the tooltips
    .then(() => {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map((tooltipEl) => {
      return new Tooltip(tooltipEl,{
        trigger : 'hover'
  })
})
    })
  } catch{}
}

function setupClickHandlers(){
  document.addEventListener('click', (event) => {
    const {target} = event;
    /* TOP BAR EVENTS */
    if(target.matches(".teacherGraded")){
      //todo teacher graded to 100%
      console.log(target)
    }
    if(target.matches(".computerGraded")){
      //todo all graded to 100%
      console.log(target)
    }
    if(target.matches(".btn-filter")){
      //todo filter
      console.log(target)
    }
    if(target.matches(".feedback")){
      //todo feedback POST
      console.log(target)
    }
    if(target.matches(".finish")){
      //todo complete POST
      console.log(target)
    }
    /* TASK EVENTS */
    if(target.matches(".btn-task")){
      //set score to 0 / to max / range
      console.log(target)
      if(target.classList.contains('btn-range')){
        console.log("this is the range")
      }
      const closestScore = target.closest(".card").querySelector(".card__score")
      console.log(closestScore)
    }
    if(target.matches(".form-range")){
      const rangeLabel = target.closest(".input-group").querySelector('.input-group-text');
      rangeLabel.innerText = target.value;
    }
    
  })
}

function renderAt(element, html) {
  const node = document.querySelector(element);

  node.innerHTML = html;
}







