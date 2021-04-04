import {Tooltip, Collapse} from 'bootstrap';
import "./scss/main.scss";
import "./images/sprite.svg";

import {getData} from './js/fetchingData';
/*UI COMPONENTS */
import {navigationTop,rendingScore } from './js/components/navigationTop';
import {assignmentTask} from './js/components/assignmentTask';

const store = {
  templateSettings: {
    view: 'showAll'
  },
  scoreInfo:{
    evaluatedScore: '',
    gradedScore: '',
    possibleScore: '',
    runningScore: '',
    averageScore: ''
  },
  evaluations: []
}

document.addEventListener('DOMContentLoaded', async () => {
  // const firstAssignment = await getData("http://gradeflow.net/api/workitem/2");
  // console.log(firstAssignment)
  onPageLoad("http://gradeflow.net/api/workitem/2")
  setupClickHandlers()

  
})


async function onPageLoad(url) {
  try{
    getData(url)
      //Updating the data in the store state
    .then((data) => {
      console.log(data)      
      const {evaluations, evaluatedScore, gradedScore, averageScore} = data

            
      store.evaluations = evaluations.map((evaluation,index) => {
        return {...evaluation, id:index}
      });
      
      const possibleScore = gradedScore.possibleScore;
      
      store.scoreInfo = {
        ...store.scoreInfo,
        evaluatedScore,
        gradedScore,
        possibleScore,
        averageScore
      }     
      calcScore()
      return data
    })
    //Rendering the Navigation
    .then( (data) => {
      renderAt("#topbar", navigationTop(data, store.scoreInfo))
    })
    // Rendering evaluations
    .then(() => {
        renderTask()
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
      gradedTo100()
    }
    if(target.matches(".computerGraded")){
      //todo all graded to 100%
      allTo100()

    }
    if(target.matches(".btn-filter")){
        // Filter config
      store.templateSettings.view = target.id;
      renderTask()        
    }
    if(target.matches(".feedback")){
      //todo feedback POST
      
      onPageLoad("http://gradeflow.net/api/workitem/1")
    }
    if(target.matches(".finish")){
      //todo complete POST
      onPageLoad("http://gradeflow.net/api/workitem/2")
    }
    /* TASK EVENTS */
    if(target.matches(".card__btn")){
    }
    if(target.matches(".btn-task")){
      //set score to 0 / to max / range
      const card = target.closest(".card");      
      
      
      updateScore(card, target.dataset.score, target.dataset.possible, true)
    }
    if(target.matches(".form-range")){
      const card = target.closest(".card");     
      const rangeLabel = card.querySelector('.input-group-text');
      const button = card.querySelector('.btn-range');
      rangeLabel.innerText = target.value;
      button.dataset.score = target.value;
    }
    
  })
}

function renderAt(element, html) {
  const node = document.querySelector(element);

  node.innerHTML = html;
}
function updateScore (task, score, totalScore) {  
  store.evaluations.filter(evaluation => evaluation.id == task.id)[0].score = parseInt(score)
  store.evaluations.filter(evaluation => evaluation.id == task.id)[0].teacherGraded = true;
  const taskScore = task.querySelector(".card__score");  
  const nextTask = task.nextElementSibling;
  
  taskScore.innerText = `${parseInt(score)}/${parseInt(totalScore)}`;
  task.classList.add('graded');

  
  const taskContainer = task.querySelector(".principal")
  
  new Collapse(taskContainer,{
    hide: true
  })

  
    if(nextTask){
      new Collapse(nextTask.querySelector(".principal"),{
        show:true
      })
    }
  
  calcScore()
  renderAt("#running-score",rendingScore(store.scoreInfo.runningScore, store.scoreInfo.possibleScore, "Running"));
  
}
function renderTask() {
  const evaluationTask = store.evaluations.filter(task => {
    if(store.templateSettings.view === "showAll"){
      return task
    } 
    if(store.templateSettings.view === "show0"){
      return task.score === 0
    }
    if(store.templateSettings.view === "showUnder"){
      return task.score / task.possibleScore != 1 && task.score > 0
    }
  }).map((task,index) => assignmentTask(task,index)).join("");        
  renderAt("#assignment", evaluationTask);
    
  if(evaluationTask.length > 0){
    new Collapse(document.querySelector(".card").querySelector(".collapse"),{
          show: true
        })
  }
}

function calcScore () {
  const runningScore = store.evaluations.reduce((acc, value) => {
    return acc + value.score},0)
  store.scoreInfo.runningScore = runningScore;
}
function allTo100 () { 
  store.evaluations.forEach(evaluation => {
    const taskId = evaluation.id
    updateScore(document.getElementById(taskId), evaluation.possibleScore, evaluation.possibleScore);

  })
}
function gradedTo100 () {
  store.evaluations.filter(evaluation => evaluation.teacherGraded).forEach(gradedEvaluation => {
    const taskId = gradedEvaluation.id
    updateScore(document.getElementById(taskId), gradedEvaluation.possibleScore, gradedEvaluation.possibleScore);
  })
}






