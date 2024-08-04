import React, {useState} from 'react';
export interface QuestionData {
    question: string;
    questions: Array<string>;
    correct_index: number;
}
function Question(props: QuestionData) {
    const questionChoiceElements = props.questions.map((question_content: string) => {
        if (question_content[0] == props.questions[props.correct_index][0]){
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
        </div>
    );
}

export default Question;