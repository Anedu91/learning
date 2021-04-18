import {Tooltip, Collapse} from 'bootstrap';
import "./scss/main.scss";
import "./images/sprite.svg";

import {getData} from './js/fetchingData';
/*UI COMPONENTS */
import {navigationTop,rendingScore } from './js/components/navigationTop';
import {assignmentTask} from './js/components/assignmentTask';
import {documentTask, renderIframe} from './js/components/documentTask';

//Initial State
const store = {
  templateSettings: {
    view: 'showAll',
    documentWidth: 50,
    documentPreview: 'view',
    editUrl: 'https://docs.google.com/document/d/1PWGYdOowfSzmmC2b2hxvGfKnjd3XJQn4UlQZZzKWMRc/edit?usp=sharing',
    previewUrl: 'https://docs.google.com/document/d/e/2PACX-1vQEb-c6bYhXtaPOEM7jSe7vFO8sQAZu1FfMXxh7ztlGhZAdrYI2mcWN-QeX2uETwMWqReuqzBQYAVww/pub?&embedded=true'

  },
  scoreInfo:{
    evaluatedScore: '',
    gradedScore: '',
    possibleScore: '',
    runningScore: '',
    averageScore: ''
  },
  evaluations: [],
  evaluationsRendered: [],
}
/*======EVENT LISTENERS======*/
document.addEventListener('DOMContentLoaded', async () => {
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
      renderAt("#topbar", navigationTop(data, store.scoreInfo));
      //passing settings to the UI
      selectedFilter(store.templateSettings.view, '.navigaton__dropdown-filter .btn-check');      
      return data    
    })
    // Rendering Document
    .then((data)=> {
      renderAt(".main__document", documentTask(data, store.templateSettings))
      //passing settings to the UI
      selectedFilter(store.templateSettings.documentPreview, '.document__edit .btn-check');  
      setWidth(store.templateSettings.documentWidth)
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
      evaluatedTo100()

    }
    if(target.matches(".btn-filter")){
        // Filter config
      store.templateSettings.view = target.id;
      renderTask()        
    }
    if(target.matches(".feedback")){
      //removing prev tooltip
      document.querySelector('.tooltip').remove()
      //onPageLoad placeholder get (waiting for post information)
      onPageLoad("http://gradeflow.net/api/workitem/1")
    }
    if(target.matches(".finish")){
      //removing prev tooltip
      document.querySelector('.tooltip').remove()
      //onPageLoad placeholder get (waiting for post information)
      onPageLoad("http://gradeflow.net/api/workitem/2")
    }
    /* TASK EVENTS */
    if(target.matches(".card__btn")){
    }
    if(target.matches(".btn-task")){
      //set score to 0 / to max / range
      const card = target.closest(".card");      
      
      //Updating score inside the card
      updateScore(card, target.dataset.score, target.dataset.possible);
      //Closing actual card, opening new card and scroll up
      updateTaskUi(card);
    }
    if(target.matches(".form-range")){
      //Updating number input and button data-score from range-input
      const card = target.closest(".card");     
      const rangeLabel = card.querySelector('.form__range__input');
      const button = card.querySelector('.btn-range');
      rangeLabel.value = target.value;
      button.dataset.score = rangeLabel.value;
    }
    if(target.matches(".form__range__input")){
      //Updating number input and button data-score from number-input
       setupChangeHandlers(target);
      
    }
    /* DOCUMENT EVENTS */

    if(target.matches(".filePreference")){
      // Setting preview, edit and undock document views
      const mainContainer = document.querySelector('.main');
      
      if(target.dataset.target == "preview"){
        mainContainer.classList.remove('full-width');
        setWidth(store.templateSettings.documentWidth);
        store.templateSettings.documentPreview = target.dataset.target;
        renderAt(".main__body",renderIframe(store.templateSettings.previewUrl));
      }
      
      if(target.dataset.target == "edit"){
        mainContainer.classList.remove('full-width');
        setWidth(store.templateSettings.documentWidth);
        store.templateSettings.documentPreview = target.dataset.target
        renderAt(".main__body",renderIframe(store.templateSettings.editUrl))
      }
      
      if(target.dataset.target == "undock"){
        mainContainer.classList.add('full-width');
        mainContainer.style.gridTemplateColumns = "30% 1fr";
        window.open(store.templateSettings.editUrl, '_blank');
      }
    }
    if(target.matches(".btn-document")){
      //Setting document width
      let widthValue = store.templateSettings.documentWidth;
      if(target.dataset.size === "small"){
        if(widthValue <= 50){
          setWidth(widthValue)
        }else{
          widthValue -= 10;
          store.templateSettings.documentWidth = widthValue;    
          setWidth(widthValue) 
        }
      }
      if(target.dataset.size=== "big"){
        if(widthValue >= 70){
          setWidth(widthValue)
        }else{
          widthValue += 10;
          store.templateSettings.documentWidth = widthValue; 
          setWidth(widthValue)
        }
        
      }
    }

  })
}
/*OTHERS EVENTS */
function setupChangeHandlers(input){
  //change event from input number (range)
  const card = input.closest(".card"); 
  const range = card.querySelector('.form-range');
  const button = card.querySelector('.btn-range');
  input.addEventListener('change', (event)=> {
    range.value = event.target.value
    button.dataset.score = event.target.value;

  })
}
/* RENDER FUNCTION */
function renderAt(element, html) {
  const node = document.querySelector(element);

  node.innerHTML = html;
}
function updateScore (task, score, totalScore) {  
  //Updating new value in the state
  store.evaluations.filter(evaluation => evaluation.id == task.id)[0].score = parseInt(score);  
  // store.evaluations.filter(evaluation => evaluation.id == task.id)[0].teacherGraded = true;
 
 //Act number UI in the task card
  const taskScore = task.querySelector(".card__score");  
  taskScore.innerText = `${parseInt(score)}/${parseInt(totalScore)}`;
  
  //Updating total score number
  calcScore()
  //Rendering Score (topbar)
  renderAt("#running-score",rendingScore(store.scoreInfo.runningScore, store.scoreInfo.possibleScore, "Running"));  
}
/* RENDERING TASKS CARDS */
function renderTask() {
  const evaluationTask = store.evaluations.filter(task => {
    //show all filter
    if(store.templateSettings.view === "showAll"){
      return task
    } 
    //show 0 filter
    if(store.templateSettings.view === "show0"){
      return task.score === 0
    }
    //show under 100 filter
    if(store.templateSettings.view === "showUnder"){
      return task.score / task.possibleScore != 1 && task.score >= 0
    }
  })
  //rendering task after filtering
  const taskUI = evaluationTask.map((task,index) => assignmentTask(task,index)).join("");        
  renderAt("#assignment", taskUI);
   store.evaluationsRendered = evaluationTask;
  if(evaluationTask.length > 0){
    //Open first task in the assigment list
    new Collapse(document.querySelector(".card").querySelector(".collapse"),{
          show: true
        })
  }
}
/* UTILS FUNCTIONS */
function calcScore () {
  //Reducing total score (evaluated + graded)
  const runningScore = store.evaluations.reduce((acc, value) => {
    return acc + value.score},0)
  store.scoreInfo.runningScore = runningScore;
}
function evaluatedTo100 () { 
  // evaluated score to 100
  store.evaluationsRendered.filter(evaluation => evaluation.teacherGraded === false).forEach(gradedEvaluation => {
    const taskId = gradedEvaluation.id
    updateScore(document.getElementById(taskId), gradedEvaluation.possibleScore, gradedEvaluation.possibleScore);
  })
}
function gradedTo100 () {
  //graded score to 100
  store.evaluationsRendered.filter(evaluation => evaluation.teacherGraded).forEach(gradedEvaluation => {
    const taskId = gradedEvaluation.id
    updateScore(document.getElementById(taskId), gradedEvaluation.possibleScore, gradedEvaluation.possibleScore);
  })
}
function setWidth(value){
  //setting width function
  const sizeValue = document.querySelector('.sizeValue');
  const mainContainer = document.querySelector('.main');
  switch(true){
    case (value===50):
    sizeValue.innerText = value;
    sizeValue.previousElementSibling.classList.add('disabled');
    mainContainer.style.gridTemplateColumns = "50% 1fr";
    break;
    case (value===60):
      sizeValue.innerText = value;
      sizeValue.previousElementSibling.classList.remove('disabled');
      sizeValue.nextElementSibling.classList.remove('disabled');
      mainContainer.style.gridTemplateColumns = "60% 1fr";
      break;
    case (value===70):
      sizeValue.innerText = value;
      sizeValue.nextElementSibling.classList.add('disabled');
      mainContainer.style.gridTemplateColumns = "65% 1fr";
      break;
    default:
      break;

  }
 
}
function updateTaskUi(task){
  //update task card
  const nextTask = task.nextElementSibling;
  const taskContainer = task.querySelector(".principal");
  const assigment = document.querySelector(".assigment");
  //hide actual card
  new Collapse(taskContainer,{
    hide: true
  }) 
 // if there any other card open it and scroll it to top
  if(nextTask){
    nextTask.scrollIntoView()
      new Collapse(nextTask.querySelector(".principal"),{
        show:true
      })


  }
}
//Filter selecter UI
function selectedFilter(setting, nodeGroup){
 const radioButtons = document.querySelectorAll(nodeGroup);
  const array = [...radioButtons];
  array.filter(button=> button.id == setting).map(selectedButton => selectedButton.checked =true);
}





