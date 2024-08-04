import React, {ChangeEvent, useState} from 'react';
import Question, {QuestionData} from './Question.tsx';
// TODO: add an export to json :)
function QuestionEntry(){
    let [question, setQuestion] = useState<string>("");
    let [questions, setQuestions] = useState({a: "", b: "", c: "", d: ""});
    let [correct_answer_index, setCorrectAnswer] = useState<number>(0);
    let [current_answer, setCurrentAnswer] = useState<string>("a");
    let [questions_saved, setQuestionsSaved] = useState<Array<QuestionData>>([]);
    let [copy_status, setCopyStatus] = useState<String>("Copy to Clipboard");

    // much better fix for finding choices :)
    const choiceIndexDict: {[letter: string] : number} = {'A': 0, 'B': 1, 'C': 2, 'D': 3};

    function setTriviaQuestion(event: ChangeEvent<HTMLInputElement>){
        setQuestion(event.target.value);
    }

    function setCurrentTriviaQuestion(event: ChangeEvent<HTMLSelectElement>){
        setCurrentAnswer(event.target.value.toLowerCase());
    }

    function setTriviaAnswer(event: ChangeEvent<HTMLSelectElement>){
        // Updated for better implementation
        setCorrectAnswer(choiceIndexDict[event.target.value]);
    }

    function setCurrentQuestion(event: ChangeEvent<HTMLInputElement>){
        switch (current_answer){
            case "a":
                setQuestions({...questions, a: event.target.value});
                break;
            case "b":
                setQuestions({...questions, b: event.target.value});
                break;
            case "c":
                setQuestions({...questions, c: event.target.value});
                break;
            case "d":
                setQuestions({...questions, d: event.target.value});
                break;
            default:
                console.log("incorrect answer choice! something's gone wrong :(");
                break;
            
        }
    }

    function getQuestionsAsArray(): Array<string> {
        return ["A: " + questions.a, "B: " + questions.b, "C: " + questions.c, "D: " + questions.d];
    }

    function resetStates(){
        setQuestion("");
        setCurrentAnswer("a");
    }

    function addQuestionToSavedData(){
        // TODO: decide if resseting states is worth it after clicking.
        let new_question: QuestionData = {
            question: question,
            questions: getQuestionsAsArray(),
            correct_index: correct_answer_index
        };
        setQuestionsSaved([...questions_saved, new_question]);
        resetStates();
    }

    function copyJSONtoClipboard(){
        let json_content = JSON.stringify(questions_saved, undefined, 2);
        navigator.clipboard.writeText(json_content);
        setCopyStatus("Copied!");
        setTimeout(()=>{
            setCopyStatus("Copy to Clipboard");
        }, 1000);
    }

    const questionChoiceElements = getQuestionsAsArray().map((question_content: string) => {
        if (question_content[0] == getQuestionsAsArray()[correct_answer_index][0]){
            return <li className="correct-answer">{"Question choice " + question_content}</li>;
        } else {
            return <li>{"Question choice " + question_content}</li>;
        }
    });

    const questionDisplayContainers = questions_saved.map((questionData: QuestionData) =>
        <li><Question question={questionData.question} questions={questionData.questions} correct_index={questionData.correct_index} /></li>
    );

    return (
        <div className="container">
        <div className="trivia-input-container">
            <h2>Trivia Question Creator for TriviaBot</h2>
            <input type="text" onChange={setTriviaQuestion} value={question} placeholder="Question"/><br />
            <input type="text" onChange={setCurrentQuestion} placeholder={"Edit answer choice for " + current_answer.toUpperCase()}/>
            <select onChange={setCurrentTriviaQuestion} value={current_answer.toUpperCase()}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select>
            <div>The correct answer for this question is:
            <select onChange={setTriviaAnswer}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </select></div>
        </div>
        <div className="question-display-container">
            <div className="question"><b>Question asked: </b>{question}</div>
            <ul className="question-choices">
                {questionChoiceElements}
            </ul>
            <div><button onClick={addQuestionToSavedData}>Add to Question List</button><button onClick={copyJSONtoClipboard}>{copy_status}</button></div>
        </div>
        <div className="question-header">Questions</div>
        <div className="saved-questions-container">
            <ul className="question-list">
                {questionDisplayContainers}
            </ul>
        </div>
        </div>
    );
}

export default QuestionEntry;