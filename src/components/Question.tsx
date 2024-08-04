import React, {useState} from 'react';
import DeleteButton, { ClickFunction } from './DeleteButton';
export interface QuestionData {
    question: string;
    choices: Array<string>;
    correct_index: number;
}
// Updated requirements to successfully add required data to DeleteButton
export interface IndexedQuestionData extends QuestionData {
    list_index: number;
    click_action: ClickFunction;
}
function Question(props: IndexedQuestionData) {
    const questionChoiceElements = props.choices.map((question_content: string) => {
        if (question_content[0] == props.choices[props.correct_index][0]){
            return <li className="correct-answer">{"Question choice " + question_content}</li>;
        } else {
            return <li>{"Question choice " + question_content}</li>;
        }
    });
    return (
        <div className="question-container">
            <div className="question-title">Question: {props.question}</div>
            <ul>
                {questionChoiceElements}
            </ul>
            <DeleteButton clickEvent={props.click_action} index={props.list_index}/>
        </div>
    );
}

export default Question;